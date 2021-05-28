export interface IUser {
    _id: string;
    name: string;
    email: string;
    password: string;
    salt: string;
    likes:Array<any>;
  }
  
  export interface IUserInput {
    name: string;
    email: string;
    password: string;

  }
  