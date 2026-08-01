import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import notesRoutes from './routes/notesRoutes.js';
import { errors } from 'celebrate';
import authRoutes from './routes/authRoutes.js';

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(
  cors({
    origin: '*',
    methods: 'GET,PATCH,POST,DELETE',
  }),
);
app.use(cookieParser());
app.use(logger);
app.use(helmet());
app.use(express.json());

app.use(authRoutes);
app.use(notesRoutes);

app.use(notFoundHandler);

app.use(errors());

app.use(errorHandler);

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
