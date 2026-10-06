/**
 * @file storageService.js
 * @description LocalStorage database engine with reactive triggers.
 * 
 * WHY THIS IS HERE:
 * It simulates a real MongoDB database right inside the browser during frontend development.
 * It persists state across page reloads, supports standard CRUD queries, and emits
 * change events so that the entire app stays synchronized.
 * 
 * LOCATION: src/shared/services/storageService.js
 * USED BY:  src/modules/hr/services/hrService.js (and future module services)
 */

import {
  INITIAL_EMPLOYEES,
  INITIAL_LEAVES,
  generateInitialAttendance,
  INITIAL_HOLIDAYS,
  INITIAL_APPRECIATIONS
} from '../mock/initialData';

const KEYS = {
  EMPLOYEES: 'hrms_employees',
  LEAVES: 'hrms_leaves',
  ATTENDANCE: 'hrms_attendance',
  HOLIDAYS: 'hrms_holidays',
  APPRECIATIONS: 'hrms_appreciations',
  WORK_TIMER: 'hrms_work_timer',
  SETTINGS: 'hrms_settings'
};

export const initStorage = () => {
  if (!localStorage.getItem(KEYS.EMPLOYEES)) {
    localStorage.setItem(KEYS.EMPLOYEES, JSON.stringify(INITIAL_EMPLOYEES));
  }
  if (!localStorage.getItem(KEYS.LEAVES)) {
    localStorage.setItem(KEYS.LEAVES, JSON.stringify(INITIAL_LEAVES));
  }
  if (!localStorage.getItem(KEYS.ATTENDANCE)) {
    localStorage.setItem(KEYS.ATTENDANCE, JSON.stringify(generateInitialAttendance()));
  }
  if (!localStorage.getItem(KEYS.HOLIDAYS)) {
    localStorage.setItem(KEYS.HOLIDAYS, JSON.stringify(INITIAL_HOLIDAYS));
  }
  if (!localStorage.getItem(KEYS.APPRECIATIONS)) {
    localStorage.setItem(KEYS.APPRECIATIONS, JSON.stringify(INITIAL_APPRECIATIONS));
  }
};

// Generic read
export const getCollection = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error(`Error reading ${key} from storage:`, error);
    return [];
  }
};

// Generic write with broadcast
export const saveCollection = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    window.dispatchEvent(new CustomEvent('hrms_storage_change', { detail: { key } }));
  } catch (error) {
    console.error(`Error saving ${key} to storage:`, error);
  }
};

export { KEYS };
