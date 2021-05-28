import Container, { Service, Inject } from 'typedi';
import config from '../config';
import { IBus, IBusInput } from '../interfaces/IBus';
import mongoose from 'mongoose'
@Service()
export default class BusService {

  constructor(
    @Inject('userModel') private userModel: Models.UserModel,
    @Inject('busModel') private busModel: Models.BusModel,
    @Inject('driverModel') private driverModel: Models.DriverModel,
    @Inject('logger') private logger,
  ) { }


  public async getBuses(): Promise<{ buses: Array<IBus>; }> {
    try {
      const busRecord = await this.busModel.find().populate(['assignedDriver','assignedRoute'])
      if (!busRecord) {
        throw new Error('No Buss found!');
      }
      this.logger.silly('Bus Found');
      const buses = busRecord;
      return { buses };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async getBus(busId:any): Promise<{ bus: IBus; }> {
    try {
      const busRecord = await this.busModel.findOne({_id: busId});
      if (!busRecord) {
        throw new Error('No Buss found!');
      }
      this.logger.silly('Bus Found');
      const bus = busRecord;
      return { bus };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }


  public async addBus(busInputDTO: IBusInput): Promise<{ bus: IBus; success: boolean }> {
    try {    
      const busRecord = await this.busModel.create({...busInputDTO})
      if (!busRecord) {
        throw new Error('Bus cannot be created');
      }
      const bus = busRecord;
      
                  // update the driver data if assignedDriver with the busId 
      if(bus.assignedDriver && bus._id){
        const driverRecord = await this.driverModel.updateOne({_id: bus.assignedDriver}, {assignedBus: bus._id})
      }

      const success = true;
      console.log('bus', bus)
      return { bus, success };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async updateBus(busId: ObjectId, busInputDTO: IBusInput): Promise<{ message:string, success: boolean }> {
    try {    
      const busRecord = await this.busModel.updateOne({"_id": busId},{...busInputDTO})
      if(busRecord.nModified <= 0){
        return {message:"No Modification", success:false}
      }
         // update the driver data if assignedDriver with the busId 
                      if(busInputDTO.assignedDriver && busId){
                        const driverRecord = await this.driverModel.updateOne({_id: busInputDTO.assignedDriver}, {assignedBus: busId})
                      }
      // const bus = busRecord;
      const success = true;
      // console.log('bus', bus)
      return {message:"Bus Updated", success };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async deleteBus(busId: ObjectId): Promise<{  success: boolean; }> {
    try {    
      const busRecord = (await this.busModel.deleteOne({ "_id": busId }))
      console.log('d', busRecord)
      if(busRecord.deletedCount == 0){
        return { success: false}
      }
      return { success: true}
    } catch (e) {
      console.log('error', e)

    }
  }

}