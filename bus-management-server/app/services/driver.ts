import Container, { Service, Inject } from 'typedi';
import config from '../config';
import { IDriver, IDriverInput } from '../interfaces/IDriver';
import mongoose from 'mongoose'
@Service()
export default class DriverService {

  constructor(
    @Inject('driverModel') private driverModel: Models.DriverModel,
    @Inject('userModel') private userModel: Models.UserModel,
    @Inject('logger') private logger,
  ) { }


  public async getDrivers(): Promise<{ drivers: Array<IDriver>; }> {
    try {
      const driverRecord = await this.driverModel.find().populate(['assignedBus']);
      if (!driverRecord) {
        throw new Error('No Drivers found!');
      }
      this.logger.silly('Driver Found');
      const drivers = driverRecord;
      return { drivers };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async getDriver(driverId:any): Promise<{ driver: IDriver; }> {
    try {
      const driverRecord = await this.driverModel.findOne({_id: driverId});
      const driver = driverRecord;
      if (!driverRecord) {
        return {driver};
      }
      this.logger.silly('Driver Found');
      return { driver };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }


  public async addDriver(driverInputDTO: IDriverInput): Promise<{ driver: IDriver; success: boolean }> {
    try {    
      const driverRecord = await this.driverModel.create({...driverInputDTO})
      if (!driverRecord) {
        throw new Error('Driver cannot be created');
      } 
      const driver = driverRecord;
      const success = true;
      console.log('driver', driver)
      return { driver, success };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async updateDriver(driverId: ObjectId, driverInputDTO: IDriverInput): Promise<{ message:string, success: boolean }> {
    try {    
      const driverRecord = await this.driverModel.updateOne({"_id": driverId},{...driverInputDTO})
      if(driverRecord.nModified <= 0){
        return {message:"No Modification", success:false}
      }
      // const driver = driverRecord;
      const success = true;
      // console.log('driver', driver)
      return {message:"Driver Updated", success };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async deleteDriver(driverId: ObjectId): Promise<{  success: boolean; }> {
    try {    
      const driverRecord = (await this.driverModel.deleteOne({ "_id": driverId }))
      console.log('d', driverRecord)
      if(driverRecord.deletedCount == 0){
        return { success: false}
      }
      return { success: true}
    } catch (e) {
      console.log('error', e)

    }
  }

}