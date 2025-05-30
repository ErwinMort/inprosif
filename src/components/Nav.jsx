import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBriefcase, faList, faTruck, faBox, faChartBar, faFileInvoice, faClipboardList, faClipboardCheck, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import '../styles/panel.css';
import '../styles/panel1.css';
import { Link } from 'react-router-dom';
import { faPeopleGroup } from '@fortawesome/free-solid-svg-icons'; //icono de clientes

const Nav = () => {
    return (
        <div>
            <nav className="sidebar">
                <div className="profile">
                    <h3>Administrador</h3>
                </div>

                <Link to="/" className="nav-btn"><i className="fas fa-user"><FontAwesomeIcon icon={faUser} /> </i> Panel de Administrador</Link>
                <Link to="/gestioncliente" className="nav-btn"><i className="fas fa-users"> <FontAwesomeIcon icon={faPeopleGroup} /></i> Clientes</Link>
                <Link to="/gestionproductos" className="nav-btn"><FontAwesomeIcon icon={faBox} /><i className="fas fa-box"></i> Productos/Servicios</Link>
                <Link to="/gestioncatproceso" className="nav-btn"><i className="fas fa-cogs"><FontAwesomeIcon icon={faList} /></i> Categorías de Procesos</Link>
                <Link to="/gestionproveedor" className="nav-btn"><i className="fas fa-handshake"><FontAwesomeIcon icon={faTruck} /></i> Proveedores</Link>
                <Link to="/gestionmaterial" className="nav-btn"><i className="fas fa-boxes"><FontAwesomeIcon icon={faBriefcase} /></i>  Materiales</Link>
                {/* ERWIN <Link to="" className="nav-btn"><i className="fas fa-chart-line"><FontAwesomeIcon icon={faChartBar} /></i> Ventas</Link> */}
                {/* VANE */}<Link to="/gestionventas" className="nav-btn"><i className="fas fa-chart-line"><FontAwesomeIcon icon={faChartBar} /></i> Ventas</Link>
                <Link to="/generacionreportes" className="nav-btn"><i className="fas fa-file-alt"><FontAwesomeIcon icon={faClipboardList} /></i> Reportes</Link>
                <Link to="/generacioncotizaciones" className="nav-btn"><i className="fas fa-file-invoice"><FontAwesomeIcon icon={faFileInvoice} /> </i> Cotizaciones</Link>
                <Link to="/evidencias" className="nav-btn"><i className="fas fa-camera"><FontAwesomeIcon icon={faClipboardCheck} /></i> Evidencias de proyectos</Link>
                <a href="logout.html" className="nav-btn logout"><i className="fas fa-sign-out-alt"><FontAwesomeIcon icon={faSignOutAlt} /></i> Cerrar Sesión</a>

            </nav>
        </div>
    );
}

export default Nav;






