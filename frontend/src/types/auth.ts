export type UserRole =
  | 'ROLE_CUSTOMER'
  | 'ROLE_DRIVER'
  | 'ROLE_RESTAURANT'
  | 'ROLE_ADMIN';

export interface SessionUser {
  userId: string;
  email: string;
  role: UserRole;
}

export interface LoginResponse {
  userId: string;
  email: string;
  role: UserRole;
}
