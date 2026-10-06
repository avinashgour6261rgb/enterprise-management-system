import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { hrService } from '../services/hrService';
import { useToast } from '../../../shared/context/ToastContext';

const HRContext = createContext();

export const HRProvider = ({ children }) => {
  const { addToast } = useToast();

  const [employees, setEmployees] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [leaves, setLeaves] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [holidays, setHolidays] = useState([]);
  const [appreciations, setAppreciations] = useState([]);

  const [selectedMonth, setSelectedMonth] = useState(9); // September
  const [selectedYear, setSelectedYear] = useState(2026);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });

  const [loading, setLoading] = useState(true);

  // Load all initial data
  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const [emps, curr, lvs, atts, hols, apps] = await Promise.all([
        hrService.getEmployees(),
        hrService.getCurrentUser(),
        hrService.getLeaves({
          employeeId: selectedEmployeeId,
          search: searchQuery,
          startDate: dateRange.startDate,
          endDate: dateRange.endDate
        }),
        hrService.getMonthlyAttendance(selectedMonth, selectedYear, selectedEmployeeId),
        hrService.getHolidays(selectedYear, searchQuery),
        hrService.getAppreciations({ employeeId: selectedEmployeeId, search: searchQuery })
      ]);

      setEmployees(emps || []);
      setCurrentUser(curr);
      setLeaves(lvs || []);
      setAttendance(atts || []);
      setHolidays(hols || []);
      setAppreciations(apps || []);
    } catch (err) {
      console.error('Error loading HRMS data:', err);
      addToast('Failed to sync HRMS data', 'error');
    } finally {
      setLoading(false);
    }
  }, [selectedEmployeeId, searchQuery, dateRange, selectedMonth, selectedYear, addToast]);

  useEffect(() => {
    loadData();

    // Listen for storage events across tabs or internal updates
    const handleStorageUpdate = () => loadData();
    window.addEventListener('hrms_storage_change', handleStorageUpdate);
    return () => window.removeEventListener('hrms_storage_change', handleStorageUpdate);
  }, [loadData]);

  // ================= EMPLOYEES =================
  const addEmployee = async (empData) => {
    try {
      const created = await hrService.createEmployee(empData);
      addToast(`Employee "${created.name}" added to database!`, 'success');
      await loadData();
      return created;
    } catch (err) {
      addToast('Failed to add employee', 'error');
      throw err;
    }
  };

  const updateEmployee = async (employeeId, updateData) => {
    try {
      const updated = await hrService.updateEmployee(employeeId, updateData);
      addToast('Employee details updated', 'success');
      await loadData();
      return updated;
    } catch (err) {
      addToast('Failed to update employee', 'error');
      throw err;
    }
  };

  const deleteEmployee = async (employeeId) => {
    try {
      await hrService.deleteEmployee(employeeId);
      addToast('Employee removed from roster', 'info');
      await loadData();
    } catch (err) {
      addToast('Failed to delete employee', 'error');
      throw err;
    }
  };

  // ================= LEAVES =================
  const applyLeave = async (leaveData) => {
    try {
      const created = await hrService.createLeave(leaveData);
      addToast('Leave request submitted successfully!', 'success');
      await loadData();
      return created;
    } catch (err) {
      addToast('Failed to submit leave request', 'error');
      throw err;
    }
  };

  const updateLeaveStatus = async (leaveId, status) => {
    try {
      await hrService.updateLeaveStatus(leaveId, status, currentUser?.name || 'HR Admin');
      addToast(`Leave marked as ${status}`, 'success');
      await loadData();
    } catch (err) {
      addToast('Failed to update leave status', 'error');
    }
  };

  const deleteLeave = async (leaveId) => {
    try {
      await hrService.deleteLeave(leaveId);
      addToast('Leave request removed', 'info');
      await loadData();
    } catch (err) {
      addToast('Failed to delete leave', 'error');
    }
  };

  // ================= ATTENDANCE =================
  const markAttendanceRecord = async (data) => {
    try {
      await hrService.markAttendance(data);
      addToast('Attendance marked successfully!', 'success');
      await loadData();
    } catch (err) {
      addToast('Failed to record attendance', 'error');
    }
  };

  // ================= HOLIDAYS =================
  const addHoliday = async (data) => {
    try {
      await hrService.createHoliday(data);
      addToast('New holiday added to company calendar!', 'success');
      await loadData();
    } catch (err) {
      addToast('Failed to create holiday', 'error');
    }
  };

  const deleteHoliday = async (holidayId) => {
    try {
      await hrService.deleteHoliday(holidayId);
      addToast('Holiday removed from calendar', 'info');
      await loadData();
    } catch (err) {
      addToast('Failed to delete holiday', 'error');
    }
  };

  // ================= APPRECIATIONS =================
  const addAppreciation = async (data) => {
    try {
      await hrService.createAppreciation(data);
      addToast('Appreciation award presented successfully! 🎉', 'success');
      await loadData();
    } catch (err) {
      addToast('Failed to add appreciation', 'error');
    }
  };

  const deleteAppreciation = async (appreciationId) => {
    try {
      await hrService.deleteAppreciation(appreciationId);
      addToast('Appreciation record removed', 'info');
      await loadData();
    } catch (err) {
      addToast('Failed to delete appreciation', 'error');
    }
  };

  return (
    <HRContext.Provider value={{
      loading,
      employees,
      currentUser,
      leaves,
      attendance,
      holidays,
      appreciations,
      selectedMonth,
      setSelectedMonth,
      selectedYear,
      setSelectedYear,
      selectedEmployeeId,
      setSelectedEmployeeId,
      searchQuery,
      setSearchQuery,
      dateRange,
      setDateRange,
      loadData,
      addEmployee,
      updateEmployee,
      deleteEmployee,
      applyLeave,
      updateLeaveStatus,
      deleteLeave,
      markAttendanceRecord,
      addHoliday,
      deleteHoliday,
      addAppreciation,
      deleteAppreciation
    }}>
      {children}
    </HRContext.Provider>
  );
};

export const useHR = () => useContext(HRContext);
