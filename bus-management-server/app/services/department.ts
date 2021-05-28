import Container, { Service, Inject } from 'typedi';
import config from '../config';
import { IDepartment, IDepartmentInput } from '../interfaces/IDepartment';
import mongoose from 'mongoose'
@Service()
export default class DepartmentService {

  constructor(
    @Inject('departmentModel') private departmentModel: Models.DepartmentModel,
    @Inject('userModel') private userModel: Models.UserModel,
    @Inject('logger') private logger,
  ) { }


  public async getDepartments(): Promise<{ departments: Array<IDepartment>; }> {
    try {
      const departmentRecord = await this.departmentModel.find();
      if (!departmentRecord) {
        throw new Error('No Departments found!');
      }
      this.logger.silly('Department Found');
      const departments = departmentRecord;
      return { departments };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async getDepartment(departmentId:any): Promise<{ department: IDepartment; }> {
    try {
      const departmentRecord = await this.departmentModel.findOne({_id: departmentId});
      if (!departmentRecord) {
        throw new Error('No Departments found!');
      }
      this.logger.silly('Department Found');
      const department = departmentRecord;
      return { department };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }


  public async addDepartment(departmentInputDTO: IDepartmentInput): Promise<{ department: IDepartment; success: boolean }> {
    try {    
      const departmentRecord = await this.departmentModel.create({...departmentInputDTO})
      if (!departmentRecord) {
        throw new Error('Department cannot be created');
      }
      const department = departmentRecord;
      const success = true;
      console.log('department', department)
      return { department, success };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async updateDepartment(departmentId: ObjectId, departmentInputDTO: IDepartmentInput): Promise<{ message:string, success: boolean }> {
    try {    
      const departmentRecord = await this.departmentModel.updateOne({"_id": departmentId},{...departmentInputDTO})
      if(departmentRecord.nModified <= 0){
        return {message:"No Modification", success:false}
      }
      // const department = departmentRecord;
      const success = true;
      // console.log('department', department)
      return {message:"Department Updated", success };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async deleteDepartment(departmentId: ObjectId): Promise<{  success: boolean; }> {
    try {    
      const departmentRecord = (await this.departmentModel.deleteOne({ "_id": departmentId }))
      console.log('d', departmentRecord)
      if(departmentRecord.deletedCount == 0){
        return { success: false}
      }
      return { success: true}
    } catch (e) {
      console.log('error', e)

    }
  }

}