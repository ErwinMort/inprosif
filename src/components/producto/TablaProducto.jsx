/* Código combinado */
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import AddProducto from './AddProducto';
import DeleteProducto from './DeleteProducto';
import BajaPublicProd from './BajaPublicProd';
import EditProducto from './EditProducto';
import styles from './css/TablaProducto.module.css'; // Importa el CSS Module

const TablaProducto = () => {
    const [productos, setProductos] = useState([]);

    const getproductos = async () => {
        try {
            const url = "http://localhost/bdinprosi/webservice/gestion/productos";
            const response = await axios.get(url, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setProductos(response.data.producto);
            console.log('Se muestran los productos correctamente en la tabla');
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getproductos();
    }, []);

    return (
        <div className={`${styles.card} card p-3 w-100 mt-5 container-fluid`}>
            <h2 className="text-center mb-4">Gestión de Productos/Servicios</h2>
            <AddProducto onSuccess={getproductos} />
            <div className={`${styles.tableResponsive} table-responsive`}>
                <table className="table table-bordered">
                    <thead className="table-danger">
                        <tr className="text-center">
                            <th className="bg-danger text-white">Producto</th>
                            <th className="bg-danger text-white">Descripción</th>
                            <th className="bg-danger text-white">Foto</th>
                            <th className="bg-danger text-white">Estatus</th>
                            <th className="bg-danger text-white">Público</th>
                            <th className="bg-danger text-white">Proceso</th>
                            <th className="bg-danger text-white">Material</th>
                            <th className="bg-danger text-white">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        {productos.length > 0 ?
                            productos.map((producto) => (
                                <tr key={producto.id_prod}>
                                    <td>{producto.nom_prod}</td>
                                    <td>{producto.desc_prod}</td>
                                    <td>
                                        <img src={producto.img_prod} alt="Producto" width="50" className="img-fluid" />
                                    </td>
                                    <td>{producto.estatus_prod === '1' ? 'Activo' : 'Inactivo'}</td>
                                    <td>{producto.public_prod === '1' ? 'Público' : 'No Público'}</td>
                                    <td>{producto.nom_pco}</td>
                                    <td>{producto.nom_mat}</td>
                                    <td>
                                        <div className="d-flex justify-content-center">
                                            <EditProducto
                                                producto={producto}
                                                id_prod={producto.id_prod}
                                                onSuccess={getproductos}
                                            />
                                            <DeleteProducto
                                                id_prod={producto.id_prod}
                                                estatus_prod={producto.estatus_prod}
                                                onSuccess={getproductos}
                                            />
                                            <BajaPublicProd
                                                id_prod={producto.id_prod}
                                                estatus_prod={producto.estatus_prod}
                                                onSuccess={getproductos}
                                            />
                                        </div>
                                    </td>
                                </tr>
                            ))
                            : (
                                <tr>
                                    <td colSpan={9} className="text-center">No hay datos</td>
                                </tr>
                            )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TablaProducto;
