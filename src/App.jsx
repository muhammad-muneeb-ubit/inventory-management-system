import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import './css/style.css';


// Import pages
import Dashboard from './pages/Dashboard';
import AddUser from './partials/dashboard/AddUser';
import AddProduct from './partials/dashboard/AddProduct';
import PendingUsers from './partials/dashboard/PendingUsers';
import Users from './partials/dashboard/Users';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Reports from './partials/dashboard/Report';
import Profile from './partials/dashboard/Profile';

function App() {

  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        {/* <Route path="/dashboard/" element={<Products />} /> 🆕 Form Route */}
        <Route path="/dashboard/users" element={<Users />} /> {/* 🆕 Form Route */}
        <Route path="/dashboard/users/add" element={<AddUser />} /> {/* 🆕 Form Route */}
        <Route path="/dashboard/products/add" element={<AddProduct />} /> {/* Optional */}
        <Route path="/dashboard/users/pending" element={<PendingUsers heading = "Pending Users" />} /> {/* Optional */}
        <Route path="/dashboard/report" element={<Reports />} /> {/* Optional */}
        <Route path="/dashboard/profile" element={<Profile />} /> {/* Optional */}
      </Routes>
    </>
  );
}

export default App;
