import React from 'react'
import store from './store';
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import Dashboard from './scenes/dashboard';
import LoginPage from './scenes/loginPage/index.jsx';
import Team from './scenes/team';
import {createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute.jsx';
import ProfilePage from './scenes/profilePage/index.jsx';
import Bar from './scenes/bar/index.jsx';
import ExpenseCategoryPage from './scenes/expenseCategory/index.jsx';
import TransactionsPage from './scenes/transactions/index.jsx';
import Breakdown from './scenes/breakdown/index.jsx';
import MonthlyOverview from './scenes/monthly/index.jsx';
 
const router = createBrowserRouter(
  createRoutesFromElements(
     <Route path='/' element={<App />} >
        {/* <Route index={true} path='/' element={<Dashboard />} /> */}
        <Route index={true} path='/' element={<LoginPage />} />
        <Route  path='/admin' element={<Dashboard />} />
        <Route path='/team' element={<Team />} />
        <Route path='/expenseCategory' element={<ExpenseCategoryPage />} />
        <Route path='/transactions' element={<TransactionsPage />} />
        <Route path='/breakdown' element={<Breakdown />} />
        <Route path='/monthlyOverview' element={<MonthlyOverview />} />

        
        
        {/* Private Routes */}
        <Route path='' element={<PrivateRoute />} >
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/overview' element={<Bar />} />
        </Route>
      </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
        {/* <BrowserRouter> */}
          <RouterProvider router= {router} />
        {/* </BrowserRouter> */}
    </React.StrictMode>
  </Provider>,
)
