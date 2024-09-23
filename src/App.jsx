import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Signin from "./Pages/signin";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Signin />} />

          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
