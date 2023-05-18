export interface GenericResponse<T>{
    errorCode: number;
    errorDescription: any;
    result: T;
  } 
  