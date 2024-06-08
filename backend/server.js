import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/useRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';

dotenv.config();

connectDB();
const app = express();
const PORT = process.env.PORT || 5000;

// console.log(process.env.PORT);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use('/api/users', userRoutes);
app.get('/', (req,res) => res.send("Server is ready"));

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`))