export interface IRoute {
    _id: string;
    name: string;
    stops?: Array<any>;
  }
  
  export interface IRouteInput {
    name: string;
    stops?: Array<any>;

  }
  