import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AddVentas from './AddVenta';
import EditVenta from './EditVenta';
import DeleteVenta from './DeleteVenta';

const TablaVentas = () => {
    const [ventas, setVentas] = useState([]);

    const get_ventas = async () => {
        try {
            const url = 'http://localhost/bdinprosi/webservice/gestion/ventas';
            const response = await axios.get(url, {
                headers: { 'Content-Type' : 'application/json' }
            });
            setVentas(response.data.venta);
            console.log('Datos de ventas cargados correctamente');
        } catch (error) {
            console.error(error);
            console.log('Error al realizar la petición');
        }
    };

    // Función para convertir el estatus numérico a texto
const getEstatusTexto = (estatus) => {
    switch (estatus) {
        case '0':
            return 'Sin iniciar';
        case '1':
            return 'En proceso';
        case '2':
            return 'Finalizada';
        case '3':
            return 'Cancelada';
        default:
            return 'Desconocido';
    }
};


    useEffect(() => {
        get_ventas();
    }, []);
     
    return (
        <div className="card p-3 w-100 mt-5 container-fluid">
            <h2 className='text-center mb-4' style={{ fontWeight: 'bold' }}>Gestión de Ventas</h2>
            <AddVentas onSuccess={get_ventas} />
            <div className="table-responsive table-responsive-md">
                <table className="table table-bordered">
                    <thead className="table-danger">
                        <tr className="text-center">
                            <th className="bg-danger text-white">Cliente</th>
                            <th className="bg-danger text-white">Producto</th>
                            <th className="bg-danger text-white">Unidad</th>
                            <th className="bg-danger text-white d-none d-md-table-cell">Costo de Proyecto</th>
                            <th className="bg-danger text-white d-none d-md-table-cell">Fecha Inicio</th>
                            <th className="bg-danger text-white d-none d-lg-table-cell">Fecha Fin</th>
                            <th className="bg-danger text-white">Estatus</th>
                            <th className="bg-danger text-white d-none d-md-table-cell">Pago Total</th>
                            <th className="bg-danger text-white d-none d-md-table-cell">Cantidad</th>
                            <th className="bg-danger text-white d-none d-md-table-cell">Precio Unitario</th>
                            <th className="bg-danger text-white">Acciones</th>
                        </tr>
                    </thead>
                    <tbody> 
                        {ventas.length > 0 ? 
                            ventas.map((venta) => (
                                <tr key={venta.num_vta} className="text-center">
                                    <td>{venta.nom_clie}</td>
                                    <td>{venta.nom_prod}</td>
                                    <td>{venta.unidad_vta}</td>
                                    <td>{venta.costop_vta}</td>
                                    <td>{venta.fecha_vta}</td>
                                    <td>{venta.fechafin_vta}</td>
                                    <td>{getEstatusTexto(venta.estatus_vta)}</td> {/* Estatus traducido */}
                                    <td>{venta.pagtot_dta}</td> {/* Pago Total */}
                                    <td>{venta.cant_dta}</td> {/* Cantidad */}
                                    <td>{venta.precuni_dta}</td> {/* Precio Unitario */}
                                    <td className="container-fluid d-flex">
                                        <EditVenta venta={venta} num_vta={venta.num_vta} onSuccess={get_ventas} />
                                        <DeleteVenta num_vta={venta.num_vta} onSuccess={get_ventas} />
                                    </td>
                                </tr>
                            )) 
                            : (
                                <tr>
                                    <td colSpan={11} className="text-center">No hay datos</td>
                                </tr>
                            )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TablaVentas;
