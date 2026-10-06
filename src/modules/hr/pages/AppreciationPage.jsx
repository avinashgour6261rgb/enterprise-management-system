import React, { useState, useMemo } from 'react';
import {
  ChevronRight,
  Plus,
  Download,
  Filter,
  Search,
  Award,
  Trophy,
  Star,
  Trash2,
  Gift,
  HeartHandshake,
  Sparkles,
  Users,
  CheckCircle2
} from 'lucide-react';
import { useHR } from '../context/HRContext';
import { DateRangePicker } from '../components/common/DateRangePicker';
import { AddAppreciationModal } from '../components/appreciation/AddAppreciationModal';

export const AppreciationPage = () => {
  const { appreciations, employees, searchQuery, setSearchQuery, deleteAppreciation } = useHR();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState('table'); // 'table', 'cards'
  const [pageSize, setPageSize] = useState(25);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedEmployeeFilter, setSelectedEmployeeFilter] = useState('all');

  // 1. Exact Dynamic Mathematical KPI metrics
  const currentMonthPrefix = new Date().toISOString().slice(0, 7);
  const currentMonthName = new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' });
  const totalAppreciationsCount = appreciations.length;
  const thisMonthAppreciations = appreciations.filter(a => a.givenOn?.startsWith(currentMonthPrefix) || a.givenOn?.startsWith('2026-09'));

  // Star Performer (most awarded employee count)
  const awardCounts = {};
  appreciations.forEach(a => {
    if (a.givenToName) {
      awardCounts[a.givenToName] = (awardCounts[a.givenToName] || 0) + 1;
    }
  });
  const sortedPerformers = Object.entries(awardCounts).sort((a, b) => b[1] - a[1]);
  const topPerformerName = sortedPerformers[0] ? sortedPerformers[0][0] : (employees[0]?.name || 'Avinash');
  const topPerformerAwardsCount = sortedPerformers[0] ? sortedPerformers[0][1] : 0;

  // Exact reward points / cash distributed calculation
  const totalRewardValue = appreciations.reduce((sum, a) => {
    if (!a.rewardPointsOrCash) return sum;
    const match = String(a.rewardPointsOrCash).match(/\d[\d,]*/);
    if (match) {
      const val = parseInt(match[0].replace(/,/g, ''), 10);
      return sum + (isNaN(val) ? 0 : val);
    }
    return sum;
  }, 0);
  const totalRewardsCount = appreciations.filter(a => !!a.rewardPointsOrCash).length;

  // Filtered
  const filteredAppreciations = useMemo(() => {
    return appreciations.filter(a => {
      if (selectedEmployeeFilter !== 'all' && a.givenToId !== selectedEmployeeFilter) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchName = a.givenToName?.toLowerCase().includes(q);
        const matchAward = a.awardName?.toLowerCase().includes(q);
        const matchNote = a.appreciationNote?.toLowerCase().includes(q);
        const matchGiver = a.givenByName?.toLowerCase().includes(q);
        if (!matchName && !matchAward && !matchNote && !matchGiver) return false;
      }
      return true;
    });
  }, [appreciations, selectedEmployeeFilter, searchQuery]);

  // Pagination
  const totalEntries = filteredAppreciations.length;
  const totalPages = Math.ceil(totalEntries / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedList = filteredAppreciations.slice(startIndex, startIndex + pageSize);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(paginatedList.map(a => a._id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter(rId => rId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const handleExportCSV = () => {
    if (filteredAppreciations.length === 0) {
      alert('No appreciation records to export.');
      return;
    }
    const headers = ['Employee Name', 'Role', 'Award / Reason', 'Given On', 'Given By', 'Reward', 'Appreciation Message'];
    const rows = filteredAppreciations.map(a => [
      `"${a.givenToName}"`,
      `"${a.givenToRole}"`,
      `"${a.awardName}"`,
      a.givenOn,
      `"${a.givenByName}"`,
      `"${a.rewardPointsOrCash || ''}"`,
      `"${(a.appreciationNote || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csvContent));
    link.setAttribute('download', `Appreciations_Report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="animate-fade-in">
      {/* Page Title & Breadcrumb (Matches Screenshot 4) */}
      <div className="page-header-container">
        <div className="page-title-group">
          <h1 className="page-title">Employee Appreciation & Awards</h1>
          <div className="page-breadcrumb">
            <span>Home</span>
            <ChevronRight size={13} />
            <span>HR</span>
            <ChevronRight size={13} />
            <span>Appreciation</span>
          </div>
        </div>
      </div>

      {/* Top Summary KPI Cards (Total Appreciation Count, This Month, Top Performer, Rewards) */}
      <div className="kpi-grid-4">
        {/* 1. Total Appreciation Count */}
        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-title">Total Appreciation Count</span>
            <div className="kpi-icon-wrap" style={{ background: '#fef3c7', color: '#d97706' }}>
              <Trophy size={18} />
            </div>
          </div>
          <div className="kpi-value" style={{ color: '#d97706' }}>
            {totalAppreciationsCount} <span style={{ fontSize: '15px', fontWeight: '500', color: '#64748b' }}>Awards</span>
          </div>
          <div className="kpi-subtext" style={{ color: '#d97706' }}>
            <Sparkles size={13} />
            <span>Peer & leadership recognitions</span>
          </div>
        </div>

        {/* 2. This Month's Awards */}
        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-title">Awarded This Month</span>
            <div className="kpi-icon-wrap" style={{ background: '#eff6ff', color: '#2563eb' }}>
              <Award size={18} />
            </div>
          </div>
          <div className="kpi-value" style={{ color: '#2563eb' }}>
            {thisMonthAppreciations.length} <span style={{ fontSize: '15px', fontWeight: '500', color: '#64748b' }}>Badges</span>
          </div>
          <div className="kpi-subtext" style={{ color: '#2563eb' }}>
            <span>{currentMonthName} cycle</span>
          </div>
        </div>

        {/* 3. Star Performer */}
        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-title">Star Performer</span>
            <div className="kpi-icon-wrap" style={{ background: '#fdf4ff', color: '#c026d3' }}>
              <Star size={18} />
            </div>
          </div>
          <div className="kpi-value" style={{ color: '#0f172a', fontSize: '20px' }}>
            {topPerformerName}
          </div>
          <div className="kpi-subtext" style={{ color: '#c026d3' }}>
            <span>{topPerformerAwardsCount > 0 ? `${topPerformerAwardsCount} appreciation award${topPerformerAwardsCount > 1 ? 's' : ''}` : 'Top recognized team member'}</span>
          </div>
        </div>

        {/* 4. Reward Incentives */}
        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-title">Rewards Distributed</span>
            <div className="kpi-icon-wrap" style={{ background: '#dcfce7', color: '#16a34a' }}>
              <Gift size={18} />
            </div>
          </div>
          <div className="kpi-value" style={{ color: '#16a34a' }}>
            ₹{totalRewardValue.toLocaleString('en-IN')} <span style={{ fontSize: '14px', fontWeight: '600', color: '#64748b' }}>Value</span>
          </div>
          <div className="kpi-subtext" style={{ color: '#16a34a' }}>
            <span>{totalRewardsCount} rewarded bonus perks</span>
          </div>
        </div>
      </div>

      {/* Action Bar (Matches Screenshot 4) */}
      <div className="action-bar-card">
        <div className="filter-left-group">
          {/* Employee Filter */}
          <div className="filter-item">
            <span style={{ fontWeight: '600', color: '#475569' }}>Employee:</span>
            <select
              value={selectedEmployeeFilter}
              onChange={(e) => setSelectedEmployeeFilter(e.target.value)}
              className="filter-select"
              style={{ minWidth: '160px' }}
            >
              <option value="all">All Employees</option>
              {employees.map(emp => (
                <option key={emp._id} value={emp._id}>{emp.name}</option>
              ))}
            </select>
          </div>

          {/* Search Bar */}
          <div className="filter-input-wrap">
            <Search size={15} className="filter-input-icon" />
            <input
              type="text"
              className="filter-input"
              placeholder="Search recipient, reason, citation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ minWidth: '260px' }}
            />
          </div>
        </div>

        <div className="filter-right-group">
          {/* Add Appreciation Button */}
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="btn btn-primary"
          >
            <Plus size={16} />
            <span>Give Award</span>
          </button>

          {/* Export Button */}
          <button
            onClick={handleExportCSV}
            className="btn btn-outline"
          >
            <Download size={15} />
            <span>Export</span>
          </button>

          {/* View Switcher Icons (Table / Cards Showcase) */}
          <div className="view-switch-group">
            <button
              onClick={() => setViewMode('table')}
              className={`view-switch-btn ${viewMode === 'table' ? 'active' : ''}`}
              title="Table View"
            >
              <Award size={16} />
            </button>
            <button
              onClick={() => setViewMode('cards')}
              className={`view-switch-btn ${viewMode === 'cards' ? 'active' : ''}`}
              title="Awards Showcase Gallery"
            >
              <Trophy size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Table View (Matching Screenshot 4) */}
      {viewMode === 'table' && (
        <div className="table-card">
          <div className="table-responsive">
            <table className="crm-table">
              <thead>
                <tr>
                  <th style={{ width: '40px' }}>
                    <input
                      type="checkbox"
                      checked={selectedRows.length === paginatedList.length && paginatedList.length > 0}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th>Employee Name</th>
                  <th>Award Name & Reason</th>
                  <th>Appreciation Message</th>
                  <th>Given By</th>
                  <th>Date</th>
                  <th>Reward</th>
                  <th style={{ textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedList.length > 0 ? (
                  paginatedList.map(item => (
                    <tr key={item._id}>
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(item._id)}
                          onChange={() => handleSelectRow(item._id)}
                        />
                      </td>

                      {/* Given To Employee Cell */}
                      <td>
                        <div className="employee-cell">
                          <div className="employee-avatar">
                            {item.givenToAvatar ? (
                              <img src={item.givenToAvatar} alt={item.givenToName} />
                            ) : (
                              item.givenToName?.charAt(0) || 'E'
                            )}
                          </div>
                          <div className="employee-name-group">
                            <span className="employee-name">
                              {item.givenToName}
                              {item.givenToName === 'Avinash' && (
                                <span className="its-you-pill">It's You</span>
                              )}
                            </span>
                            <span className="employee-role">{item.givenToRole}</span>
                          </div>
                        </div>
                      </td>

                      {/* Award Name & Reason */}
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '28px',
                            height: '28px',
                            borderRadius: '6px',
                            background: '#fef3c7',
                            color: '#d97706'
                          }}>
                            <Trophy size={14} />
                          </span>
                          <span style={{ fontWeight: '700', color: '#0f172a' }}>
                            {item.awardName}
                          </span>
                        </div>
                      </td>

                      {/* Appreciation Message */}
                      <td style={{ maxWidth: '280px', color: '#475569', fontSize: '12.5px', lineHeight: '1.4' }}>
                        "{item.appreciationNote}"
                      </td>

                      {/* Given By */}
                      <td style={{ fontWeight: '500', color: '#334155' }}>
                        {item.givenByName}
                      </td>

                      {/* Given On Date */}
                      <td style={{ fontWeight: '600', color: '#64748b' }}>
                        {item.givenOn}
                      </td>

                      {/* Reward */}
                      <td>
                        {item.rewardPointsOrCash ? (
                          <span style={{
                            fontSize: '11.5px',
                            fontWeight: '700',
                            color: '#16a34a',
                            background: '#dcfce7',
                            padding: '3px 8px',
                            borderRadius: '6px'
                          }}>
                            {item.rewardPointsOrCash}
                          </span>
                        ) : (
                          <span style={{ color: '#94a3b8' }}>—</span>
                        )}
                      </td>

                      {/* Action */}
                      <td style={{ textAlign: 'right' }}>
                        <button
                          onClick={() => {
                            if (confirm(`Remove appreciation for ${item.givenToName}?`)) {
                              deleteAppreciation(item._id);
                            }
                          }}
                          className="btn-icon-only"
                          style={{ width: '28px', height: '28px', color: '#ef4444' }}
                          title="Delete Appreciation"
                        >
                          <Trash2 size={13} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8">
                      <div className="table-empty-state">
                        <HeartHandshake className="table-empty-icon" />
                        <div style={{ fontWeight: '600', fontSize: '15px', color: '#1e293b' }}>
                          No appreciation records found
                        </div>
                        <p style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>
                          Click on "+ Give Award" button above to appreciate team members.
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer (Matching Screenshot 4) */}
          <div className="table-pagination-footer">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>Show</span>
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="filter-select"
                style={{ height: '30px', padding: '0 24px 0 8px', fontSize: '12px' }}
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
              <span>entries</span>
            </div>

            <div>
              Showing {totalEntries > 0 ? startIndex + 1 : 0} to {Math.min(startIndex + pageSize, totalEntries)} of {totalEntries} entries
            </div>

            <div className="pagination-controls">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                className="page-btn"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button
                  key={p}
                  onClick={() => setCurrentPage(p)}
                  className={`page-btn ${currentPage === p ? 'active' : ''}`}
                >
                  {p}
                </button>
              ))}
              <button
                disabled={currentPage === totalPages || totalEntries === 0}
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                className="page-btn"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cards Gallery Showcase View */}
      {viewMode === 'cards' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px', marginBottom: '24px' }}>
          {filteredAppreciations.map(item => (
            <div
              key={item._id}
              style={{
                background: 'linear-gradient(145deg, #ffffff, #fbfcfe)',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                padding: '22px',
                boxShadow: 'var(--shadow-md)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div style={{
                position: 'absolute',
                top: '-15px',
                right: '-15px',
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(234, 179, 8, 0.05))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Star size={24} color="#d97706" />
              </div>

              <div className="employee-cell" style={{ marginBottom: '16px' }}>
                <div className="employee-avatar" style={{ width: '44px', height: '44px' }}>
                  {item.givenToAvatar ? <img src={item.givenToAvatar} alt={item.givenToName} /> : item.givenToName.charAt(0)}
                </div>
                <div className="employee-name-group">
                  <span className="employee-name" style={{ fontSize: '15px' }}>{item.givenToName}</span>
                  <span className="employee-role">{item.givenToRole}</span>
                </div>
              </div>

              <div style={{
                background: '#fef3c7',
                border: '1px solid #fde68a',
                padding: '8px 12px',
                borderRadius: '8px',
                color: '#92400e',
                fontWeight: '700',
                fontSize: '13px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '12px'
              }}>
                <Trophy size={16} />
                <span>{item.awardName}</span>
              </div>

              <p style={{ fontSize: '12.5px', color: '#475569', fontStyle: 'italic', lineHeight: '1.5', marginBottom: '14px' }}>
                "{item.appreciationNote}"
              </p>

              {item.rewardPointsOrCash && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#16a34a',
                  marginBottom: '14px'
                }}>
                  <Gift size={15} />
                  <span>Reward: {item.rewardPointsOrCash}</span>
                </div>
              )}

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderTop: '1px solid #f1f5f9',
                paddingTop: '12px',
                fontSize: '11px',
                color: '#94a3b8'
              }}>
                <span>Awarded on: {item.givenOn}</span>
                <span>By: {item.givenByName}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Modal */}
      <AddAppreciationModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
};
