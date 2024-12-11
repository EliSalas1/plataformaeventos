import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import SideNavBar from "./SideNavBar/SideNavBar";
// import Home from "./pages/Home";
import EventosPrincipal from "./pages/EventosPrincipal/mod2";
import MyDropdown from "./pages/Formulario/mod3";
import EventReportTable from "./pages/Reportes/mod5";
import Historial from "./pages/Historial/mod6";
import PrevView from "./pages/PrevView/mod7";
import Myformularioedit from "./pages/Formulario/mod4";
import Login from "./pages/Login/mod1";
import { Outlet } from "react-router-dom"; // Importar Outlet

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {

    return <Navigate to="/login" replace />; // El atributo replace evita duplicar el historial de navegación
  }
  return children;
};
//CAMBIO
const Layout = () => {
  return (
    <div style={{ display: "flex" }}>
      <SideNavBar />
      <div style={{ flex: 1 }}>
        <Outlet /> {/* Aquí se renderizan las rutas hijas */}
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} /> {/* Ruta para login */}

          {/* Rutas protegida con Layout */}
          <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route path="/" element={< EventosPrincipal />} />
            <Route path="/mod3" element={<MyDropdown />} />
            <Route path="/mod5" element={<EventReportTable />} />
            <Route path="/mod6" element={<Historial />} />
            <Route path="/mod7" element={<PrevView />} />
            <Route path='/mod4/eventos/:id_evento' element={<Myformularioedit />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;