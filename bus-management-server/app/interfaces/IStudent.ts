export interface IStudent {
    _id: string;
    name: string;
    systemId: string;
    email: string;
    password: string;
    sex: string;
    phone: any;
    photo:any;
    verified: boolean;
    slipPhoto: string;
    slipVerified: boolean;
    department:any;

  }
  
  export interface IStudentInput {
    name?: string;
    systemId?: string;
    email?: string;
    password?: string;
    sex?: string;
    phone?: any;
    photo?:any;
    verified?: boolean;
    slipPhoto?: string;
    slipVerified?: boolean;
    department?: any;

  }
  