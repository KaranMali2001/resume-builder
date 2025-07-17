import authRoutes from '@/routes/auhtRoute';
import courseRoute from '@/routes/courseRoute';
import resumeRoute from '@/routes/resumeRoute';
import userRouter from '@/routes/userRoute';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
dotenv.config();

export const app = express();
app.use(
  morgan(
    process.env.NODE_ENV === 'production'
      ? 'combined'
      : ':method :url :status :response-time ms - :res[content-length]',
  ),
);

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  }),
);
app.use(express.json());

// Routes
app.get('/health', (req, res) => res.send('ok'));
app.use('/api/auth', authRoutes);
app.use('/api/user', userRouter);
app.use('/api/course', courseRoute);
app.use('/api/resume', resumeRoute);

// Error handling middleware
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
  },
);
