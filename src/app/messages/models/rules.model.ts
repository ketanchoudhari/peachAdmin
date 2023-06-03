export interface MessagesRules {
    rules: string;
  }
  export interface GenericResponse<T> {
    errorCode: number;
    result: T;
  }
  
export interface CreateRulesResponse {
  rules: string;
}