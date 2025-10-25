// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './utils/db.js';
import { router as userRouter } from './routes/userRoutes.js';
import { propertyRouter } from './routes/propertyRouter.js';
import { bookingRouter } from './routes/bookingRouter.js';

dotenv.config();

const app = express();

// Allow both dev and production origins
const allowedOrigins = [
  'http://localhost:5173', // Vite dev server
  'https://ynvnk-homelyhub.vercel.app', // Vercel frontend
];

app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin (like mobile apps or Postman)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('CORS not allowed'));
      }
    },
    credentials: true,
  })
);

// Middleware
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));
app.use(cookieParser());

// Connect to DB
connectDB();

// Routes
app.use('/api/v1/rent/user', userRouter);
app.use('/api/v1/rent/listing', propertyRouter);
app.use('/api/v1/rent/user/booking', bookingRouter);

// ===== Add a Health Check Route =====
app.get('/', (req, res) => {
  res.status(200).send('Server is alive!');
});

// Optional: additional health route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date() });
});

// Start server
const port = process.env.PORT || 8081;
app.listen(port, () => {
  console.log('App running on port: ' + port);
});
