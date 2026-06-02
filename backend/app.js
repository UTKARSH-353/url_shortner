const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');

const { apiLimiter } = require('./middleware/rateLimiter');
const errorHandler = require('./middleware/errorHandler');

const authRoutes = require('./routes/auth');
const urlRoutes = require('./routes/url');
const analyticsRoutes = require('./routes/analytics');
const redirectRoutes = require('./routes/redirect');

const app = express();

/* ---------------- MIDDLEWARES ---------------- */
app.use(helmet());

app.use(cors({
    origin: process.env.CLIENT_URL || '*',
    credentials: true
}));

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

app.use(mongoSanitize());
app.use(xss());

app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

/* ---------------- HEALTH CHECK ---------------- */
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        uptime: process.uptime(),
        message: 'Server is running 🚀'
    });
});

/* ---------------- HOME ROUTE (IMPORTANT FIX) ---------------- */
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'URL Shortener Backend is running 🚀',
        routes: {
            health: '/api/health',
            auth: '/api/auth',
            url: '/api/url',
            analytics: '/api/analytics'
        }
    });
});

/* ---------------- API ROUTES ---------------- */
app.use('/api', apiLimiter);

app.use('/api/auth', authRoutes);
app.use('/api/url', urlRoutes);
app.use('/api/analytics', analyticsRoutes);

/* ---------------- REDIRECT ENGINE (KEEP LAST) ---------------- */
app.use('/', redirectRoutes);

/* ---------------- 404 HANDLER ---------------- */
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

/* ---------------- ERROR HANDLER ---------------- */
app.use(errorHandler);

module.exports = app;