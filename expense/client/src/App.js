import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./components/layout/about";
import SecQue from "./pages/secques";
function App() {
  return (
    <>
      <Routes>
        <Route
          exact path="/" element={<ProtectedRoutes> <HomePage /> </ProtectedRoutes>}/>
          
        
        
        <Route path='/about' element={<About/>} />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/SecQue" element={<SecQue/>}/>
      </Routes>
    </>
  );
}

export function ProtectedRoutes(props) {
  if (localStorage.getItem("user")) {
    return props.children;
  } else {
    return <Navigate to="/login" />;
  }
}

export default App;