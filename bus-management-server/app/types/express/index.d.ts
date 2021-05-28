import { Document, Model } from 'mongoose';
import mongoose from 'mongoose'
import { IUser } from '../../interfaces/IUser';
import { IStop } from '../../interfaces/IStop';
import { IStudent } from '../../interfaces/IStudent';
import { IDepartment } from '../../interfaces/IDepartment';
import { IBus } from '../../interfaces/IBus';
import { IDriver } from '../../interfaces/IDriver';
import { IRoute } from '../../interfaces/IRoute';
import { ISupport } from '../../interfaces/ISupport';

declare global {
  
  namespace Express {
    export interface Request {
      currentUser: IUser & Document;

    }    
  }
  namespace Models {
    export type StopModel = Model<IStop & Document>;
    export type UserModel = Model<IUser & Document>;
    export type BusModel = Model<IBus & Document>;
    export type RouteModel = Model<IRoute & Document>;
    export type DepartmentModel = Model<IDepartment & Document>;
    export type SupportModel = Model<ISupport & Document>;
    export type DriverModel = Model<IDriver & Document>;
    export type StudentModel = Model<IStudent & Document>;
  }
  export type ObjectId = mongoose.Schema.Types.ObjectId;
}

