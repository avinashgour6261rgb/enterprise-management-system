import React, { useState } from 'react';
import { Calendar, X } from 'lucide-react';
import { useHR } from '../../context/HRContext';

export const DateRangePicker = () => {
  const { dateRange, setDateRange } = useHR();
  const [isOpen, setIsOpen] = useState(false);

  const handleClear = (e) => {
    e.stopPropagation();
    setDateRange({ startDate: '', endDate: '' });
  };

  const hasValue = dateRange.startDate || dateRange.endDate;

  const displayLabel = hasValue
    ? `${dateRange.startDate || 'Start'} to ${dateRange.endDate || 'End'}`
    : 'Start Date To End Date';

  return (
    <div style={{ position: 'relative' }}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          height: '36px',
          padding: '0 12px',
          background: hasValue ? '#eff6ff' : '#f8fafc',
          border: hasValue ? '1px solid #93c5fd' : '1px solid #e2e8f0',
          borderRadius: '8px',
          fontSize: '13px',
          color: hasValue ? '#1e40af' : '#64748b',
          cursor: 'pointer',
          userSelect: 'none',
          minWidth: '220px',
          justifyContent: 'space-between'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Calendar size={15} color={hasValue ? '#2563eb' : '#94a3b8'} />
          <span style={{ fontWeight: hasValue ? '600' : '400' }}>{displayLabel}</span>
        </div>
        {hasValue && (
          <button
            onClick={handleClear}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#3b82f6',
              cursor: 'pointer',
              display: 'flex',
              padding: '2px'
            }}
          >
            <X size={14} />
          </button>
        )}
      </div>

      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '42px',
          left: '0',
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '12px',
          padding: '16px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
          zIndex: 50,
          width: '280px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          animation: 'fadeIn 0.15s ease'
        }}>
          <div>
            <label style={{ fontSize: '11px', fontWeight: '600', color: '#64748b', display: 'block', marginBottom: '4px' }}>
              Start Date
            </label>
            <input
              type="date"
              value={dateRange.startDate}
              onChange={(e) => setDateRange(prev => ({ ...prev, startDate: e.target.value }))}
              style={{
                width: '100%',
                height: '34px',
                padding: '0 8px',
                border: '1px solid #cbd5e1',
                borderRadius: '6px',
                fontSize: '13px'
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: '11px', fontWeight: '600', color: '#64748b', display: 'block', marginBottom: '4px' }}>
              End Date
            </label>
            <input
              type="date"
              value={dateRange.endDate}
              onChange={(e) => setDateRange(prev => ({ ...prev, endDate: e.target.value }))}
              style={{
                width: '100%',
                height: '34px',
                padding: '0 8px',
                border: '1px solid #cbd5e1',
                borderRadius: '6px',
                fontSize: '13px'
              }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '6px' }}>
            <button
              onClick={() => {
                setDateRange({ startDate: '', endDate: '' });
                setIsOpen(false);
              }}
              className="btn btn-outline"
              style={{ height: '30px', padding: '0 10px', fontSize: '12px' }}
            >
              Reset
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="btn btn-primary"
              style={{ height: '30px', padding: '0 12px', fontSize: '12px' }}
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
