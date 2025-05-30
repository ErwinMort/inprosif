/* UNIFICADO de los 2 codigos */
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import AddMaterial from './AddMaterial';
import DeleteMaterial from './DeleteMaterial';
import EditMaterial from './EditMaterial';

const TablaMaterial = () => {
    const [materiales, setMateriales] = useState([]);

    const get_material = async () => {
        try {
            const url = 'http://localhost/bdinprosi/webservice/gestion/materiales';
            const response = await axios.get(url, {
                headers: { 'Content-Type': 'application/json' }
            });
            setMateriales(response.data.material);
            console.log('Datos en tabla visualizados correctamente');
        } catch (error) {
            console.error(error);
            console.log('Error al obtener datos');
        }
    };

    useEffect(() => {
        get_material();
    }, []);

    return (
        <div className="card p-4 mt-4 w-100">
            <h2 className="text-center fw-bold mb-4">Gestión de Materiales</h2>
            <AddMaterial onSuccess={get_material} />
            <div className="table-responsive mt-3">
                <table className="table table-bordered table-striped text-center">
                    <thead className="table-danger">
                        <tr>
                            <th>Material</th>
                            <th>Descripción</th>
                            <th>Notas</th>
                            <th>Estatus</th>
                            <th>Proveedor</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {materiales.length > 0 ? (
                            materiales.map((material) => (
                                <tr key={material.id_mat}>
                                    <td>{material.nom_mat}</td>
                                    <td>{material.desc_mat}</td>
                                    <td>{material.notas_mat}</td>
                                    <td>{material.estatus_mat === '1' ? 'Activo' : 'Inactivo'}</td>
                                    <td>{material.nom_prov}</td>
                                    <td className="d-flex justify-content-center gap-2">
                                        <EditMaterial 
                                            material={material} 
                                            id_mat={material.id_mat} 
                                            onSuccess={get_material} 
                                        />
                                        <DeleteMaterial 
                                            id_mat={material.id_mat} 
                                            onSuccess={get_material} 
                                            estatus_mat={material.estatus_mat}
                                        />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="text-center">No hay datos</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TablaMaterial;
