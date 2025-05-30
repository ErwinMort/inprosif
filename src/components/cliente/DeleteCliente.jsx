import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Button } from "react-bootstrap";
import axios from "axios";
import { deleteusuarioalta, deleteusuariobaja } from "../alertas";

const DeleteCliente = ({ id_us, onSuccess }) => {

    const alta_usuario = async () => {
        try {
            const url = `http://localhost/bdinprosi/webservice/gestion/alta_cliente/${id_us}`; 
            const response = await axios.post(url, {
                headers: { 'Content-Type' : 'application/json' }
            });

            if (response) {
                console.log('Alta de usuario exitosa');
                deleteusuarioalta();
                onSuccess();
            } else {
                console.log('Error al dar alta al usuario');
                alert('Error al dar alta al usuario');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const baja_usuario = async () => {
        try {
            const url = `http://localhost/bdinprosi/webservice/gestion/baja_cliente/${id_us}`;
            const response = await axios.post(url, {
                headers: { 'Content-Type' : 'application/json' }
            });

            if (response) {
                console.log('Baja de usuario exitosa');
                deleteusuariobaja();
                onSuccess();
            } else {
                console.log('Error al realizar baja del usuario');
                alert('Error al realizar baja del usuario');
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
                onClick={alta_usuario}
            >
                <i className="bi bi-check-circle"></i>
            </Button>
            <Button
                variant="outline-danger"
                onClick={baja_usuario}
            >
                <i className="bi bi-x-circle"></i>
            </Button>
        </div>
    );
};

export default DeleteCliente;
