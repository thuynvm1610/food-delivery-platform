import type { UserRole } from '../types/auth';

export function getHomePathForRole(role: UserRole): string {
  switch (role) {
    case 'ROLE_CUSTOMER':
      return '/customer';
    case 'ROLE_DRIVER':
      return '/driver';
    case 'ROLE_RESTAURANT':
      return '/dashboard/home';
    case 'ROLE_ADMIN':
      return '/admin';
    default:
      return '/';
  }
}

export function getRoleLabel(role: UserRole): string {
  switch (role) {
    case 'ROLE_CUSTOMER':
      return 'Khách hàng';
    case 'ROLE_DRIVER':
      return 'Tài xế';
    case 'ROLE_RESTAURANT':
      return 'Nhà hàng';
    case 'ROLE_ADMIN':
      return 'Quản trị';
    default:
      return role;
  }
}
