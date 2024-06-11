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
const router = createBrowserRouter(
  createRoutesFromElements(
     <Route path='/' element={<App />} >
        {/* <Route index={true} path='/' element={<Dashboard />} /> */}
        <Route index={true} path='/' element={<LoginPage />} />
        <Route  path='/admin' element={<Dashboard />} />
        <Route path='/team' element={<Team />} />
        {/* Private Routes */}
        <Route path='' element={<PrivateRoute />} >
          <Route path='/profile' element={<ProfilePage />} />
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
