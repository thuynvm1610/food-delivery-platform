import React, { useEffect, useState } from 'react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
  onClose?: () => void;
  className?: string;
}

const typeConfig = {
  success: { bg: 'bg-green-100', text: 'text-green-800', icon: '✓' },
  error: { bg: 'bg-red-100', text: 'text-red-800', icon: '✕' },
  info: { bg: 'bg-blue-100', text: 'text-blue-800', icon: 'ℹ' },
  warning: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: '!' },
};

export const Toast: React.FC<ToastProps> = ({ message, type = 'info', duration = 3000, onClose, className }) => {
  const [isVisible, setIsVisible] = useState(true);
  const config = typeConfig[type];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed bottom-4 right-4 rounded-lg shadow-lg p-4 ${config.bg} ${config.text} flex items-center gap-3 max-w-sm animation-fade-in-down ${className ?? ''}`.trim()}
    >
      <span className="text-xl font-bold">{config.icon}</span>
      <p className="text-sm font-medium">{message}</p>
      <button
        onClick={() => setIsVisible(false)}
        className="ml-auto text-xl font-bold opacity-70 hover:opacity-100"
      >
        ✕
      </button>
    </div>
  );
};

// Toast Container to manage multiple toasts
interface ToastContainerProps {
  toasts: Array<ToastProps & { id: string }>;
  removeToast: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, removeToast }) => {
  return (
    <div className="fixed bottom-4 right-4 space-y-2 z-50">
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          {...toast}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
};
