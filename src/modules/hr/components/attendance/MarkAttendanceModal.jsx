import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { useHR } from '../../context/HRContext';

export const MarkAttendanceModal = ({ isOpen, onClose, initialData = null }) => {
  const { employees, markAttendanceRecord } = useHR();

  const [formData, setFormData] = useState({
    employeeId: 'emp_001',
    date: new Date().toISOString().split('T')[0],
    status: 'present',
    clockInTime: '09:15:00',
    clockOutTime: '18:30:00',
    notes: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        employeeId: initialData.employeeId || 'emp_001',
        date: initialData.date || new Date().toISOString().split('T')[0],
        status: initialData.status || 'present',
        clockInTime: initialData.clockInTime || '09:15:00',
        clockOutTime: initialData.clockOutTime || '18:30:00',
        notes: initialData.notes || ''
      });
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await markAttendanceRecord(formData);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Mark / Edit Attendance Record"
      subtitle="Adjust daily punch logs, presence status, and timestamps."
    >
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
            Employee
          </label>
          <select
            value={formData.employeeId}
            onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
            className="filter-select"
            style={{ width: '100%', height: '40px' }}
          >
            {employees.map(emp => (
              <option key={emp._id} value={emp._id}>
                {emp.name} ({emp.role}) {emp.isCurrentUser ? "— It's You" : ''}
              </option>
            ))}
          </select>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
              Date
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="filter-input"
              style={{ width: '100%', height: '40px', paddingLeft: '12px' }}
              required
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="filter-select"
              style={{ width: '100%', height: '40px' }}
            >
              <option value="present">✔️ Present</option>
              <option value="late">⚠️ Late</option>
              <option value="half_day">🌟 Half Day</option>
              <option value="absent">❌ Absent</option>
              <option value="on_leave">✈️ On Leave</option>
              <option value="holiday">⭐ Holiday</option>
              <option value="day_off">📅 Day Off</option>
            </select>
          </div>
        </div>

        {['present', 'late', 'half_day'].includes(formData.status) && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
                Clock-In Time
              </label>
              <input
                type="time"
                value={formData.clockInTime?.substring(0, 5) || '09:15'}
                onChange={(e) => setFormData({ ...formData, clockInTime: `${e.target.value}:00` })}
                className="filter-input"
                style={{ width: '100%', height: '40px', paddingLeft: '12px' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
                Clock-Out Time
              </label>
              <input
                type="time"
                value={formData.clockOutTime?.substring(0, 5) || '18:30'}
                onChange={(e) => setFormData({ ...formData, clockOutTime: `${e.target.value}:00` })}
                className="filter-input"
                style={{ width: '100%', height: '40px', paddingLeft: '12px' }}
              />
            </div>
          </div>
        )}

        <div>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
            Remarks / Note
          </label>
          <input
            type="text"
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            placeholder="e.g. Remote work, traffic delay, doctor appointment"
            className="filter-input"
            style={{ width: '100%', height: '40px', paddingLeft: '12px' }}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
          <button type="button" onClick={onClose} className="btn btn-outline">
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Save Record
          </button>
        </div>
      </form>
    </Modal>
  );
};
