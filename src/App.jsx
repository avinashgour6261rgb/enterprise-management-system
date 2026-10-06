import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Shared Providers & Layout
import { ToastProvider } from './shared/context/ToastContext';
import { TimerProvider } from './shared/context/TimerContext';
import { Layout } from './shared/components/layout/Layout';

// HR Module Provider
import { HRProvider } from './modules/hr/context/HRContext';

// HR Module Pages
import { LeavesPage } from './modules/hr/pages/LeavesPage';
import { AttendancePage } from './modules/hr/pages/AttendancePage';
import { HolidayPage } from './modules/hr/pages/HolidayPage';
import { AppreciationPage } from './modules/hr/pages/AppreciationPage';
import { DashboardPage } from './modules/hr/pages/DashboardPage';

/**
 * ModulePlaceholder — Shown for CRM modules not yet built.
 * When a new module (Leads, Finance, etc.) is ready, replace this
 * with the actual <ModulePage /> from `src/modules/<module>/pages/`.
 */
const ModulePlaceholder = ({ title }) => (
  <div style={{
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '16px',
    padding: '48px 24px',
    textAlign: 'center',
    maxWidth: '600px',
    margin: '40px auto'
  }}>
    <div style={{ fontSize: '32px', marginBottom: '12px' }}>🚀</div>
    <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#0f172a', marginBottom: '8px' }}>
      {title} Module
    </h2>
    <p style={{ fontSize: '13.5px', color: '#64748b', lineHeight: '1.6' }}>
      This module is part of the complete CRM roadmap. The HR module (Leaves, Attendance, Holiday, and Appreciation) is fully operational.
    </p>
  </div>
);

export function App() {
  return (
    <ToastProvider>
      <TimerProvider>
        <HRProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Navigate to="/leaves" replace />} />

                {/* ── HR Module Routes ────────────────────────────────── */}
                <Route path="dashboard"   element={<DashboardPage />} />
                <Route path="leaves"      element={<LeavesPage />} />
                <Route path="attendance"  element={<AttendancePage />} />
                <Route path="holiday"     element={<HolidayPage />} />
                <Route path="appreciation" element={<AppreciationPage />} />

                {/* ── Future CRM Module Routes (add pages here as built) ─ */}
                <Route path="leads"        element={<ModulePlaceholder title="Leads & Pipeline" />} />
                <Route path="work"         element={<ModulePlaceholder title="Work & Project Management" />} />
                <Route path="finance"      element={<ModulePlaceholder title="Finance & Invoicing" />} />
                <Route path="tickets"      element={<ModulePlaceholder title="Helpdesk Tickets" />} />
                <Route path="events"       element={<ModulePlaceholder title="Company Events" />} />
                <Route path="messages"     element={<ModulePlaceholder title="Team Chat & Messages" />} />
                <Route path="notice-board" element={<ModulePlaceholder title="Notice Board" />} />
                <Route path="settings"     element={<ModulePlaceholder title="System Settings" />} />

                <Route path="*" element={<Navigate to="/leaves" replace />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </HRProvider>
      </TimerProvider>
    </ToastProvider>
  );
}

export default App;
