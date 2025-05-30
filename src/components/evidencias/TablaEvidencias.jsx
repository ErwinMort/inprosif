import { useState, useEffect } from 'react';
import axios from 'axios';
import GenEvidencias from './GenEvidencias';
import styles from './css/TablaEvidencias.module.css'; // Importa el archivo CSS Module

const TablaEvidencias = () => { 
    const [evidencias, setEvidencias] = useState([]);

    const get_evidencia = async () => {
        try {
            const url = 'http://localhost/bdinprosi/webservice/gestion/get_evidencias';
            const response = await axios.get(url);
            setEvidencias(response.data.evidencia);
            console.log('Datos en tabla visualizados correctamente');
        } catch (error) {
            console.error(error);
            console.log('Error al obtener datos');
        }
    }

    useEffect(() => {
        get_evidencia();
    }, []);

    return (
        <div className={`${styles.card} w-100 mt-5 container-fluid`}>
            <h2 className={`${styles.title} text-center mb-4`}>Gestión de Evidencias</h2>
            <div className="table-responsive">
                <GenEvidencias onSuccess={get_evidencia} />
                <table className={`table table-bordered ${styles.table}`}>
                    <thead className="table-danger">
                        <tr className="text-center">
                            <th className="bg-danger text-white">Cliente</th>
                            <th className="bg-danger text-white">Producto</th>
                            <th className="bg-danger text-white">Cotización</th>
                            <th className="bg-danger text-white">Estatus</th>
                        </tr>
                    </thead>
                    <tbody>
                        {evidencias.length > 0 ? 
                            evidencias.map((evidencia) => (
                                <tr key={evidencia.id_evid} className="text-center">
                                    <td>{evidencia.nom_clie}</td>
                                    <td>{evidencia.nom_prod}</td>
                                    <td>{evidencia.id_cot}</td>
                                    <td>{evidencia.estatus_evid}</td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={6} className="text-center">No hay datos</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TablaEvidencias;
