import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users2,
  Briefcase,
  Layers,
  DollarSign,
  Ticket,
  Calendar,
  MessageSquare,
  BellRing,
  Settings,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Zap,
  Award,
  CalendarCheck,
  Palmtree,
  UserCheck,
  Users
} from 'lucide-react';
import { useHR } from '../../../modules/hr/context/HRContext';
import { EmployeeDirectoryModal } from '../../../modules/hr/components/employees/EmployeeDirectoryModal';

export const Sidebar = () => {
  const location = useLocation();
  const { currentUser } = useHR();
  const [collapsed, setCollapsed] = useState(false);
  const [hrExpanded, setHrExpanded] = useState(true);
  const [isDirectoryOpen, setIsDirectoryOpen] = useState(false);

  const isHrActive = ['/leaves', '/attendance', '/holiday', '/appreciation'].some(path =>
    location.pathname.startsWith(path)
  );

  return (
    <aside style={{
      width: collapsed ? '72px' : '250px',
      backgroundColor: '#101b33',
      color: '#94a3b8',
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      flexShrink: 0,
      transition: 'width 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
      borderRight: '1px solid #1e293b',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      overflow: 'hidden'
    }}>
      {/* Brand & User Top Header */}
      <div style={{
        padding: collapsed ? '16px 8px' : '18px 20px',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: '70px'
      }}>
        {!collapsed ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', overflow: 'hidden' }}>
            <div style={{
              width: '34px',
              height: '34px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #2563eb, #3b82f6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              boxShadow: '0 4px 10px rgba(37,99,235,0.4)',
              flexShrink: 0
            }}>
              <Zap size={20} fill="#ffffff" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ fontSize: '16px', fontWeight: '800', color: '#ffffff', letterSpacing: '-0.01em' }}>
                  EMS
                </span>
                <span style={{ fontSize: '11.5px', color: '#60a5fa', fontWeight: '600' }}>Enterprise</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  background: '#10b981',
                  boxShadow: '0 0 6px #10b981'
                }}></span>
                <span style={{ fontSize: '12px', color: '#94a3b8' }}>{currentUser?.name || 'Avinash'}</span>
              </div>
            </div>
          </div>
        ) : (
          <div style={{
            width: '36px',
            height: '36px',
            margin: '0 auto',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, #2563eb, #3b82f6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff'
          }}>
            <Zap size={20} fill="#ffffff" />
          </div>
        )}
      </div>

      {/* Navigation Links */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: collapsed ? '12px 6px' : '16px 12px',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px'
      }}>
        {/* Dashboard */}
        <NavLink
          to="/dashboard"
          style={({ isActive }) => ({
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '10px 12px',
            borderRadius: '8px',
            color: isActive ? '#ffffff' : '#94a3b8',
            backgroundColor: isActive ? 'rgba(37, 99, 235, 0.18)' : 'transparent',
            textDecoration: 'none',
            fontSize: '13.5px',
            fontWeight: isActive ? '600' : '500',
            transition: 'all 0.15s ease'
          })}
        >
          <LayoutDashboard size={18} color={location.pathname === '/dashboard' ? '#60a5fa' : '#94a3b8'} />
          {!collapsed && <span>Dashboard</span>}
        </NavLink>

        {/* Leads */}
        <div
          onClick={() => {}}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 12px',
            borderRadius: '8px',
            color: '#94a3b8',
            fontSize: '13.5px',
            fontWeight: '500',
            cursor: 'pointer'
          }}
          title="Leads Module (CRM Roadmap)"
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Users2 size={18} />
            {!collapsed && <span>Leads</span>}
          </div>
          {!collapsed && <ChevronRight size={14} color="#64748b" />}
        </div>

        {/* HR - Core Module (Collapsible Accordion) */}
        <div>
          <div
            onClick={() => setHrExpanded(!hrExpanded)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 12px',
              borderRadius: '8px',
              color: isHrActive ? '#ffffff' : '#94a3b8',
              backgroundColor: isHrActive ? 'rgba(37, 99, 235, 0.12)' : 'transparent',
              fontSize: '13.5px',
              fontWeight: isHrActive ? '600' : '500',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Briefcase size={18} color={isHrActive ? '#3b82f6' : '#94a3b8'} />
              {!collapsed && <span>HR</span>}
            </div>
            {!collapsed && (
              hrExpanded ? <ChevronDown size={14} color="#94a3b8" /> : <ChevronRight size={14} color="#64748b" />
            )}
          </div>

          {/* Submenu for HR */}
          {hrExpanded && (
            <div style={{
              marginTop: '4px',
              marginLeft: collapsed ? '0' : '16px',
              paddingLeft: collapsed ? '0' : '12px',
              borderLeft: collapsed ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
              display: 'flex',
              flexDirection: 'column',
              gap: '2px'
            }}>
              <div
                onClick={() => setIsDirectoryOpen(true)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '8px 10px',
                  borderRadius: '6px',
                  color: '#94a3b8',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: '400',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#ffffff'}
                onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}
              >
                <Users size={15} />
                {!collapsed && <span>Employees</span>}
              </div>

              <NavLink
                to="/leaves"
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '8px 10px',
                  borderRadius: '6px',
                  color: isActive ? '#ffffff' : '#94a3b8',
                  backgroundColor: isActive ? '#1d4ed8' : 'transparent',
                  textDecoration: 'none',
                  fontSize: '13px',
                  fontWeight: isActive ? '600' : '400',
                  transition: 'all 0.15s ease'
                })}
              >
                <Palmtree size={15} />
                {!collapsed && <span>Leaves</span>}
              </NavLink>

              <NavLink
                to="/attendance"
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '8px 10px',
                  borderRadius: '6px',
                  color: isActive ? '#ffffff' : '#94a3b8',
                  backgroundColor: isActive ? '#1d4ed8' : 'transparent',
                  textDecoration: 'none',
                  fontSize: '13px',
                  fontWeight: isActive ? '600' : '400',
                  transition: 'all 0.15s ease'
                })}
              >
                <UserCheck size={15} />
                {!collapsed && <span>Attendance</span>}
              </NavLink>

              <NavLink
                to="/holiday"
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '8px 10px',
                  borderRadius: '6px',
                  color: isActive ? '#ffffff' : '#94a3b8',
                  backgroundColor: isActive ? '#1d4ed8' : 'transparent',
                  textDecoration: 'none',
                  fontSize: '13px',
                  fontWeight: isActive ? '600' : '400',
                  transition: 'all 0.15s ease'
                })}
              >
                <CalendarCheck size={15} />
                {!collapsed && <span>Holiday</span>}
              </NavLink>

              <NavLink
                to="/appreciation"
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '8px 10px',
                  borderRadius: '6px',
                  color: isActive ? '#ffffff' : '#94a3b8',
                  backgroundColor: isActive ? '#1d4ed8' : 'transparent',
                  textDecoration: 'none',
                  fontSize: '13px',
                  fontWeight: isActive ? '600' : '400',
                  transition: 'all 0.15s ease'
                })}
              >
                <Award size={15} />
                {!collapsed && <span>Appreciation</span>}
              </NavLink>
            </div>
          )}
        </div>

        {/* Future Modules as per Screenshot */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 12px',
          borderRadius: '8px',
          color: '#94a3b8',
          fontSize: '13.5px',
          fontWeight: '500',
          cursor: 'pointer'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Layers size={18} />
            {!collapsed && <span>Work</span>}
          </div>
          {!collapsed && <ChevronRight size={14} color="#64748b" />}
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 12px',
          borderRadius: '8px',
          color: '#94a3b8',
          fontSize: '13.5px',
          fontWeight: '500',
          cursor: 'pointer'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <DollarSign size={18} />
            {!collapsed && <span>Finance</span>}
          </div>
          {!collapsed && <ChevronRight size={14} color="#64748b" />}
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '10px 12px',
          borderRadius: '8px',
          color: '#94a3b8',
          fontSize: '13.5px',
          fontWeight: '500',
          cursor: 'pointer'
        }}>
          <Ticket size={18} />
          {!collapsed && <span>Tickets</span>}
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '10px 12px',
          borderRadius: '8px',
          color: '#94a3b8',
          fontSize: '13.5px',
          fontWeight: '500',
          cursor: 'pointer'
        }}>
          <Calendar size={18} />
          {!collapsed && <span>Events</span>}
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '10px 12px',
          borderRadius: '8px',
          color: '#94a3b8',
          fontSize: '13.5px',
          fontWeight: '500',
          cursor: 'pointer'
        }}>
          <MessageSquare size={18} />
          {!collapsed && <span>Messages</span>}
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '10px 12px',
          borderRadius: '8px',
          color: '#94a3b8',
          fontSize: '13.5px',
          fontWeight: '500',
          cursor: 'pointer'
        }}>
          <BellRing size={18} />
          {!collapsed && <span>Notice Board</span>}
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '10px 12px',
          borderRadius: '8px',
          color: '#94a3b8',
          fontSize: '13.5px',
          fontWeight: '500',
          cursor: 'pointer'
        }}>
          <Settings size={18} />
          {!collapsed && <span>Settings</span>}
        </div>
      </div>

      {/* Sidebar Footer & Collapse Toggle */}
      <div style={{
        padding: collapsed ? '12px 8px' : '14px 18px',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '12px',
        color: '#64748b'
      }}>
        {!collapsed && <span>v5.4.0</span>}
        <button
          onClick={() => setCollapsed(!collapsed)}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#94a3b8',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '4px',
            borderRadius: '4px',
            margin: collapsed ? '0 auto' : '0'
          }}
          title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <EmployeeDirectoryModal
        isOpen={isDirectoryOpen}
        onClose={() => setIsDirectoryOpen(false)}
      />
    </aside>
  );
};
