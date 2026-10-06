import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useHR } from '../../context/HRContext';
import { User, Mail, Briefcase, Building, Calendar, Clock, Sparkles } from 'lucide-react';

export const AddEmployeeModal = ({ isOpen, onClose }) => {
  const { addEmployee, employees } = useHR();

  const nextCode = `EMP-${String((employees?.length || 0) + 1).padStart(3, '0')}`;

  const [formData, setFormData] = useState({
    name: '',
    employeeCode: nextCode,
    email: '',
    role: '',
    department: 'Engineering',
    joiningDate: new Date().toISOString().split('T')[0],
    leaveBalance: {
      casual: 10,
      sick: 8,
      earned: 15,
      maternity: 0
    },
    avatar: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const departments = [
    'Engineering',
    'Product Design',
    'Marketing & Growth',
    'Human Resources',
    'Infrastructure & DevOps',
    'Finance & Operations',
    'Sales & Accounts'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.role) {
      alert('Please fill in Name, Email, and Role');
      return;
    }

    try {
      setIsSubmitting(true);
      await addEmployee({
        ...formData,
        avatar: formData.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(formData.name)}`
      });
      // Reset form
      setFormData({
        name: '',
        employeeCode: `EMP-${String((employees?.length || 0) + 2).padStart(3, '0')}`,
        email: '',
        role: '',
        department: 'Engineering',
        joiningDate: new Date().toISOString().split('T')[0],
        leaveBalance: { casual: 10, sick: 8, earned: 15, maternity: 0 },
        avatar: ''
      });
      onClose();
    } catch (err) {
      console.error('Error adding employee:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add New Employee"
      subtitle="Register new team member. They will instantly appear across HR, Leaves, and Attendance."
    >
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        
        {/* Row 1: Full Name & Employee ID */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
              Full Name *
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="e.g. Aditi Rao"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="filter-input"
                style={{ width: '100%', height: '40px', paddingLeft: '12px' }}
                required
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
              Employee ID
            </label>
            <input
              type="text"
              value={formData.employeeCode}
              onChange={(e) => setFormData({ ...formData, employeeCode: e.target.value })}
              className="filter-input"
              style={{ width: '100%', height: '40px', paddingLeft: '12px', background: '#f8fafc', fontWeight: '600' }}
            />
          </div>
        </div>

        {/* Row 2: Work Email & Role */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
              Work Email *
            </label>
            <input
              type="email"
              placeholder="name@company.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="filter-input"
              style={{ width: '100%', height: '40px', paddingLeft: '12px' }}
              required
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
              Role / Designation *
            </label>
            <input
              type="text"
              placeholder="e.g. Frontend Engineer"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="filter-input"
              style={{ width: '100%', height: '40px', paddingLeft: '12px' }}
              required
            />
          </div>
        </div>

        {/* Row 3: Department & Joining Date */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
              Department
            </label>
            <select
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              className="filter-select"
              style={{ width: '100%', height: '40px' }}
            >
              {departments.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
              Joining Date
            </label>
            <input
              type="date"
              value={formData.joiningDate}
              onChange={(e) => setFormData({ ...formData, joiningDate: e.target.value })}
              className="filter-input"
              style={{ width: '100%', height: '40px', paddingLeft: '12px' }}
            />
          </div>
        </div>

        {/* Row 4: Initial Leave Quota Setup */}
        <div style={{
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: '10px',
          padding: '14px',
          marginTop: '4px'
        }}>
          <span style={{ fontSize: '12px', fontWeight: '700', color: '#1e293b', display: 'block', marginBottom: '10px' }}>
            📅 Annual Leave Balance Allotment (Days):
          </span>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
            <div>
              <label style={{ fontSize: '11px', color: '#64748b', display: 'block', marginBottom: '3px' }}>Casual Leave (CL)</label>
              <input
                type="number"
                min="0"
                value={formData.leaveBalance.casual}
                onChange={(e) => setFormData({
                  ...formData,
                  leaveBalance: { ...formData.leaveBalance, casual: Number(e.target.value) }
                })}
                className="filter-input"
                style={{ width: '100%', height: '36px', paddingLeft: '10px' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '11px', color: '#64748b', display: 'block', marginBottom: '3px' }}>Sick Leave (SL)</label>
              <input
                type="number"
                min="0"
                value={formData.leaveBalance.sick}
                onChange={(e) => setFormData({
                  ...formData,
                  leaveBalance: { ...formData.leaveBalance, sick: Number(e.target.value) }
                })}
                className="filter-input"
                style={{ width: '100%', height: '36px', paddingLeft: '10px' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '11px', color: '#64748b', display: 'block', marginBottom: '3px' }}>Earned Leave (EL)</label>
              <input
                type="number"
                min="0"
                value={formData.leaveBalance.earned}
                onChange={(e) => setFormData({
                  ...formData,
                  leaveBalance: { ...formData.leaveBalance, earned: Number(e.target.value) }
                })}
                className="filter-input"
                style={{ width: '100%', height: '36px', paddingLeft: '10px' }}
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '8px' }}>
          <button type="button" onClick={onClose} className="btn btn-outline" disabled={isSubmitting}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
            {isSubmitting ? 'Saving Employee...' : 'Register Employee'}
          </button>
        </div>
      </form>
    </Modal>
  );
};
