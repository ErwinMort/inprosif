import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './styles/panel.css';
import './styles/panel1.css';
import { Routes, Route } from 'react-router-dom';

import Nav from './components/Nav';
import Encabezado from './components/Encabezado';
import Evidencias from './pages/Evidencias';
import Reportes from './pages/Reportes';
import Cotizacion from './pages/Cotizacion';
import GenCotizacion from './components/cotizacion/GenCotizacion'; // Añade esta importación
import GestionProductos from './pages/GestionProductos';
import GestionProveedor from './pages/GestionProveedor';
import GestionMaterial from './pages/GestionMaterial';
import GestionVentas from './pages/GestionVentas';
import GestionCatProceso from './pages/GestionCatProceso';
import GestionCliente from './pages/GestionCliente';
import Admin from './pages/Admin';


function App() {
  return (
    <div className="app-container">
      <Encabezado />
      <Nav />
      <div className="content">
        <Routes>
          <Route path="/" element={<Admin />} />
          <Route path="/gestioncliente" element={<GestionCliente />} />
          <Route path="/gestioncatproceso" element={<GestionCatProceso />} />
          <Route path="/gestionproductos" element={<GestionProductos />} />
          <Route path="/gestionproveedor" element={<GestionProveedor />} />
          <Route path="/gestionmaterial" element={<GestionMaterial />} />
          <Route path="/gestionventas" element={<GestionVentas />} />
          <Route path="/generacioncotizaciones" element={<Cotizacion />} />
          <Route path="/generacionreportes" element={<Reportes />} />
          {/* <Route path="/evidencias" element={<Evidencias />} /> */}
          <Route path="/Evidencias" element={<Evidencias />} /> {/* ERWIN */}
          <Route path="/generar-cotizacion" element={<GenCotizacion />} /> {/* Nueva ruta */}
        </Routes>
      </div>
    </div>
  );
}

export default App;
