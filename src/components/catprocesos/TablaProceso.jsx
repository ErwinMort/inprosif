import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import AddProceso from './AddProceso';
import DeleteProceso from './DeleteProceso';
import EditProceso from './EditProceso';

const TablaProceso  = () => {
    const [procesos, setProcesos] = useState([]);

    const get_proceso = async () => {
        try {
            const url = 'http://localhost/bdinprosi/webservice/gestion/proceso';
            const response = await axios.get(url, {
                headers: { 'Content-Type' : 'application/json' }
            });

            setProcesos(response.data.material);
            console.log('Datos en tabla vizualizados correctamente');
        } catch (error) {
            console.error(error);
            console.log('Error al obtener datos');
        }
    }

    useEffect(() => {
        get_proceso();
    }, [])
     
    return (
        <div className="card p-3 w-100 mt-5">
            <h2 className='text-center text-bold'>Gestión de Categorias de Procesos</h2>
            <AddProceso onSuccess={get_proceso}/>
            <div className="table-responsive">
                <table className="table table-bordered">
                    <thead className="table-danger">
                        <tr className="text-center">
                        <th className="bg-danger text-white">Proceso</th>
                            <th className="bg-danger text-white">Descripción</th>
                            <th className="bg-danger text-white">Características</th>
                            <th className="bg-danger text-white">Alcance</th>
                            <th className="bg-danger text-white">Otro</th>
                            <th className="bg-danger text-white">Proveedor</th>
                            <th className="bg-danger text-white">Estatus</th>
                            <th className="bg-danger text-white">Fecha</th>
                            <th className="bg-danger text-white">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {procesos.length > 0 ?
                            procesos.map((proceso) => (
                                <tr  key={proceso.id_pco}>
                                <td>{proceso.nom_pco}</td>
                                <td>{proceso.desc_pco}</td>
                                <td>{proceso.caract_pco}</td>
                                <td>{proceso.alcance_pco}</td>
                                <td>{proceso.otro_pco}</td>
                                <td>{proceso.nom_prov}</td>
                                <td>{proceso.estatus_pco === '1' ? 'Activo' : 'Inactivo'}</td>
                                <td>{new Date(proceso.fecha_pco).toLocaleString()}</td>
                                    <td className="d-flex align-items-center justify-content-center">
                                        <EditProceso proceso={proceso} id_pco={proceso.id_pco} onSuccess={get_proceso}/>
                                        <DeleteProceso id_pco={proceso.id_pco} onSuccess={get_proceso}/>
                                    </td>
                                </tr>
                            ))
                            : (
                                <tr>
                                    <td colSpan={10} className="text-center">No hay datos</td>
                                </tr>
                            )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TablaProceso ;
