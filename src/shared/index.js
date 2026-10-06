/**
 * @file index.js
 * @description Shared infrastructure barrel — exports context hooks and layout
 * used across all CRM modules.
 * 
 * Usage:
 *   import { useToast, useTimer } from '../shared';
 *   import { Layout } from '../shared/components/layout/Layout';
 */
export { ToastProvider, useToast } from './context/ToastContext';
export { TimerProvider, useTimer } from './context/TimerContext';
