export interface IDriver {
    _id: string;
    name: string;
    phone: string;
    photo?: any;
    assignedBus?:any;

  }
  
  export interface IDriverInput {
    name: string;
    phone: string;
    photo?: any;
    assignedBus?:any;
  }
  