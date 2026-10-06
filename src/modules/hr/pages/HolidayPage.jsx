import React, { useState } from 'react';
import {
  ChevronRight,
  Search,
  Plus,
  Calendar as CalendarIcon,
  CalendarCheck,
  Clock,
  CheckCircle2,
  Sparkles,
  Download
} from 'lucide-react';
import { useHR } from '../context/HRContext';
import { HolidayCalendar } from '../components/holidays/HolidayCalendar';
import { AddHolidayModal } from '../components/holidays/AddHolidayModal';

export const HolidayPage = () => {
  const { holidays, searchQuery, setSearchQuery } = useHR();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Dynamic today's date
  const todayStr = new Date().toISOString().split('T')[0];

  const totalHolidaysCount = holidays.length;
  const upcomingHolidays = holidays.filter(h => h.date >= todayStr);
  const completedHolidays = holidays.filter(h => h.date < todayStr);
  
  // Q4 Festive Season (Oct - Dec) dynamic calculation
  const q4Holidays = holidays.filter(h => {
    const m = parseInt((h.date || '').split('-')[1], 10);
    return m >= 10 && m <= 12;
  });

  const sortedUpcoming = [...upcomingHolidays].sort((a, b) => a.date.localeCompare(b.date));
  const nextHol = sortedUpcoming[0];
  const daysToNextHoliday = nextHol ? Math.max(0, Math.ceil((new Date(nextHol.date + 'T00:00:00') - new Date(todayStr + 'T00:00:00')) / (1000 * 60 * 60 * 24))) : 0;

  const handleExportCSV = () => {
    if (holidays.length === 0) {
      alert('No holiday records to export.');
      return;
    }
    const headers = ['Holiday Name', 'Date', 'Day of Week', 'Type', 'Description'];
    const rows = holidays.map(h => [
      `"${h.name}"`,
      h.date,
      h.dayOfWeek || '',
      `"${h.type}"`,
      `"${(h.description || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csvContent));
    link.setAttribute('download', `Holiday_Calendar_${new Date().getFullYear()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="animate-fade-in">
      {/* Page Title & Breadcrumb */}
      <div className="page-header-container">
        <div className="page-title-group">
          <h1 className="page-title">Company Holidays</h1>
          <div className="page-breadcrumb">
            <span>Home</span>
            <ChevronRight size={13} />
            <span>HR</span>
            <ChevronRight size={13} />
            <span>Holiday</span>
          </div>
        </div>
      </div>

      {/* Top Holiday Summary Cards (Total, Upcoming, Completed, This Month) */}
      <div className="kpi-grid-4">
        {/* 1. Total Holidays */}
        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-title">Total Company Holidays</span>
            <div className="kpi-icon-wrap" style={{ background: '#eff6ff', color: '#2563eb' }}>
              <CalendarCheck size={18} />
            </div>
          </div>
          <div className="kpi-value">{totalHolidaysCount} <span style={{ fontSize: '15px', fontWeight: '500', color: '#64748b' }}>Days</span></div>
          <div className="kpi-subtext" style={{ color: '#64748b' }}>
            <span>Annual gazetted & national offs</span>
          </div>
        </div>

        {/* 2. Upcoming Holidays */}
        <div className="kpi-card" style={{ borderLeft: '4px solid #854d0e' }}>
          <div className="kpi-header">
            <span className="kpi-title">Upcoming Holidays</span>
            <div className="kpi-icon-wrap" style={{ background: '#fef9c3', color: '#854d0e' }}>
              <Clock size={18} />
            </div>
          </div>
          <div className="kpi-value" style={{ color: '#854d0e' }}>{upcomingHolidays.length} <span style={{ fontSize: '15px', fontWeight: '500', color: '#64748b' }}>Remaining</span></div>
          <div className="kpi-subtext" style={{ color: '#854d0e' }}>
            <span>Next: {nextHol ? `${nextHol.name} in ${daysToNextHoliday}d (${nextHol.date})` : 'None upcoming'}</span>
          </div>
        </div>

        {/* 3. Completed Holidays */}
        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-title">Completed Holidays</span>
            <div className="kpi-icon-wrap" style={{ background: '#dcfce7', color: '#16a34a' }}>
              <CheckCircle2 size={18} />
            </div>
          </div>
          <div className="kpi-value" style={{ color: '#16a34a' }}>{completedHolidays.length} <span style={{ fontSize: '15px', fontWeight: '500', color: '#64748b' }}>Passed</span></div>
          <div className="kpi-subtext" style={{ color: '#16a34a' }}>
            <span>Celebrated earlier this year</span>
          </div>
        </div>

        {/* 4. This Month / Upcoming Focus */}
        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-title">Festive Season (Oct - Dec)</span>
            <div className="kpi-icon-wrap" style={{ background: '#fef3c7', color: '#d97706' }}>
              <Sparkles size={18} />
            </div>
          </div>
          <div className="kpi-value" style={{ color: '#d97706' }}>{q4Holidays.length} <span style={{ fontSize: '15px', fontWeight: '500', color: '#64748b' }}>Festival Offs</span></div>
          <div className="kpi-subtext" style={{ color: '#d97706' }}>
            <span>{q4Holidays.length > 0 ? q4Holidays.map(h => h.name).slice(0, 3).join(', ') : 'No upcoming festival offs'}</span>
          </div>
        </div>
      </div>

      {/* Action Bar (Matches Screenshot 3) */}
      <div className="action-bar-card">
        <div className="filter-left-group">
          {/* Search Input */}
          <div className="filter-input-wrap">
            <Search size={15} className="filter-input-icon" />
            <input
              type="text"
              className="filter-input"
              placeholder="Search holiday name, festival, category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ minWidth: '320px' }}
            />
          </div>
        </div>

        <div className="filter-right-group">
          {/* Add Holiday Button */}
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="btn btn-primary"
          >
            <Plus size={16} />
            <span>Add Holiday</span>
          </button>

          {/* Export Button */}
          <button
            onClick={handleExportCSV}
            className="btn btn-outline"
          >
            <Download size={15} />
            <span>Export Calendar</span>
          </button>
        </div>
      </div>

      {/* Calendar Grid & List Section (Screenshot 3) */}
      <HolidayCalendar />

      {/* Add Holiday Modal */}
      <AddHolidayModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
};
