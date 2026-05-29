import React from 'react';

interface FilterBarProps {
  filters: Record<string, any>;
  onFilterChange: (key: string, value: any) => void;
  options?: {
    label: string;
    key: string;
    type: 'select' | 'text' | 'date' | 'number';
    choices?: { label: string; value: any }[];
    placeholder?: string;
    min?: number;
    max?: number;
    step?: number;
  }[];
  className?: string;
}

const inputBase = `
  w-full border border-[#e5e7eb] rounded-xl px-3 py-2
  text-sm text-[#111827] bg-[#fafafa]
  placeholder:text-[#9ca3af]
  transition-all duration-150 outline-none
  focus:border-[#e85d04] focus:bg-white
  focus:shadow-[0_0_0_3px_rgba(232,93,4,0.08)]
  hover:border-[#d1d5db]
`;

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFilterChange,
  options = [],
  className,
}) => {
  return (
    <div
      className={`
        bg-white rounded-2xl border border-[#f0ede8]
        shadow-[0_1px_6px_rgba(0,0,0,0.05)]
        p-4 flex flex-wrap gap-4 items-end
        ${className ?? ''}
      `.trim()}
    >
      {options.map(opt => (
        <div key={opt.key} className="flex flex-col gap-1 min-w-[140px]">
          <label className="text-[11px] font-semibold text-[#9ca3af] uppercase tracking-wider pl-0.5">
            {opt.label}
          </label>

          {opt.type === 'select' ? (
            <select
              value={filters[opt.key] || ''}
              onChange={e => onFilterChange(opt.key, e.target.value || undefined)}
              className={inputBase}
              style={{ cursor: 'pointer' }}
            >
              <option value="">Tất cả</option>
              {opt.choices?.map(choice => (
                <option key={choice.value} value={choice.value}>
                  {choice.label}
                </option>
              ))}
            </select>
          ) : opt.type === 'date' ? (
            <input
              type="date"
              value={filters[opt.key] || ''}
              onChange={e => onFilterChange(opt.key, e.target.value || undefined)}
              className={inputBase}
            />
          ) : opt.type === 'number' ? (
            <input
              type="number"
              placeholder={opt.placeholder}
              min={opt.min}
              max={opt.max}
              step={opt.step ?? 1}
              value={filters[opt.key] ?? ''}
              onChange={e =>
                onFilterChange(opt.key, e.target.value !== '' ? Number(e.target.value) : undefined)
              }
              className={inputBase}
            />
          ) : (
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af] pointer-events-none"
                width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder={opt.placeholder}
                value={filters[opt.key] || ''}
                onChange={e => onFilterChange(opt.key, e.target.value || undefined)}
                className={`${inputBase} pl-8`}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};