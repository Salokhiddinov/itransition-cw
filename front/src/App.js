import * as React from "react";
import { Routes, Route } from "react-router-dom";
import StartPage from "./pages/StartPage";
import NotFound from "./pages/NotFound";
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'



function App() {
  return (

    <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
    </Routes>
  );
}

export default App;
