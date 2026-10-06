import React from 'react';
import { Modal } from '../common/Modal';
import { useHR } from '../../context/HRContext';
import { Check, X, Trash2, Calendar, Clock, User, ShieldCheck } from 'lucide-react';

export const LeaveDetailModal = ({ leave, isOpen, onClose }) => {
  const { updateLeaveStatus, deleteLeave } = useHR();

  if (!leave) return null;

  const handleApprove = async () => {
    await updateLeaveStatus(leave._id, 'approved');
    onClose();
  };

  const handleReject = async () => {
    await updateLeaveStatus(leave._id, 'rejected');
    onClose();
  };

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this leave record?')) {
      await deleteLeave(leave._id);
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Leave Application Details"
      subtitle={`Reference ID: ${leave._id}`}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        {/* Employee Banner */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          padding: '12px 16px',
          backgroundColor: '#f8fafc',
          borderRadius: '10px',
          border: '1px solid #e2e8f0'
        }}>
          <div className="employee-avatar" style={{ width: '44px', height: '44px', fontSize: '15px' }}>
            {leave.employeeAvatar ? (
              <img src={leave.employeeAvatar} alt={leave.employeeName} />
            ) : (
              leave.employeeName.charAt(0)
            )}
          </div>
          <div>
            <div style={{ fontWeight: '700', fontSize: '15px', color: '#0f172a' }}>
              {leave.employeeName}
            </div>
            <div style={{ fontSize: '12px', color: '#64748b' }}>
              {leave.employeeRole}
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
          <div style={{ padding: '10px 14px', border: '1px solid #f1f5f9', borderRadius: '8px', background: '#fafbfc' }}>
            <div style={{ fontSize: '11px', color: '#64748b', fontWeight: '600', textTransform: 'uppercase' }}>
              Leave Type
            </div>
            <div style={{ fontWeight: '600', color: '#1e293b', marginTop: '2px', fontSize: '13.5px' }}>
              {leave.leaveType}
            </div>
          </div>

          <div style={{ padding: '10px 14px', border: '1px solid #f1f5f9', borderRadius: '8px', background: '#fafbfc' }}>
            <div style={{ fontSize: '11px', color: '#64748b', fontWeight: '600', textTransform: 'uppercase' }}>
              Duration
            </div>
            <div style={{ fontWeight: '600', color: '#1e293b', marginTop: '2px', fontSize: '13.5px' }}>
              {leave.durationText}
            </div>
          </div>

          <div style={{ padding: '10px 14px', border: '1px solid #f1f5f9', borderRadius: '8px', background: '#fafbfc' }}>
            <div style={{ fontSize: '11px', color: '#64748b', fontWeight: '600', textTransform: 'uppercase' }}>
              Leave Dates
            </div>
            <div style={{ fontWeight: '600', color: '#1e293b', marginTop: '2px', fontSize: '13px' }}>
              {leave.startDate} {leave.endDate !== leave.startDate ? `to ${leave.endDate}` : ''}
            </div>
          </div>

          <div style={{ padding: '10px 14px', border: '1px solid #f1f5f9', borderRadius: '8px', background: '#fafbfc' }}>
            <div style={{ fontSize: '11px', color: '#64748b', fontWeight: '600', textTransform: 'uppercase' }}>
              Status
            </div>
            <div style={{ marginTop: '4px' }}>
              <span className={`badge badge-${leave.status}`}>
                {leave.status}
              </span>
            </div>
          </div>
        </div>

        {/* Reason Box */}
        <div style={{ padding: '12px 14px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <div style={{ fontSize: '11px', color: '#64748b', fontWeight: '600', textTransform: 'uppercase', marginBottom: '4px' }}>
            Reason Stated
          </div>
          <p style={{ fontSize: '13px', color: '#334155', lineHeight: '1.5' }}>
            {leave.reason || 'No specific reason provided.'}
          </p>
        </div>

        {leave.approvedBy && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#16a34a' }}>
            <ShieldCheck size={16} />
            <span>Approved by <strong>{leave.approvedBy}</strong></span>
          </div>
        )}

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #e2e8f0', paddingTop: '16px' }}>
          <button
            onClick={handleDelete}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: '#ef4444',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: '600'
            }}
          >
            <Trash2 size={16} />
            <span>Delete</span>
          </button>

          <div style={{ display: 'flex', gap: '8px' }}>
            {leave.status === 'pending' && (
              <>
                <button
                  onClick={handleReject}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 14px',
                    borderRadius: '8px',
                    background: '#fee2e2',
                    color: '#dc2626',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: '600'
                  }}
                >
                  <X size={15} />
                  <span>Reject</span>
                </button>
                <button
                  onClick={handleApprove}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    background: '#16a34a',
                    color: '#ffffff',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: '600'
                  }}
                >
                  <Check size={15} />
                  <span>Approve</span>
                </button>
              </>
            )}
            <button onClick={onClose} className="btn btn-outline">
              Close
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
