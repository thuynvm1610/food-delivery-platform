export interface BaseResponse<T> {
  success: boolean;
  code: string;
  message: string;
  data: T;
}

export interface ErrorResponse {
  success: boolean;
  code: string;
  message: string;
}
