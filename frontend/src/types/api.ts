export interface PageResponse<T> {
  content: T;
  pageable?: any;
  totalElements: number;
  totalPages: number;
  number: number; // zero-based page index
  size: number; // page size
}

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
