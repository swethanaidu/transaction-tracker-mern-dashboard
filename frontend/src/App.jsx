import React from 'react'
import { ColorModeContext, useMode} from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Topbar from './scenes/global/Topbar';
// import { Routes, Route } from 'react-router-dom';
// import Dashboard from './scenes/dashboard';
import SidebarMenu from './scenes/global/Sidebar'
import { Outlet } from 'react-router-dom';
// import Team from './scenes/team';
// import Calendar from './scenes/calendar';

const App = () => {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <SidebarMenu />
          <main className='content'>
            <Topbar />
            <Outlet />
            {/* <Routes>
              <Route path='/' element={<Dashboard />} />
              <Route path='/team' element={<Team />} />
              <Route path='/calendar' element={<Calendar />} />
            </Routes> */}
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default App