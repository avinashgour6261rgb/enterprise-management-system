const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');

// Shared infrastructure
const connectDB = require('./src/shared/config/database');
const { errorHandler, notFound } = require('./src/shared/middleware/errorHandler');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:5174',
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin) || origin.endsWith('.vercel.app') || process.env.NODE_ENV !== 'production') {
      return callback(null, true);
    }
    return callback(null, true);
  },
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Health check route
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    system: 'Enterprise Management System (EMS) API',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// ─── Mount Module Routes ────────────────────────────────────────────────────
// HR Module
app.use('/api/employees',    require('./src/modules/hr/routes/employeeRoutes'));
app.use('/api/leaves',       require('./src/modules/hr/routes/leaveRoutes'));
app.use('/api/attendance',   require('./src/modules/hr/routes/attendanceRoutes'));
app.use('/api/holidays',     require('./src/modules/hr/routes/holidayRoutes'));
app.use('/api/appreciations', require('./src/modules/hr/routes/appreciationRoutes'));

// Future module routes go here:
// app.use('/api/leads',   require('./src/modules/leads/routes/leadRoutes'));
// app.use('/api/finance', require('./src/modules/finance/routes/financeRoutes'));

// 404 & Error Handlers
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Enterprise Management System (EMS) Backend Server running on port ${PORT}`);
  console.log(`📡 API Endpoints ready at http://localhost:${PORT}/api/`);
});
