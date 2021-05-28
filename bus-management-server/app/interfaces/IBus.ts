export interface IBus {
    _id: string;
    name: string;
    capacity: number;
    assignedRoute?: any;
    assignedDriver?: any;
  }
  
  export interface IBusInput {
    name: string;
    capacity: number;
    assignedRoute?: any;
    assignedDriver?: any;
  }
  