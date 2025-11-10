# transaction-tracker-mern-dashboard
Expenses/Transactions Tracker with Dashboard Charts
## Project Documentation

### Overview
`transaction-tracker-mern-dashboard` is a full-stack MERN (MongoDB, Express, React, Node.js) application designed to help users track expenses and transactions. The dashboard provides interactive charts and analytics for financial insights.

### Features
- Add, edit, and delete transactions
- Categorize expenses
- Visualize spending trends with charts
- Filter transactions by date, category, or amount
- Responsive dashboard UI

### User Stories

#### As a user:
- I want to add new transactions so I can keep track of my expenses.
- I want to categorize transactions to analyze my spending habits.
- I want to view my transactions in a list and on a dashboard.
- I want to see charts that summarize my expenses over time.
- I want to edit or delete transactions to correct mistakes.
- I want to filter transactions by date, category, or amount for detailed analysis.

### Detailed Description

This application consists of a React frontend and a Node.js/Express backend connected to a MongoDB database. Users can register and log in to manage their personal transactions securely. The dashboard displays charts (e.g., pie, bar, line) using libraries like Chart.js or Recharts, providing visual summaries of expenses by category and over time.

#### Technologies Used
- **Frontend:** React, Redux, Chart.js/Recharts, Material-UI/Bootstrap
- **Backend:** Node.js, Express
- **Database:** MongoDB (Mongoose ODM)
- **Authentication:** JWT-based user authentication

#### Folder Structure
- `/client`: React frontend
- `/server`: Express backend
- `/models`: Mongoose schemas for transactions and users
- `/routes`: API endpoints for transactions and authentication

#### Getting Started
1. Clone the repository.
2. Install dependencies in both `/client` and `/server`.
3. Set up environment variables for MongoDB connection and JWT secret.
4. Run the backend and frontend servers.
5. Access the dashboard at `http://localhost:3000`.

#### Future Improvements
- Add recurring transactions
- Export data to CSV/PDF
- Multi-user support with roles
- Mobile app version
