export interface ISupport {
    _id: string;
    title: string;
    message: string;
    studentId: string;
    status?: string;
  }
  
  export interface ISupportInput {
    title: string;
    message: string;
    studentId: string;
    status?: string;

  }
  