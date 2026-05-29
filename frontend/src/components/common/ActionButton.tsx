import React from 'react';

interface ActionButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  label,
  onClick,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  className = '',
  icon,
}) => {
  const base = `
    relative inline-flex items-center justify-center gap-2
    font-semibold rounded-xl overflow-hidden
    transition-all duration-200 ease-out
    cursor-pointer
    disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
    select-none
  `;

  const variants: Record<string, string> = {
    primary: `
      bg-[#e85d04] text-white
      shadow-[0_2px_12px_rgba(232,93,4,0.35)]
      hover:bg-[#c44900] hover:-translate-y-[1px]
      hover:shadow-[0_6px_20px_rgba(232,93,4,0.45)]
      active:translate-y-0 active:shadow-none
      focus-visible:ring-[#e85d04]
    `,
    secondary: `
      bg-white text-[#374151] border border-[#e5e7eb]
      shadow-[0_1px_4px_rgba(0,0,0,0.06)]
      hover:border-[#d1d5db] hover:bg-[#f9fafb] hover:-translate-y-[1px]
      hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)]
      active:translate-y-0
      focus-visible:ring-[#6b7280]
    `,
    danger: `
      bg-[#dc2626] text-white
      shadow-[0_2px_8px_rgba(220,38,38,0.3)]
      hover:bg-[#b91c1c] hover:-translate-y-[1px]
      hover:shadow-[0_4px_16px_rgba(220,38,38,0.4)]
      active:translate-y-0
      focus-visible:ring-[#dc2626]
    `,
    success: `
      bg-[#047857] text-white
      shadow-[0_2px_8px_rgba(4,120,87,0.3)]
      hover:bg-[#065f46] hover:-translate-y-[1px]
      hover:shadow-[0_4px_16px_rgba(4,120,87,0.4)]
      active:translate-y-0
      focus-visible:ring-[#047857]
    `,
    ghost: `
      bg-transparent text-[#6b7280] border border-[#e5e7eb]
      hover:bg-[#f3f4f6] hover:text-[#111827] hover:border-[#d1d5db]
      active:bg-[#e5e7eb]
      focus-visible:ring-[#6b7280]
    `,
  };

  const sizes: Record<string, string> = {
    sm: 'px-3 py-1.5 text-xs h-8',
    md: 'px-4 py-2 text-sm h-9',
    lg: 'px-6 py-2.5 text-base h-11',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {/* Shimmer on hover for primary */}
      {variant === 'primary' && (
        <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
      )}
      {loading ? (
        <>
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
          <span>Đang xử lý...</span>
        </>
      ) : (
        <>
          {icon && <span className="shrink-0">{icon}</span>}
          <span>{label}</span>
        </>
      )}
    </button>
  );
};