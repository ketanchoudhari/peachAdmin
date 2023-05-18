export interface GenericResponse<T> {
  errorCode: any;
  errorDescription: any;
  result: T;
}
