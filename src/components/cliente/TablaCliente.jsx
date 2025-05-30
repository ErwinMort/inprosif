import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import AddCliente from './AddCliente';
import DeleteCliente from './DeleteCliente';

const TablaCliente = () => {
    const [clientes, setCliente] = useState([]);

    // Fetch client data from the API
    const getclientes = async () => {
        try {
            const url = "http://localhost/bdinprosi/webservice/gestion/clientes";
            const response = await axios.get(url, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.data.Status === 'Success') {
                setCliente(response.data.clientes);  // Set the clients in state
                console.log('Se muestran los Clientes correctamente en la tabla');
            } else {
                console.error('Error al obtener clientes:', response.data.Mensaje);
            }
        } catch (error) {
            console.error('Error al hacer la solicitud:', error);
        }
    };

    useEffect(() => {
        getclientes();
    }, []);

    return (
        <div className="card p-3 w-100 mt-5 container-fluid">
            <h2 className="text-center">Gestión de Clientes</h2>
            <div className="table-responsive">
                <table className="table table-bordered">
                    <thead className="table-danger">
                        <tr className="text-center">
                            <th className="bg-danger text-white">Nombre Cliente</th>
                            <th className="bg-danger text-white">Teléfono</th>
                            <th className="bg-danger text-white">Colonia</th>
                            <th className="bg-danger text-white">Código Postal</th>
                            <th className="bg-danger text-white">Dirección</th>
                            <th className="bg-danger text-white">Email Usuario</th>
                            <th className="bg-danger text-white">Contraseña Usuario</th>
                            <th className="bg-danger text-white">Tipo Usuario</th>
                            <th className="bg-danger text-white">Sesion Usuario</th>
                            <th className="bg-danger text-white">Estatus Usuario</th>
                            <th className="bg-danger text-white">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
    {clientes.length > 0 ? 
        clientes.map((cliente) => (
            <tr key={cliente.id_clie}>
                <td>{cliente.nom_clie}</td>
                <td>{cliente.tel_clie}</td>
                <td>{cliente.col_clie}</td>
                <td>{cliente.cp_clie}</td>
                <td>{cliente.dir_clie}</td>
                <td>{cliente.email_us}</td>
                <td>{cliente.pass_us}</td> {/* Mostrar contraseña */}
                <td>{cliente.tipo_us === '0' ? 'Admin' : 'Cliente'}</td>
                <td>{cliente.sesion_us === '1' ? 'Activo' : 'Inactivo'}</td> {/* Mostrar sesion */}
                <td>{cliente.estatus_us === '1' ? 'Activo' : 'Inactivo'}</td>
                <td>
                    <div className="d-flex justify-content-center">
                    <DeleteCliente id_us ={cliente.id_us} onSuccess={getclientes} />
                    </div>
                </td>
            </tr>
        ))
        : (
            <tr>
                <td colSpan={11} className="text-center">No hay datos</td>
            </tr>
        )
    }
</tbody>

                </table>
            </div>
        </div>
    );
};

export default TablaCliente;
