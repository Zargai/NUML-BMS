import { Service, Inject } from 'typedi';
import jwt from 'jsonwebtoken';
import config from '../config';
import argon2 from 'argon2';
import { randomBytes } from 'crypto';
import { IUser, IUserInput } from '../interfaces/IUser';

@Service()
export default class AuthService {
  constructor(
    @Inject('userModel') private userModel : Models.UserModel,
    @Inject('studentModel') private studentModel : Models.StudentModel,
    @Inject('departmentModel') private departmentModel : Models.DepartmentModel,
    @Inject('routeModel') private routeModel : Models.RouteModel,
    @Inject('driverModel') private driverModel : Models.DriverModel,
    @Inject('busModel') private busModel : Models.BusModel,
    @Inject('supportModel') private supportModel : Models.SupportModel,
    @Inject('logger') private logger,
  ) {}
  // public async SignUp(userInputDTO: IUserInput): Promise<{ user: IUser; token: string }> {
  //   try {
  //     const salt = randomBytes(32);

  //      this.logger.silly('Hashing password');
  //     const hashedPassword = await argon2.hash(userInputDTO.password, { salt });
  //     const userRecord = await this.userModel.create({
  //       ...userInputDTO,
  //       salt: salt.toString('hex'),
  //       password: hashedPassword,
  //     });
  //      this.logger.silly('Generating JWT');
  //     const token = this.generateToken(userRecord);

  //     if (!userRecord) {
  //       throw new Error('User cannot be created');
  //     }
  //      this.logger.silly('Sending welcome email');
  //     const user = userRecord.toObject();
  //     Reflect.deleteProperty(user, 'password');
  //     Reflect.deleteProperty(user, 'salt');
  //     return { user, token };
  //   } catch (e) {
  //      this.logger.error(e);
  //     throw e;
  //   }
  // }

  public async SignIn(email: string, password: string): Promise<{ user: IUser; token: string }> {
    const userRecord = await this.userModel.findOne({ email });
    if (!userRecord) {
      throw new Error('User not registered');
    }
    console.log('userreocrd password ===>',userRecord);
    console.log('login entered password===>',password);
    const validPassword = await argon2.verify(userRecord.password, password);
    console.log('valid password===>',validPassword);
    if (validPassword) {
      this.logger.silly('Generating JWT');
      const token = this.generateToken(userRecord);
      console.log('token===>',token);
      const user = userRecord.toObject();
      console.log('user',user);
      Reflect.deleteProperty(user, 'password');
      console.log('user refelct password===>',user);
      Reflect.deleteProperty(user, 'salt');
      console.log('user refelct password===>',user);
      console.log('token===>',token);
      return { user, token };
    } else {
      throw new Error('Invalid Password');
    }
  }

  private generateToken(user) {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);
     this.logger.silly(`Sign JWT for userId: ${user._id}`);
     console.log("user name ==>",user)
     console.log("user name ==>",config.jwtSecret)
    return jwt.sign(
      {
        _id: user._id,
        exp: exp.getTime() / 1000,
      },
      
      config.jwtSecret,
    );
  }



  public async getStatistics(): Promise<{ statistics: any }> {
    const users = await this.userModel.countDocuments();
    const students = await this.studentModel.countDocuments();
    const drivers = await this.driverModel.countDocuments();
    const routes = await this.routeModel.countDocuments();
    const buses = await this.busModel.countDocuments();
    const departments = await this.departmentModel.countDocuments();
    const supports = await this.supportModel.countDocuments();

    return {
      statistics:{
        users,students,drivers,routes,buses,departments,supports
      }
    }

 

 
 
  }
}