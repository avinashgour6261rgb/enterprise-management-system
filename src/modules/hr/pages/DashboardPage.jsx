import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  Palmtree,
  UserCheck,
  UserX,
  CalendarCheck,
  Award,
  ArrowRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Sparkles,
  Calendar,
  ChevronRight,
  Plus,
  ThumbsUp,
  Trophy,
  Filter,
  UserPlus
} from 'lucide-react';
import { useHR } from '../context/HRContext';
import { useTimer } from '../../../shared/context/TimerContext';
import { NewLeaveModal } from '../components/leaves/NewLeaveModal';
import { MarkAttendanceModal } from '../components/attendance/MarkAttendanceModal';
import { AddHolidayModal } from '../components/holidays/AddHolidayModal';
import { AddAppreciationModal } from '../components/appreciation/AddAppreciationModal';
import { AddEmployeeModal } from '../components/employees/AddEmployeeModal';
import { EmployeeDirectoryModal } from '../components/employees/EmployeeDirectoryModal';

export const DashboardPage = () => {
  const navigate = useNavigate();
  const {
    employees,
    leaves,
    attendance,
    holidays,
    appreciations,
    currentUser,
    updateLeaveStatus
  } = useHR();
  const { timeString, isRunning } = useTimer();

  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
  const [isAttendanceModalOpen, setIsAttendanceModalOpen] = useState(false);
  const [isHolidayModalOpen, setIsHolidayModalOpen] = useState(false);
  const [isAppreciationModalOpen, setIsAppreciationModalOpen] = useState(false);
  const [isAddEmpModalOpen, setIsAddEmpModalOpen] = useState(false);
  const [isEmpDirectoryModalOpen, setIsEmpDirectoryModalOpen] = useState(false);

  // Dynamic today reference for active dashboard metrics
  const realTodayStr = new Date().toISOString().split('T')[0];
  const todayStr = attendance.some(a => a.date === realTodayStr) 
    ? realTodayStr 
    : (attendance.length > 0 ? attendance[attendance.length - 1].date : realTodayStr);

  // 1. Employees on Leave Today (exact date span match)
  const employeesOnLeave = leaves.filter(l =>
    l.status === 'approved' && l.startDate <= todayStr && l.endDate >= todayStr
  );

  // 2. Exact Attendance calculations for today
  const todayAttendance = attendance.filter(a => a.date === todayStr);
  const presentTodayCount = todayAttendance.filter(a => a.status === 'present').length;
  const lateTodayCount = todayAttendance.filter(a => a.status === 'late').length;
  const halfDayTodayCount = todayAttendance.filter(a => a.status === 'half_day').length;
  const totalPresentToday = presentTodayCount + lateTodayCount + halfDayTodayCount;

  // Absent today: exact computation from attendance logs and active employee roster
  const markedAbsentCount = todayAttendance.filter(a => a.status === 'absent').length;
  const activeEmployeesCount = employees.filter(e => e.status === 'active').length || employees.length;
  const unloggedTodayCount = Math.max(0, activeEmployeesCount - (totalPresentToday + employeesOnLeave.length));
  const absentTodayCount = markedAbsentCount > 0 ? markedAbsentCount : unloggedTodayCount;

  // Exact Attendance Rate % today
  const todayAttendanceRate = activeEmployeesCount > 0 
    ? Math.min(100, Math.round(((presentTodayCount + lateTodayCount + (halfDayTodayCount * 0.5)) / activeEmployeesCount) * 100)) 
    : 0;

  // 3. Pending leaves
  const pendingLeaves = leaves.filter(l => l.status === 'pending');

  // 4. Upcoming Holidays (after todayStr)
  const upcomingHolidays = holidays.filter(h => h.date >= todayStr);
  const nextHoliday = upcomingHolidays[0] || holidays[0];

  // 5. Total Appreciations
  const totalAppreciationsCount = appreciations.length;

  return (
    <div className="animate-fade-in">
      {/* Welcome Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #101b33 0%, #1e293b 100%)',
        borderRadius: '16px',
        padding: '24px 28px',
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '20px',
        marginBottom: '24px',
        boxShadow: 'var(--shadow-md)'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span style={{
              background: 'rgba(37, 99, 235, 0.3)',
              color: '#60a5fa',
              padding: '2px 8px',
              borderRadius: '6px',
              fontSize: '11.5px',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.04em'
            }}>
              EMS
            </span>
            <span style={{ fontSize: '13px', color: '#94a3b8' }}>• Enterprise Management System</span>
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: '800', letterSpacing: '-0.02em', color: '#ffffff' }}>
            Welcome back, {currentUser?.name || 'Avinash'}! 👋
          </h1>
          <p style={{ fontSize: '13.5px', color: '#cbd5e1', marginTop: '4px' }}>
            Here is your daily company workforce overview, leave requests, attendance, and team recognitions.
          </p>
        </div>

        {/* Live Work Timer Banner Card */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: '12px',
          padding: '14px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px'
        }}>
          <div>
            <div style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', fontWeight: '600', letterSpacing: '0.04em' }}>
              Today's Session
            </div>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '22px', fontWeight: '700', color: '#ffffff' }}>
              {timeString}
            </div>
          </div>
          <span style={{
            display: 'inline-block',
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            background: isRunning ? '#10b981' : '#f59e0b',
            boxShadow: isRunning ? '0 0 10px #10b981' : 'none'
          }}></span>
        </div>
      </div>

      {/* 6 Summary Cards (Exact User Requirements) */}
      <div className="kpi-grid-6">
        {/* 1. Total Employees */}
        <div
          onClick={() => setIsEmpDirectoryModalOpen(true)}
          className="kpi-card"
          style={{ cursor: 'pointer' }}
          title="Click to view full Employee Directory & Team Roster"
        >
          <div className="kpi-header">
            <span className="kpi-title">Total Employees</span>
            <div className="kpi-icon-wrap" style={{ background: '#eff6ff', color: '#2563eb' }}>
              <Users size={18} />
            </div>
          </div>
          <div className="kpi-value">{employees.length}</div>
          <div className="kpi-subtext" style={{ color: '#16a34a' }}>
            <TrendingUp size={13} />
            <span>Click to manage team roster →</span>
          </div>
        </div>

        {/* 2. Employees on Leave */}
        <div
          onClick={() => navigate('/leaves')}
          className="kpi-card"
          style={{ cursor: 'pointer' }}
        >
          <div className="kpi-header">
            <span className="kpi-title">On Leave Today</span>
            <div className="kpi-icon-wrap" style={{ background: '#e0f2fe', color: '#0284c7' }}>
              <Palmtree size={18} />
            </div>
          </div>
          <div className="kpi-value">{employeesOnLeave.length}</div>
          <div className="kpi-subtext" style={{ color: '#0284c7' }}>
            <span>{employeesOnLeave.length > 0 ? employeesOnLeave.map(e => e.employeeName).join(', ') : 'No employees on leave'}</span>
          </div>
        </div>

        {/* 3. Present Today */}
        <div
          onClick={() => navigate('/attendance')}
          className="kpi-card"
          style={{ cursor: 'pointer' }}
        >
          <div className="kpi-header">
            <span className="kpi-title">Present Today</span>
            <div className="kpi-icon-wrap" style={{ background: '#dcfce7', color: '#16a34a' }}>
              <UserCheck size={18} />
            </div>
          </div>
          <div className="kpi-value" style={{ color: '#16a34a' }}>{totalPresentToday}</div>
          <div className="kpi-subtext" style={{ color: '#16a34a' }}>
            <CheckCircle2 size={13} />
            <span>{todayAttendanceRate}% attendance rate</span>
          </div>
        </div>

        {/* 4. Absent Today */}
        <div
          onClick={() => navigate('/attendance')}
          className="kpi-card"
          style={{ cursor: 'pointer' }}
        >
          <div className="kpi-header">
            <span className="kpi-title">Absent Today</span>
            <div className="kpi-icon-wrap" style={{ background: '#fee2e2', color: '#dc2626' }}>
              <UserX size={18} />
            </div>
          </div>
          <div className="kpi-value" style={{ color: '#dc2626' }}>{absentTodayCount}</div>
          <div className="kpi-subtext" style={{ color: '#dc2626' }}>
            <XCircle size={13} />
            <span>Unplanned absence</span>
          </div>
        </div>

        {/* 5. Upcoming Holidays */}
        <div
          onClick={() => navigate('/holiday')}
          className="kpi-card"
          style={{ cursor: 'pointer' }}
        >
          <div className="kpi-header">
            <span className="kpi-title">Upcoming Holidays</span>
            <div className="kpi-icon-wrap" style={{ background: '#fef9c3', color: '#854d0e' }}>
              <CalendarCheck size={18} />
            </div>
          </div>
          <div className="kpi-value">{upcomingHolidays.length}</div>
          <div className="kpi-subtext" style={{ color: '#854d0e' }}>
            <span>Next: {nextHoliday?.name} ({nextHoliday?.date})</span>
          </div>
        </div>

        {/* 6. Total Appreciations */}
        <div
          onClick={() => navigate('/appreciation')}
          className="kpi-card"
          style={{ cursor: 'pointer' }}
        >
          <div className="kpi-header">
            <span className="kpi-title">Total Appreciations</span>
            <div className="kpi-icon-wrap" style={{ background: '#fef3c7', color: '#d97706' }}>
              <Award size={18} />
            </div>
          </div>
          <div className="kpi-value" style={{ color: '#d97706' }}>{totalAppreciationsCount}</div>
          <div className="kpi-subtext" style={{ color: '#d97706' }}>
            <Trophy size={13} />
            <span>Recognitions awarded</span>
          </div>
        </div>
      </div>

      {/* Quick HR Actions Strip */}
      <div style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        padding: '14px 20px',
        marginBottom: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles size={16} color="#2563eb" />
          <span style={{ fontSize: '13.5px', fontWeight: '700', color: '#0f172a' }}>Quick HR Actions:</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setIsAddEmpModalOpen(true)}
            className="btn btn-primary"
            style={{ fontSize: '12.5px', height: '34px', padding: '0 12px' }}
          >
            <UserPlus size={14} />
            <span>Add Employee</span>
          </button>
          <button
            onClick={() => setIsEmpDirectoryModalOpen(true)}
            className="btn btn-outline"
            style={{ fontSize: '12.5px', height: '34px', padding: '0 12px' }}
          >
            <Users size={14} />
            <span>Team Roster</span>
          </button>
          <button
            onClick={() => setIsLeaveModalOpen(true)}
            className="btn btn-outline"
            style={{ fontSize: '12.5px', height: '34px', padding: '0 12px' }}
          >
            <Plus size={14} />
            <span>Apply Leave</span>
          </button>
          <button
            onClick={() => setIsAttendanceModalOpen(true)}
            className="btn btn-outline"
            style={{ fontSize: '12.5px', height: '34px', padding: '0 12px' }}
          >
            <UserCheck size={14} />
            <span>Mark Attendance</span>
          </button>
          <button
            onClick={() => setIsHolidayModalOpen(true)}
            className="btn btn-outline"
            style={{ fontSize: '12.5px', height: '34px', padding: '0 12px' }}
          >
            <Calendar size={14} />
            <span>Add Holiday</span>
          </button>
          <button
            onClick={() => setIsAppreciationModalOpen(true)}
            className="btn btn-outline"
            style={{ fontSize: '12.5px', height: '34px', padding: '0 12px' }}
          >
            <Award size={14} />
            <span>Give Award</span>
          </button>
        </div>
      </div>

      {/* Grid: Pending Approvals & Today's Attendance Breakdown */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px', marginBottom: '24px' }}>
        
        {/* Pending Leave Requests */}
        <div className="table-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#0f172a' }}>
                Pending Leave Requests
              </h3>
              <span style={{ fontSize: '12px', color: '#64748b' }}>Requires HR review & decision</span>
            </div>
            <span className="badge badge-pending">{pendingLeaves.length} Pending</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {pendingLeaves.length > 0 ? (
              pendingLeaves.map(leave => (
                <div
                  key={leave._id}
                  style={{
                    padding: '14px',
                    borderRadius: '10px',
                    border: '1px solid #e2e8f0',
                    background: '#f8fafc',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div className="employee-cell">
                      <div className="employee-avatar">
                        {leave.employeeAvatar ? <img src={leave.employeeAvatar} alt={leave.employeeName} /> : leave.employeeName.charAt(0)}
                      </div>
                      <div className="employee-name-group">
                        <span className="employee-name">{leave.employeeName}</span>
                        <span className="employee-role">{leave.employeeRole}</span>
                      </div>
                    </div>
                    <span className="badge badge-pending">{leave.leaveType}</span>
                  </div>

                  <div style={{ fontSize: '12.5px', color: '#475569' }}>
                    <strong>Duration:</strong> {leave.startDate} to {leave.endDate} ({leave.durationText})
                  </div>

                  <p style={{ fontSize: '12px', color: '#64748b', fontStyle: 'italic', background: '#ffffff', padding: '6px 10px', borderRadius: '6px', border: '1px solid #f1f5f9' }}>
                    "{leave.reason}"
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                    <button
                      onClick={() => updateLeaveStatus(leave._id, 'rejected')}
                      className="btn btn-outline"
                      style={{ height: '30px', padding: '0 10px', fontSize: '12px', color: '#ef4444', borderColor: '#fecaca' }}
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => updateLeaveStatus(leave._id, 'approved')}
                      className="btn btn-primary"
                      style={{ height: '30px', padding: '0 12px', fontSize: '12px', background: '#16a34a', borderColor: '#16a34a' }}
                    >
                      Approve Leave
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ textAlign: 'center', padding: '30px 10px', color: '#94a3b8' }}>
                <CheckCircle2 size={32} color="#16a34a" style={{ margin: '0 auto 8px' }} />
                <div style={{ fontWeight: '600', color: '#1e293b' }}>All Clear!</div>
                <div style={{ fontSize: '12px' }}>No pending leave requests at this moment.</div>
              </div>
            )}
          </div>
        </div>

        {/* Upcoming Holidays & Quick Calendar Snapshot */}
        <div className="table-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#0f172a' }}>Upcoming Holidays</h3>
              <span style={{ fontSize: '12px', color: '#64748b' }}>Company holiday calendar</span>
            </div>
            <button
              onClick={() => navigate('/holiday')}
              style={{ background: 'transparent', border: 'none', color: '#2563eb', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}
            >
              View Full Calendar →
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {upcomingHolidays.slice(0, 4).map(hol => (
              <div
                key={hol._id}
                style={{
                  padding: '12px 14px',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  background: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '8px',
                    background: '#fef3c7',
                    color: '#d97706',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '10px',
                    fontWeight: '700'
                  }}>
                    <span>{hol.date.split('-')[2]}</span>
                    <span style={{ textTransform: 'uppercase', fontSize: '8px' }}>
                      {new Date(hol.date).toLocaleString('en-US', { month: 'short' })}
                    </span>
                  </div>
                  <div>
                    <div style={{ fontWeight: '700', fontSize: '13px', color: '#0f172a' }}>{hol.name}</div>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>{hol.dayOfWeek} • {hol.type}</div>
                  </div>
                </div>
                <span className="badge badge-holiday" style={{ fontSize: '10.5px' }}>Upcoming</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Grid: 4 Core Modules Navigation & Team Appreciations */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px' }}>
        {/* 4 Core HR Modules */}
        <div className="table-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#0f172a' }}>HRMS Core Modules</h3>
              <span style={{ fontSize: '12px', color: '#64748b' }}>Complete workforce management suite</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div
              onClick={() => navigate('/leaves')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 14px',
                borderRadius: '8px',
                background: '#f8fafc',
                cursor: 'pointer',
                border: '1px solid #e2e8f0',
                transition: 'all 0.15s'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#e0f2fe', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Palmtree size={18} />
                </div>
                <div>
                  <div style={{ fontWeight: '700', fontSize: '13.5px', color: '#0f172a' }}>1. Leave Management</div>
                  <div style={{ fontSize: '11.5px', color: '#64748b' }}>Leave balances, history table, approval workflow & active leave status</div>
                </div>
              </div>
              <ArrowRight size={16} color="#94a3b8" />
            </div>

            <div
              onClick={() => navigate('/attendance')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 14px',
                borderRadius: '8px',
                background: '#f8fafc',
                cursor: 'pointer',
                border: '1px solid #e2e8f0',
                transition: 'all 0.15s'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <UserCheck size={18} />
                </div>
                <div>
                  <div style={{ fontWeight: '700', fontSize: '13.5px', color: '#0f172a' }}>2. Attendance Matrix</div>
                  <div style={{ fontSize: '11.5px', color: '#64748b' }}>8 Daily status indicators (Present, Late, Half-day, Absent, On Leave, Holiday, Day Off, Not Marked)</div>
                </div>
              </div>
              <ArrowRight size={16} color="#94a3b8" />
            </div>

            <div
              onClick={() => navigate('/holiday')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 14px',
                borderRadius: '8px',
                background: '#f8fafc',
                cursor: 'pointer',
                border: '1px solid #e2e8f0',
                transition: 'all 0.15s'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#fef9c3', color: '#854d0e', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <CalendarCheck size={18} />
                </div>
                <div>
                  <div style={{ fontWeight: '700', fontSize: '13.5px', color: '#0f172a' }}>3. Company Holidays</div>
                  <div style={{ fontSize: '11.5px', color: '#64748b' }}>Total, upcoming & completed holidays with interactive calendar grid</div>
                </div>
              </div>
              <ArrowRight size={16} color="#94a3b8" />
            </div>

            <div
              onClick={() => navigate('/appreciation')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 14px',
                borderRadius: '8px',
                background: '#f8fafc',
                cursor: 'pointer',
                border: '1px solid #e2e8f0',
                transition: 'all 0.15s'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Award size={18} />
                </div>
                <div>
                  <div style={{ fontWeight: '700', fontSize: '13.5px', color: '#0f172a' }}>4. Employee Appreciation</div>
                  <div style={{ fontSize: '11.5px', color: '#64748b' }}>Peer recognitions, citations, awards & reward incentives</div>
                </div>
              </div>
              <ArrowRight size={16} color="#94a3b8" />
            </div>
          </div>
        </div>

        {/* Latest Team Appreciations Showcase */}
        <div className="table-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#0f172a' }}>Appreciation Hall of Fame</h3>
              <span style={{ fontSize: '12px', color: '#64748b' }}>Recent employee achievements</span>
            </div>
            <button
              onClick={() => navigate('/appreciation')}
              style={{ background: 'transparent', border: 'none', color: '#2563eb', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}
            >
              View all ({appreciations.length}) →
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {appreciations.slice(0, 3).map(app => (
              <div
                key={app._id}
                style={{
                  padding: '14px',
                  borderRadius: '10px',
                  border: '1px solid #e2e8f0',
                  background: '#ffffff',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px'
                }}
              >
                <div className="employee-avatar" style={{ width: '40px', height: '40px' }}>
                  {app.givenToAvatar ? <img src={app.givenToAvatar} alt={app.givenToName} /> : app.givenToName.charAt(0)}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: '700', fontSize: '13px', color: '#0f172a' }}>{app.givenToName}</span>
                    <span style={{ fontSize: '11px', color: '#94a3b8' }}>{app.givenOn}</span>
                  </div>
                  <div style={{ fontSize: '12.5px', fontWeight: '700', color: '#d97706', margin: '2px 0' }}>
                    🏆 {app.awardName}
                  </div>
                  <p style={{ fontSize: '12px', color: '#64748b', lineHeight: '1.4' }}>
                    "{app.appreciationNote}"
                  </p>
                  <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '6px' }}>
                    Awarded by: <strong>{app.givenByName}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modals for Quick Actions */}
      <NewLeaveModal
        isOpen={isLeaveModalOpen}
        onClose={() => setIsLeaveModalOpen(false)}
      />
      <MarkAttendanceModal
        isOpen={isAttendanceModalOpen}
        onClose={() => setIsAttendanceModalOpen(false)}
      />
      <AddHolidayModal
        isOpen={isHolidayModalOpen}
        onClose={() => setIsHolidayModalOpen(false)}
      />
      <AddAppreciationModal
        isOpen={isAppreciationModalOpen}
        onClose={() => setIsAppreciationModalOpen(false)}
      />
      <AddEmployeeModal
        isOpen={isAddEmpModalOpen}
        onClose={() => setIsAddEmpModalOpen(false)}
      />
      <EmployeeDirectoryModal
        isOpen={isEmpDirectoryModalOpen}
        onClose={() => setIsEmpDirectoryModalOpen(false)}
      />
    </div>
  );
};
