import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  Bell,
  Plus,
  Power,
  Maximize2,
  Minimize2,
  ChevronDown,
  Play,
  Pause,
  Square,
  Sparkles,
  CheckCircle2,
  Settings,
  LayoutGrid,
  Video,
  X,
  LogOut,
  User,
  HelpCircle,
  Keyboard,
  Clock
} from 'lucide-react';
import { useTimer } from '../../context/TimerContext';
import { useHR } from '../../../modules/hr/context/HRContext';
import { UserPlus, Users } from 'lucide-react';
import { AddEmployeeModal } from '../../../modules/hr/components/employees/AddEmployeeModal';
import { EmployeeDirectoryModal } from '../../../modules/hr/components/employees/EmployeeDirectoryModal';

export const TopNavbar = () => {
  const { timeString, isRunning, isClockedIn, togglePauseResume, handleClockOut } = useTimer();
  const { currentUser, leaves, employees } = useHR();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [isAddEmpOpen, setIsAddEmpOpen] = useState(false);
  const [isEmpDirectoryOpen, setIsEmpDirectoryOpen] = useState(false);

  const notifRef = useRef(null);
  const profileRef = useRef(null);

  const pendingLeavesCount = leaves.filter(l => l.status === 'pending').length;
  const totalNotifications = pendingLeavesCount + 1; // +1 for attendance notification

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Listen for fullscreen changes
  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handler);
    return () => document.removeEventListener('fullscreenchange', handler);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  return (
    <header style={{
      height: '64px',
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #e2e8f0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      position: 'sticky',
      top: 0,
      zIndex: 90,
      boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
      gap: '16px'
    }}>

      {/* ───────── LEFT: Search Bar ───────── */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        background: searchFocused ? '#ffffff' : '#f1f5f9',
        borderRadius: '10px',
        padding: '0 14px',
        width: '300px',
        height: '38px',
        border: searchFocused ? '1.5px solid #2563eb' : '1.5px solid transparent',
        boxShadow: searchFocused ? '0 0 0 3px rgba(37,99,235,0.1)' : 'none',
        transition: 'all 0.2s ease',
        flexShrink: 0
      }}>
        <Search size={15} color={searchFocused ? '#2563eb' : '#94a3b8'} />
        <input
          type="text"
          placeholder="Search anything..."
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
          style={{
            border: 'none',
            background: 'transparent',
            outline: 'none',
            fontSize: '13px',
            color: '#1e293b',
            width: '100%',
            fontFamily: 'inherit'
          }}
        />
        <kbd style={{
          display: searchFocused ? 'none' : 'flex',
          alignItems: 'center',
          gap: '2px',
          fontSize: '10px',
          color: '#94a3b8',
          background: '#e2e8f0',
          borderRadius: '4px',
          padding: '2px 5px',
          fontFamily: 'JetBrains Mono, monospace',
          whiteSpace: 'nowrap'
        }}>
          Ctrl K
        </kbd>
      </div>

      {/* ───────── RIGHT: All Controls ───────── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>

        {/* ── Work Timer Pill ── */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          background: isClockedIn ? '#f0fdf4' : '#fef2f2',
          border: isClockedIn ? '1px solid #bbf7d0' : '1px solid #fecaca',
          borderRadius: '10px',
          padding: '6px 14px 6px 12px',
          marginRight: '4px'
        }}>
          {/* Status Dot */}
          <span style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: isClockedIn && isRunning ? '#10b981' : (isClockedIn ? '#f59e0b' : '#ef4444'),
            boxShadow: isClockedIn && isRunning ? '0 0 6px #10b981' : 'none',
            flexShrink: 0
          }} />

          {/* Timer Display */}
          <span style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '14px',
            fontWeight: '700',
            color: isClockedIn ? '#15803d' : '#94a3b8',
            letterSpacing: '0.04em',
            minWidth: '60px'
          }}>
            {timeString}
          </span>

          {/* Timer Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            {/* Play / Pause */}
            <button
              onClick={togglePauseResume}
              title={isRunning ? 'Pause (Break)' : 'Resume Work'}
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '6px',
                border: 'none',
                background: isRunning ? '#2563eb' : '#64748b',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                flexShrink: 0
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              {isRunning
                ? <Pause size={13} fill="#fff" />
                : <Play size={13} fill="#fff" />
              }
            </button>

            {/* Clock Out / Clock In */}
            <button
              onClick={handleClockOut}
              title={isClockedIn ? 'Clock Out for Today' : 'Clock In'}
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '6px',
                border: 'none',
                background: isClockedIn ? '#ef4444' : '#10b981',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                flexShrink: 0
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              {isClockedIn ? <Square size={11} fill="#fff" /> : <Play size={13} fill="#fff" />}
            </button>
          </div>
        </div>

        {/* ── Add Employee Quick Action ── */}
        <button
          onClick={() => setIsAddEmpOpen(true)}
          className="btn btn-primary"
          style={{ height: '34px', fontSize: '12.5px', padding: '0 12px', gap: '6px' }}
        >
          <UserPlus size={14} />
          <span>Add Employee</span>
        </button>

        {/* ── Employee Directory Quick View ── */}
        <button
          onClick={() => setIsEmpDirectoryOpen(true)}
          className="navbar-icon-btn"
          title="Team Roster & Employee Directory"
          style={navBtnStyle}
        >
          <Users size={17} color="#64748b" />
        </button>

        {/* ── Separator ── */}
        <div style={{ width: '1px', height: '28px', background: '#e2e8f0', margin: '0 4px' }} />

        {/* ── Grid / Dashboard Quick View ── */}
        <button
          className="navbar-icon-btn"
          title="Dashboard Overview"
          style={navBtnStyle}
        >
          <LayoutGrid size={18} color="#64748b" />
        </button>

        {/* ── Screen Recording Toggle ── */}
        <button
          className="navbar-icon-btn"
          title={isRecording ? 'Stop Recording' : 'Start Screen Recording'}
          onClick={() => setIsRecording(!isRecording)}
          style={{
            ...navBtnStyle,
            background: isRecording ? '#fef2f2' : 'transparent',
            border: isRecording ? '1px solid #fecaca' : '1px solid transparent'
          }}
        >
          <div style={{ position: 'relative' }}>
            <Video size={18} color={isRecording ? '#ef4444' : '#64748b'} />
            {isRecording && (
              <span style={{
                position: 'absolute',
                top: '-3px',
                right: '-3px',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#ef4444',
                border: '1.5px solid #ffffff',
                animation: 'pulseGlow 1.2s infinite'
              }} />
            )}
          </div>
        </button>

        {/* ── Fullscreen Toggle ── */}
        <button
          className="navbar-icon-btn"
          title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
          onClick={toggleFullscreen}
          style={navBtnStyle}
        >
          {isFullscreen
            ? <Minimize2 size={18} color="#64748b" />
            : <Maximize2 size={18} color="#64748b" />
          }
        </button>

        {/* ── Notifications Bell ── */}
        <div style={{ position: 'relative' }} ref={notifRef}>
          <button
            title="Notifications"
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
            style={{
              ...navBtnStyle,
              background: showNotifications ? '#eff6ff' : 'transparent',
              border: showNotifications ? '1px solid #bfdbfe' : '1px solid transparent',
              position: 'relative'
            }}
          >
            <Bell size={18} color={showNotifications ? '#2563eb' : '#64748b'} />
            {totalNotifications > 0 && (
              <span style={{
                position: 'absolute',
                top: '4px',
                right: '4px',
                width: '16px',
                height: '16px',
                background: '#2563eb',
                color: '#ffffff',
                fontSize: '9px',
                fontWeight: '800',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid #ffffff',
                lineHeight: 1
              }}>
                {totalNotifications > 9 ? '9+' : totalNotifications}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div style={{
              position: 'absolute',
              top: '50px',
              right: '0',
              width: '340px',
              background: '#ffffff',
              borderRadius: '14px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.05)',
              border: '1px solid #e2e8f0',
              overflow: 'hidden',
              zIndex: 200,
              animation: 'fadeIn 0.18s ease'
            }}>
              {/* Header */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '14px 16px',
                borderBottom: '1px solid #f1f5f9',
                background: '#f8fafc'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Bell size={15} color="#0f172a" />
                  <span style={{ fontWeight: '700', fontSize: '13.5px', color: '#0f172a' }}>
                    Notifications
                  </span>
                  <span style={{
                    background: '#2563eb',
                    color: '#ffffff',
                    fontSize: '10px',
                    fontWeight: '800',
                    padding: '1px 6px',
                    borderRadius: '10px'
                  }}>
                    {totalNotifications}
                  </span>
                </div>
                <button
                  onClick={() => setShowNotifications(false)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#94a3b8',
                    display: 'flex',
                    padding: '2px'
                  }}
                >
                  <X size={15} />
                </button>
              </div>

              {/* Notification Items */}
              <div style={{ maxHeight: '320px', overflowY: 'auto' }}>
                {pendingLeavesCount > 0 && (
                  <div style={{
                    padding: '12px 16px',
                    display: 'flex',
                    gap: '12px',
                    alignItems: 'flex-start',
                    borderBottom: '1px solid #f8fafc',
                    cursor: 'pointer',
                    transition: 'background 0.15s'
                  }}
                    onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <div style={{
                      width: '34px',
                      height: '34px',
                      borderRadius: '8px',
                      background: '#fef3c7',
                      color: '#d97706',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <Sparkles size={16} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: '600', fontSize: '12.5px', color: '#1e293b' }}>
                        {pendingLeavesCount} Leave Request{pendingLeavesCount > 1 ? 's' : ''} Awaiting
                      </div>
                      <div style={{ color: '#64748b', fontSize: '11.5px', marginTop: '2px', lineHeight: '1.4' }}>
                        Rahul Verma requested 4-day Earned Leave — needs approval.
                      </div>
                      <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px' }}>
                        2 hours ago
                      </div>
                    </div>
                  </div>
                )}

                <div style={{
                  padding: '12px 16px',
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'flex-start',
                  cursor: 'pointer',
                  transition: 'background 0.15s'
                }}
                  onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <div style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '8px',
                    background: '#dcfce7',
                    color: '#16a34a',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <CheckCircle2 size={16} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '600', fontSize: '12.5px', color: '#1e293b' }}>
                      Attendance Clocked In
                    </div>
                    <div style={{ color: '#64748b', fontSize: '11.5px', marginTop: '2px', lineHeight: '1.4' }}>
                      You arrived on time today at 09:12 AM. Great start!
                    </div>
                    <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px' }}>
                      Today, 09:12 AM
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div style={{
                padding: '10px 16px',
                borderTop: '1px solid #f1f5f9',
                textAlign: 'center'
              }}>
                <button style={{
                  background: 'transparent',
                  border: 'none',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#2563eb',
                  cursor: 'pointer'
                }}>
                  View all notifications →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ── Settings Gear ── */}
        <button
          className="navbar-icon-btn"
          title="System Settings"
          style={navBtnStyle}
        >
          <Settings size={18} color="#64748b" />
        </button>

        {/* ── Separator ── */}
        <div style={{ width: '1px', height: '28px', background: '#e2e8f0', margin: '0 4px' }} />

        {/* ── User Profile Pill ── */}
        <div style={{ position: 'relative' }} ref={profileRef}>
          <div
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '5px 12px 5px 6px',
              background: showProfileMenu ? '#eff6ff' : '#f8fafc',
              border: showProfileMenu ? '1.5px solid #bfdbfe' : '1.5px solid #e2e8f0',
              borderRadius: '10px',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              userSelect: 'none'
            }}
            onMouseEnter={e => {
              if (!showProfileMenu) {
                e.currentTarget.style.background = '#f1f5f9';
                e.currentTarget.style.borderColor = '#cbd5e1';
              }
            }}
            onMouseLeave={e => {
              if (!showProfileMenu) {
                e.currentTarget.style.background = '#f8fafc';
                e.currentTarget.style.borderColor = '#e2e8f0';
              }
            }}
          >
            {/* Avatar */}
            <div style={{
              width: '30px',
              height: '30px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #d97706, #f59e0b)',
              color: '#ffffff',
              fontSize: '13px',
              fontWeight: '800',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              boxShadow: '0 2px 6px rgba(217, 119, 6, 0.3)'
            }}>
              {currentUser?.name?.charAt(0) || 'A'}
            </div>

            {/* Label */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', lineHeight: 1 }}>
              <span style={{ fontSize: '12.5px', fontWeight: '700', color: '#0f172a' }}>
                {currentUser?.name || 'Avinash'}
              </span>
              <span style={{ fontSize: '10.5px', color: '#64748b' }}>
                Work
              </span>
            </div>

            <ChevronDown
              size={14}
              color="#64748b"
              style={{
                transform: showProfileMenu ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s ease'
              }}
            />
          </div>

          {/* Profile Dropdown */}
          {showProfileMenu && (
            <div style={{
              position: 'absolute',
              top: '50px',
              right: '0',
              width: '240px',
              background: '#ffffff',
              borderRadius: '14px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.05)',
              border: '1px solid #e2e8f0',
              overflow: 'hidden',
              zIndex: 200,
              animation: 'fadeIn 0.18s ease'
            }}>
              {/* Profile Header */}
              <div style={{
                padding: '16px',
                background: 'linear-gradient(135deg, #101b33, #1e293b)',
                borderBottom: '1px solid rgba(255,255,255,0.08)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    background: 'linear-gradient(135deg, #d97706, #f59e0b)',
                    color: '#ffffff',
                    fontSize: '16px',
                    fontWeight: '800',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 8px rgba(217, 119, 6, 0.4)'
                  }}>
                    {currentUser?.name?.charAt(0) || 'A'}
                  </div>
                  <div>
                    <div style={{ fontWeight: '700', fontSize: '14px', color: '#ffffff' }}>
                      {currentUser?.name || 'Avinash'}
                    </div>
                    <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>
                      {currentUser?.role || 'Digital Marketing Strategist'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div style={{ padding: '6px' }}>
                <ProfileMenuItem icon={<User size={14} />} label="My Profile" />
                <ProfileMenuItem icon={<Clock size={14} />} label="Work Logs & Sessions" />
                <ProfileMenuItem icon={<HelpCircle size={14} />} label="Help & Support" />
                <ProfileMenuItem icon={<Keyboard size={14} />} label="Keyboard Shortcuts" />

                <div style={{ height: '1px', background: '#f1f5f9', margin: '6px 0' }} />

                <div
                  onClick={() => setShowProfileMenu(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '8px 10px',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: '600',
                    color: '#ef4444',
                    cursor: 'pointer',
                    transition: 'background 0.15s'
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = '#fef2f2'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <LogOut size={14} />
                  <span>Sign Out</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Employee Management Modals */}
      <AddEmployeeModal
        isOpen={isAddEmpOpen}
        onClose={() => setIsAddEmpOpen(false)}
      />

      <EmployeeDirectoryModal
        isOpen={isEmpDirectoryOpen}
        onClose={() => setIsEmpDirectoryOpen(false)}
      />
    </header>
  );
};

// Reusable profile menu item
const ProfileMenuItem = ({ icon, label }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      padding: '8px 10px',
      borderRadius: '8px',
      fontSize: '13px',
      fontWeight: '500',
      color: '#374151',
      cursor: 'pointer',
      transition: 'background 0.15s'
    }}
    onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
  >
    <span style={{ color: '#64748b' }}>{icon}</span>
    <span>{label}</span>
  </div>
);

// Shared nav icon button style
const navBtnStyle = {
  width: '36px',
  height: '36px',
  borderRadius: '8px',
  border: '1px solid transparent',
  background: 'transparent',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  transition: 'all 0.15s ease',
  position: 'relative',
  flexShrink: 0,
  onMouseEnter: undefined // handled inline
};
