"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = __importDefault(require("./config/database"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const creditReportRoutes_1 = __importDefault(require("./routes/creditReportRoutes"));
// Load environment variables
dotenv_1.default.config();
// Initialize express app
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Connect to MongoDB
(0, database_1.default)();
// Middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Simple request logger middleware
app.use((req, _res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});
// Routes
app.use('/api/users', userRoutes_1.default);
app.use('/api/credit-reports', creditReportRoutes_1.default);
// Health check endpoint
app.get('/api/health', (_req, res) => {
    res.status(200).json({ status: 'ok', message: 'Server is running' });
});
// Root endpoint
app.get('/', (_req, res) => {
    res.status(200).json({
        message: 'Multi-Bureau Credit Scoring & Risk Aggregation System API',
        version: '1.0.0',
        endpoints: {
            users: '/api/users',
            creditReports: '/api/credit-reports'
        }
    });
});
// Error handler middleware
app.use((err, _req, res, _next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? err.message : 'An unexpected error occurred'
    });
});
// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
});
exports.default = app;
