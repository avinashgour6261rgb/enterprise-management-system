/**
 * @file index.js
 * @description HR Module entry point — exports context, hook, and service
 * so other parts of the app can import from 'modules/hr' cleanly.
 * 
 * Usage:
 *   import { useHR, HRProvider } from '../modules/hr';
 */
export { HRProvider, useHR } from './context/HRContext';
export { hrService } from './services/hrService';
