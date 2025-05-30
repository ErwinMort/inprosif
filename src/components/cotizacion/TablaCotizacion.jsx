import { Link } from 'react-router-dom';
import styles from './css/TablaCotizacion.module.css';
import { useState, useEffect } from 'react';
import { alertaglobal } from '../alertas';
import axios from 'axios';
import UpdateCot from './UpdateCot'; 

const TablaCotizacion = () => { 
    const [cotizaciones, setCotizaciones] = useState([]);

    const get_cotizacion = async () => {
        try {
            const url = 'http://localhost/bdinprosi/webservice/gestion/get_cotizacion'; 
            const response = await axios.get(url);
            setCotizaciones(response.data.cotizacion);
        } catch (error) {
            console.error(error);
            alertaglobal();
        }
    };

    useEffect(() => {
        get_cotizacion();
    }, []);

    return (
        <div className={styles.card}>
            {/* Encabezado con título y botón */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold mb-0">Gestión de Cotizaciones</h2>
               
            </div>
            
            <div className='d-flex mb-3'>
            <Link 
                    to="/generar-cotizacion" 
                    className="btn btn-success"
                >
                    <i className="bi bi-plus-square me-2"></i>
                    Nueva Cotización
                </Link>
            </div>

            <div className={styles.tableResponsive}>
                <table className={`table table-bordered ${styles.table}`}>
                    <thead>
                        <tr>
                            <th>No°</th>
                            <th>Cliente</th>
                            <th>Producto</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cotizaciones.length > 0 ? (
                            cotizaciones.map((cotizacion) => (
                                <tr key={cotizacion.id_cot}>
                                    <td>{cotizacion.id_cot}</td>
                                    <td>{cotizacion.nom_clie}</td>
                                    <td>{cotizacion.nom_prod}</td>
                                    <td className={styles.actions}>
                                        <UpdateCot
                                            id_cot={cotizacion.id_cot}
                                            cotizacion={cotizacion}
                                            onSuccess={get_cotizacion}
                                        />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className="text-center">No hay datos</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TablaCotizacion;

/* import { Link } from 'react-router-dom'; // Importa Link
import styles from './css/TablaCotizacion.module.css';
import EditCot from './EditCot';
import { useState, useEffect } from 'react';
import { alertaglobal } from '../alertas';
import axios from 'axios';
import UpdateCot from './UpdateCot'; 

const TablaCotizacion = () => { 
    const [cotizaciones, setCotizaciones] = useState([]);

    const get_cotizacion = async () => {
        try {
            const url = 'http://localhost/bdinprosi/webservice/gestion/get_cotizacion'; 
            const response = await axios.get(url);
            setCotizaciones(response.data.cotizacion);
        } catch (error) {
            console.error(error);
            alertaglobal();
        }
    };

    useEffect(() => {
        get_cotizacion();
    }, []);

    return (
        <div className={styles.card}>
            <h2 className="text-center fw-bold">Gestión de Cotizaciones</h2>
            <div className={styles.tableResponsive}>
                <table className={`table table-bordered ${styles.table}`}>
                    <thead>
                        <tr>
                            <th>No°</th>
                            <th>Cliente</th>
                            <th>Producto</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cotizaciones.length > 0 ? (
                            cotizaciones.map((cotizacion) => (
                                <tr key={cotizacion.id_cot}>
                                    <td>{cotizacion.id_cot}</td>
                                    <td>{cotizacion.nom_clie}</td>
                                    <td>{cotizacion.nom_prod}</td>
                                    <td className={styles.actions}>
                                        {/* Botón de edición (UpdateCot) *
                                        <UpdateCot
                                            id_cot={cotizacion.id_cot}
                                            cotizacion={cotizacion}
                                            onSuccess={get_cotizacion}
                                        />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="text-center">No hay datos</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TablaCotizacion;
 */