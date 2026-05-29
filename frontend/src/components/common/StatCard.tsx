import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: { value: number; direction: 'up' | 'down' };
  onClick?: () => void;
  accent?: string;
  accentBg?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  trend,
  onClick,
  accent = '#e85d04',
  accentBg = 'rgba(232,93,4,0.08)',
}) => {
  return (
    <div
      onClick={onClick}
      style={{
        background: '#fff',
        borderRadius: 16,
        padding: '20px',
        border: '1px solid #f0ede8',
        boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.2s ease',
        fontFamily: "'DM Sans', sans-serif",
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={e => {
        if (!onClick) return;
        (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(0,0,0,0.10)';
        (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={e => {
        if (!onClick) return;
        (e.currentTarget as HTMLElement).style.boxShadow = '0 1px 4px rgba(0,0,0,0.05)';
        (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
      }}
    >
      {/* Subtle top accent line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 3,
        background: `linear-gradient(90deg, ${accent}, transparent)`,
        opacity: 0.6,
      }} />

      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontSize: 12, color: '#9ca3af', margin: '0 0 10px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {title}
          </p>
          <p style={{ fontSize: 26, fontWeight: 700, color: '#111827', margin: 0, letterSpacing: '-0.5px', lineHeight: 1 }}>
            {value}
          </p>
          {trend && (
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 4,
              marginTop: 10,
              padding: '2px 8px',
              borderRadius: 999,
              fontSize: 12, fontWeight: 600,
              background: trend.direction === 'up' ? 'rgba(4,120,87,0.10)' : 'rgba(220,38,38,0.10)',
              color: trend.direction === 'up' ? '#047857' : '#dc2626',
            }}>
              {trend.direction === 'up' ? '↑' : '↓'} {Math.abs(trend.value)}%
            </div>
          )}
        </div>
        {icon && (
          <div style={{
            width: 44, height: 44, borderRadius: 12,
            background: accentBg,
            color: accent,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
            fontSize: 20,
          }}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};