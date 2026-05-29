import React from 'react';

type State = { hasError: boolean; error?: Error };

export class ErrorBoundary extends React.Component<React.PropsWithChildren<{}>, State> {
  constructor(props: React.PropsWithChildren<{}>) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: any) {
    console.error('ErrorBoundary caught error', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: '60vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '48px 24px',
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          <div
            style={{
              maxWidth: 480,
              width: '100%',
              textAlign: 'center',
            }}
          >
            {/* Icon */}
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: '20px',
                background: 'linear-gradient(135deg, #fff5f5, #fee2e2)',
                border: '1px solid rgba(220,38,38,0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px',
                fontSize: 32,
              }}
            >
              ⚠️
            </div>

            <h2
              style={{
                fontSize: 22,
                fontWeight: 700,
                color: '#111827',
                margin: '0 0 8px',
                letterSpacing: '-0.4px',
              }}
            >
              Đã xảy ra lỗi
            </h2>

            <p
              style={{
                fontSize: 14,
                color: '#dc2626',
                margin: '0 0 16px',
                background: '#fff5f5',
                border: '1px solid rgba(220,38,38,0.15)',
                borderRadius: 10,
                padding: '10px 16px',
                wordBreak: 'break-word',
                lineHeight: 1.6,
              }}
            >
              {this.state.error?.message ?? 'Lỗi không xác định'}
            </p>

            <p
              style={{
                fontSize: 14,
                color: '#6b7280',
                margin: '0 0 28px',
                lineHeight: 1.6,
              }}
            >
              Vui lòng thử tải lại trang hoặc liên hệ quản trị viên nếu lỗi tiếp tục xảy ra.
            </p>

            <button
              onClick={() => window.location.reload()}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '10px 24px',
                borderRadius: 12,
                background: '#111827',
                color: '#fff',
                border: 'none',
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = '#1f2937';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = '#111827';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
              </svg>
              Tải lại trang
            </button>
          </div>
        </div>
      );
    }

    return this.props.children as React.ReactElement;
  }
}

export default ErrorBoundary;