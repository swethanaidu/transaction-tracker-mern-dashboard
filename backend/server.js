import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/useRoutes.js'
import overallStatRoutes from './routes/overallStatRoutes.js';
import expensesCategoryRoutes from './routes/expensesCategoryRoutes.js'
import transactionRoutes from './routes/transactionRoutes.js'
import chartsRoutes from './routes/chartsDataRoutes.js'
import bankRoutes from './routes/bankRoutes.js'
import vendorRoutes from './routes/vendorRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import path from 'path';

dotenv.config();


connectDB();
const app = express();
const PORT = process.env.PORT || 5000;

// console.log(process.env.PORT);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use('/api/users', userRoutes);
app.use('/api/expensesCategories', expensesCategoryRoutes);
app.use('/api/dashboard',  overallStatRoutes);
app.use('/api/transactions',  transactionRoutes);
app.use('/api/stats',  chartsRoutes);
app.use('/api/bank',  bankRoutes);
app.use('/api/vendor',  vendorRoutes);

// app.get('/', (req,res) => res.send("Server is ready"));


if (process.env.NODE_ENV === 'production') {
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, '/frontend/dist')));
  
    app.get('*', (req, res) =>
      res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
    );
  } else {
    app.get('/', (req, res) => {
      res.send('API is running....');
    });
  }

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`))