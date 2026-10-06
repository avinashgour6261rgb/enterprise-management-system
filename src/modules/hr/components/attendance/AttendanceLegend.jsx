import React from 'react';

export const AttendanceLegend = () => {
  const items = [
    { icon: '✔️', label: 'Present', color: '#16a34a', bg: '#dcfce7' },
    { icon: '🌟', label: 'Half Day', color: '#8b5cf6', bg: '#f3e8ff' },
    { icon: '⚠️', label: 'Late', color: '#d97706', bg: '#fef3c7' },
    { icon: '❌', label: 'Absent', color: '#dc2626', bg: '#fee2e2' },
    { icon: '✈️', label: 'On Leave', color: '#0284c7', bg: '#e0f2fe' },
    { icon: '⭐', label: 'Holiday', color: '#854d0e', bg: '#fef9c3' },
    { icon: '📅', label: 'Day Off', color: '#64748b', bg: '#f1f5f9' },
    { icon: '—', label: 'Not Marked', color: '#94a3b8', bg: '#f8fafc' }
  ];

  return (
    <div style={{
      background: '#ffffff',
      border: '1px solid #e2e8f0',
      borderRadius: '10px',
      padding: '10px 16px',
      marginBottom: '16px',
      display: 'flex',
      alignItems: 'center',
      gap: '14px',
      flexWrap: 'wrap',
      fontSize: '12px',
      color: '#475569',
      boxShadow: 'var(--shadow-sm)'
    }}>
      <span style={{ fontWeight: '700', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '4px' }}>
        <span>Status Legend:</span>
      </span>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
        {items.map((item, idx) => (
          <div
            key={idx}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: item.bg,
              padding: '2px 8px',
              borderRadius: '6px',
              border: '1px solid rgba(0,0,0,0.05)'
            }}
          >
            <span style={{ fontSize: '13px' }}>{item.icon}</span>
            <span style={{ fontWeight: '600', color: item.color }}>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
