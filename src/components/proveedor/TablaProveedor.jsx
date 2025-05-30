import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AddProveedor from './AddProveedor';
import DeleteProveedor from './DeleteProveedor';
import EditProveedor from './EditProveedor';
import styles from './css/TablaProveedor.module.css'; // CSS Module

const TablaProveedor = () => {
    const [proveedores, setProveedores] = useState([]);

    const getproveedores = async () => {
        try {
            const url = 'http://localhost/bdinprosi/webservice/gestion/proveedores';
            const response = await axios.get(url, {
                headers: { 'Content-Type': 'application/json' }
            });
            setProveedores(response.data.proveedor);
            console.log('Se muestran datos de los proveedores correctamente en tabla');
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getproveedores();
    }, []);

    return (
        <div className={`${styles.card} card p-3 w-100 mt-5 container-fluid`}>
            <h2 className="text-center mb-4">Gestión de Proveedores</h2>
            <AddProveedor onSuccess={getproveedores} />
            <div className={`${styles.tableResponsive} table-responsive table-responsive-md`}>
                <table className="table table-bordered">
                    <thead className="table-danger">
                        <tr className="text-center">
                            <th className="bg-danger text-white">Proveedor</th>
                            <th className="bg-danger text-white d-none d-md-table-cell">Descripción</th>
                            <th className="bg-danger text-white">Teléfono</th>
                            <th className="bg-danger text-white d-none d-md-table-cell">Correo</th>
                            <th className="bg-danger text-white d-none d-lg-table-cell">Asesor de Ventas</th>
                            <th className="bg-danger text-white d-none d-lg-table-cell">Notas</th>
                            <th className="bg-danger text-white">Estatus</th>
                            <th className="bg-danger text-white">Estado</th>
                            <th className="bg-danger text-white">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {proveedores.length > 0 ? (
                            proveedores.map((proveedor) => (
                                <tr key={proveedor.id_prov} className="text-center">
                                    <td>{proveedor.nom_prov}</td>
                                    <td className="d-none d-md-table-cell">{proveedor.desc_prov}</td>
                                    <td>{proveedor.tel_prov}</td>
                                    <td className="d-none d-md-table-cell">{proveedor.email_prov}</td>
                                    <td className="d-none d-lg-table-cell">{proveedor.asesorv_prov}</td>
                                    <td className="d-none d-lg-table-cell">{proveedor.notas_prov}</td>
                                    <td>{proveedor.estatus_prov === '1' ? 'Activo' : 'Inactivo'}</td>
                                    <td>{proveedor.nom_est}</td>
                                    <td className="container-fluid d-flex">
                                        <EditProveedor
                                            proveedor={proveedor}
                                            id_prov={proveedor.id_prov}
                                            onSuccess={getproveedores}
                                        />
                                        <DeleteProveedor
                                            id_prov={proveedor.id_prov}
                                            onSuccess={getproveedores}
                                            estatus_prov={proveedor.estatus_prov}
                                        />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={10} className="text-center">No hay datos</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TablaProveedor;
