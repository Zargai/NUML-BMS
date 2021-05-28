import Container, { Service, Inject } from 'typedi';
import config from '../config';
import { IStudent, IStudentInput } from '../interfaces/IStudent';
import mongoose from 'mongoose'
@Service()
export default class StudentService {

  constructor(
    @Inject('studentModel') private studentModel: Models.StudentModel,
    @Inject('userModel') private userModel: Models.UserModel,
    @Inject('logger') private logger,
  ) { }


  public async getStudents(): Promise<{ students: Array<IStudent>; }> {
    try {
      const studentRecord = await this.studentModel.find().populate(['department'])
      if (!studentRecord) {
        throw new Error('No Students found!');
      }
      this.logger.silly('Student Found');
      const students = studentRecord;
      return { students };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async getStudent(studentId:any): Promise<{ student: IStudent; }> {
    try {
      const studentRecord = await this.studentModel.findOne({_id: studentId});
      if (!studentRecord) {
        throw new Error('No Students found!');
      }
      this.logger.silly('Student Found');
      const student = studentRecord;
      return { student };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  public async queryStudent(queryData:any): Promise<{ student: IStudent; }> {
    try {
      const studentRecord = await this.studentModel.findOne({
        systemId: queryData.systemId,
        password: queryData.password
      });
      if (!studentRecord) {
        throw new Error('No Students found!');
      }
      this.logger.silly('Student Found');
      const student = studentRecord;
      return { student };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }


  public async addStudent(studentInputDTO: IStudentInput): Promise<{ student: IStudent; success: boolean }> {
    try {    
      const studentRecord = await this.studentModel.create({...studentInputDTO})
      if (!studentRecord) {
        throw new Error('Student cannot be created');
      }
      const student = studentRecord;
      const success = true;
      console.log('student', student)
      return { student, success };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async updateStudent(studentId: ObjectId, studentInputDTO: IStudentInput): Promise<{ message:string, success: boolean }> {
    try {    
      const studentRecord = await this.studentModel.updateOne({"_id": studentId}, {...studentInputDTO});
      // ,{
      //   name: studentInputDTO.name,
      //   password: studentInputDTO.password,
      //   phone: studentInputDTO.phone,
      //   slipVerified: studentInputDTO.slipVerified,
      //   verified: studentInputDTO.verified,
      //   department: studentInputDTO.department
      // });
      if(studentRecord.nModified <= 0){
        return {message:"No Modification", success:false}
      }
      // const student = studentRecord;
      const success = true;
      const s = await this.studentModel.findOne({"_id": studentId})
      // console.log('student', student)
      return {message:"Student Updated", success };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async deleteStudent(studentId: ObjectId): Promise<{  success: boolean; }> {
    try {    
      const studentRecord = (await this.studentModel.deleteOne({ "_id": studentId }))
      console.log('d', studentRecord)
      if(studentRecord.deletedCount == 0){
        return { success: false}
      }
      return { success: true}
    } catch (e) {
      console.log('error', e)

    }
  }

}