import Container, { Service, Inject } from 'typedi';
import config from '../config';
import { ISupport, ISupportInput } from '../interfaces/ISupport';
import mongoose from 'mongoose'
@Service()
export default class SupportService {

  constructor(
    @Inject('supportModel') private supportModel: Models.SupportModel,
    @Inject('userModel') private userModel: Models.UserModel,
    @Inject('logger') private logger,
  ) { }


  public async getSupports(): Promise<{ supports: Array<ISupport>; }> {
    try {
      const supportRecord = await this.supportModel.find().populate(['studentId']);
      console.log('supportRecord');
      if (!supportRecord) {
        throw new Error('No Supports found!');
      }
      this.logger.silly('Support Found');
      const supports = supportRecord;
      return { supports };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async getSupport(supportId:any): Promise<{ support: ISupport; }> {
    try {
      const supportRecord = await this.supportModel.findOne({_id: supportId});
      if (!supportRecord) {
        throw new Error('No Supports found!');
      }
      this.logger.silly('Support Found');
      const support = supportRecord;
      return { support };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }


  public async addSupport(supportInputDTO: ISupportInput): Promise<{ support: ISupport; success: boolean }> {
    try {    
      const supportRecord = await this.supportModel.create({...supportInputDTO})
      if (!supportRecord) {
        throw new Error('Support cannot be created');
      }
      const support = supportRecord;
      const success = true;
      console.log('support', support)
      return { support, success };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async updateSupport(supportId: ObjectId, supportInputDTO: ISupportInput): Promise<{ message:string, success: boolean }> {
    try {    
      const supportRecord = await this.supportModel.updateOne({"_id": supportId},{...supportInputDTO})
      if(supportRecord.nModified <= 0){
        return {message:"No Modification", success:false}
      }
      // const support = supportRecord;
      const success = true;
      // console.log('support', support)
      return {message:"Support Updated", success };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async deleteSupport(supportId: ObjectId): Promise<{  success: boolean; }> {
    try {    
      const supportRecord = (await this.supportModel.deleteOne({ "_id": supportId }))
      console.log('d', supportRecord)
      if(supportRecord.deletedCount == 0){
        return { success: false}
      }
      return { success: true}
    } catch (e) {
      console.log('error', e)

    }
  }

}