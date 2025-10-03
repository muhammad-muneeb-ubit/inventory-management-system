import { useState } from "react";

import "./App.css";
import { Route, Routes } from "react-router-dom";
import SignUp from "./component/signup/SignUp";
import Login from "./component/login/Login";
import Dashboard from "./component/Dashboard";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="*" element={<h1>404 Not Found</h1>}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
      </Routes>
      <div className="absolute bottom-0 left-0 right-0 text-center text-gray-500 text-sm">&copy; {new Date().getFullYear()} Muhammad Muneeb. All rights reserved.</div>
    </>
  );
}

export default App;
