import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Button } from "react-bootstrap";
import axios from "axios";
import { alertaglobal, estatusiniciar, estatuscancelada, estatusfinalizada, estatusproceso } from "../alertas";

const DeleteVenta = ({num_vta, onSuccess}) => {

    const iniciar_venta = async () => {
        try {
            const url = `http://localhost/bdinprosi/webservice/gestion/venta_sin_iniciar/${num_vta}`;
            const response = await axios.post(url, {
                headers: { 'Content-Type': 'application/json' }
            });
            if (response) {
                console.log('Venta marcada como "Iniciada"');
                estatusiniciar();
                onSuccess();
            } else {
                console.log('Error al cambiar el estatus a "Iniciada"');
            }
        } catch (error) {
            console.error(error);
            alertaglobal();
        }
    };

    const proceso_venta = async () => {
        try {
            const url = `http://localhost/bdinprosi/webservice/gestion/venta_en_proceso/${num_vta}`;
            const response = await axios.post(url, {
                headers: { 'Content-Type': 'application/json' }
            });
            if (response) {
                console.log('Venta marcada como "En proceso"');
                estatusproceso();
                onSuccess();
            } else {
                console.log('Error al cambiar el estatus a "En proceso"');
            }
        } catch (error) {
            console.error(error);
            alertaglobal();
        }
    };

    const finalizada_venta = async () => {
        try {
            const url = `http://localhost/bdinprosi/webservice/gestion/venta_finalizada/${num_vta}`;
            const response = await axios.post(url, {
                headers: { 'Content-Type': 'application/json' }
            });
            if (response) {
                console.log('Venta marcada como "Finalizada"');
                estatusfinalizada();
                onSuccess();
            } else {
                console.log('Error al cambiar el estatus a "Finalizada"');
            }
        } catch (error) {
            console.error(error);
            alertaglobal();
        }
    };

    const cancelada_venta = async () => {
        try {
            const url = `http://localhost/bdinprosi/webservice/gestion/venta_cancelada/${num_vta}`;
            const response = await axios.post(url, {
                headers: { 'Content-Type': 'application/json' }
            });
            if (response) {
                console.log('Venta marcada como "Cancelada"');
                estatuscancelada();
                onSuccess();
            } else {
                console.log('Error al cambiar el estatus a "Cancelada"');
            }
        } catch (error) {
            console.error(error);
            alertaglobal();
        }
    };
    
    
    return (
        <div className="container-fluid d-flex justify-content-around">
            <Button variant="outline-secondary" onClick={iniciar_venta}>
                <i className="bi bi-circle"></i> Iniciar
            </Button>
            <Button variant="outline-primary" onClick={proceso_venta}>
                <i className="bi bi-hourglass-split"></i> En Proceso
            </Button>
            <Button variant="outline-success" onClick={finalizada_venta}>
                <i className="bi bi-check-circle"></i> Finalizar
            </Button>
            <Button variant="outline-danger" onClick={cancelada_venta}>
                <i className="bi bi-x-circle"></i> Cancelar
            </Button>
        </div>
    );
}

export default DeleteVenta;
