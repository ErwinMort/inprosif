import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Button } from "react-bootstrap";
import axios from "axios";
import { altadoble, bajadoble, deleteproductoalta, deleteproductobaja } from "../alertas";

const DeleteProducto = ({ id_prod, onSuccess, estatus_prod }) => {

    const alta_producto = async () => {
        if (estatus_prod === "1") {
            altadoble();
            return; 
        }

        try {
            const url = `http://localhost/bdinprosi/webservice/gestion/alta_producto/${id_prod}`;
            const response = await axios.post(url, {
                headers: { 'Content-Type': 'application/json' }
            });

            if (response) {
                console.log('Alta de producto exitosa');
                deleteproductoalta();
                onSuccess();
            } else {
                console.log('Error al dar alta al producto');
                alert('Error al dar alta al producto');
            }
        } catch (error) {
            console.error(error);
        }
    }

    const baja_producto = async () => {
        if (estatus_prod === "0") {
            bajadoble();
            return; 
        }

        try {
            const url = `http://localhost/bdinprosi/webservice/gestion/baja_producto/${id_prod}`;
            const response = await axios.post(url, {
                headers: { 'Content-Type': 'application/json' }
            });

            if (response) {
                console.log('Baja de producto exitosa');
                deleteproductobaja();
                onSuccess();
            } else {
                console.log('Error al realizar baja del producto');
                alert('Error al realizar baja del producto');
            }
        } catch (error) {
            console.error(error);
            console.log('Fallo al realizar la petición');
        }
    };

    return (
        <div className="container-fluid d-flex justify-content-center gap-2 flex-wrap">
            <Button
                variant="outline-success"
                onClick={alta_producto}
            >
                <i className="bi bi-check-circle"></i>
            </Button>
            <Button
                variant="outline-danger"
                onClick={baja_producto}
            >
                <i className="bi bi-x-circle"></i>
            </Button>
        </div>
    );
};

export default DeleteProducto;
