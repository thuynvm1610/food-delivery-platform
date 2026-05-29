import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const commonOptions = {
  toast: true,
  position: 'top-end' as const,
  showConfirmButton: false,
  timer: 2800,
  timerProgressBar: true,
  background: '#ffffff',
  color: '#111827',
  iconColor: '#2563eb',
};

export const notifySuccess = (message: string) => {
  return Swal.fire({
    ...commonOptions,
    icon: 'success',
    title: message,
    background: '#ecfdf5',
    color: '#166534',
    iconColor: '#16a34a',
  });
};

export const notifyError = (message: string) => {
  return Swal.fire({
    ...commonOptions,
    icon: 'error',
    title: message,
    background: '#fef2f2',
    color: '#991b1b',
    iconColor: '#dc2626',
  });
};

export const notifyWarning = (message: string) => {
  return Swal.fire({
    ...commonOptions,
    icon: 'warning',
    title: message,
    background: '#fffbeb',
    color: '#92400e',
    iconColor: '#f59e0b',
  });
};

export const confirmDialog = async (title: string, text: string) => {
  const result = await Swal.fire({
    title,
    text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Xác nhận',
    cancelButtonText: 'Hủy',
    reverseButtons: true,
    background: '#ffffff',
    color: '#111827',
  });

  return result.isConfirmed;
};
