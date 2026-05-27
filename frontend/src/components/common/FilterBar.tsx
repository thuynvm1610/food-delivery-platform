import React from 'react';

interface FilterBarProps {
  filters: Record<string, any>;
  onFilterChange: (key: string, value: any) => void;
  options?: {
    label: string;
    key: string;
    type: 'select' | 'text' | 'date';
    choices?: { label: string; value: any }[];
    placeholder?: string;
  }[];
}

export const FilterBar: React.FC<FilterBarProps> = ({ filters, onFilterChange, options = [] }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-wrap gap-4 items-center">
      {options.map(opt => (
        <div key={opt.key} className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1 font-semibold">{opt.label}</label>
          {opt.type === 'select' ? (
            <select
              value={filters[opt.key] || ''}
              onChange={(e) => onFilterChange(opt.key, e.target.value || undefined)}
              className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All</option>
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
              onChange={(e) => onFilterChange(opt.key, e.target.value || undefined)}
              className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ) : (
            <input
              type="text"
              placeholder={opt.placeholder}
              value={filters[opt.key] || ''}
              onChange={(e) => onFilterChange(opt.key, e.target.value || undefined)}
              className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}
        </div>
      ))}
    </div>
  );
};
