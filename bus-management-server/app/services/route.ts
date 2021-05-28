import Container, { Service, Inject } from 'typedi';
import config from '../config';
import { IRoute, IRouteInput } from '../interfaces/IRoute';
import mongoose from 'mongoose'
@Service()
export default class RouteService {

  constructor(
    @Inject('routeModel') private routeModel: Models.RouteModel,
    @Inject('userModel') private userModel: Models.UserModel,
    @Inject('logger') private logger,
  ) { }


  public async getRoutes(): Promise<{ routes: Array<IRoute>; }> {
    try {
      const routeRecord = await this.routeModel.find();
      if (!routeRecord) {
        throw new Error('No Routes found!');
      }
      this.logger.silly('Route Found');
      const routes = routeRecord;
      return { routes };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async getRoute(routeId:any): Promise<{ route: IRoute; }> {
    try {
      const routeRecord = await this.routeModel.findOne({_id: routeId});
      const route = routeRecord;
      if (!routeRecord) {
        return {route:null}
      }
      this.logger.silly('Route Found');
      return { route };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }


  public async addRoute(routeInputDTO: IRouteInput): Promise<{ route: IRoute; success: boolean }> {
    try {    
      const routeRecord = await this.routeModel.create({...routeInputDTO})
      if (!routeRecord) {
        throw new Error('Route cannot be created');
      }
      const route = routeRecord;
      const success = true;
      console.log('route', route)
      return { route, success };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async updateRoute(routeId: ObjectId, routeInputDTO: IRouteInput): Promise<{ message:string, success: boolean }> {
    try {    
      const routeRecord = await this.routeModel.updateOne({"_id": routeId},{...routeInputDTO})
      if(routeRecord.nModified <= 0){
        return {message:"No Modification", success:false}
      }
      // const route = routeRecord;
      const success = true;
      // console.log('route', route)
      return {message:"Route Updated", success };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async deleteRoute(routeId: ObjectId): Promise<{  success: boolean; }> {
    try {    
      const routeRecord = (await this.routeModel.deleteOne({ "_id": routeId }))
      console.log('d', routeRecord)
      if(routeRecord.deletedCount == 0){
        return { success: false}
      }
      return { success: true}
    } catch (e) {
      console.log('error', e)

    }
  }

}