import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Button } from "react-bootstrap";
import axios from "axios";
import { alertaglobal, altadobleprov, bajadobleprov, deleteproveedoralta, deleteproveedoraltaerror, deleteproveedorbaja, deleteproveedorbajaerror } from "../alertas";

const DeleteProveedor = ({id_prov,estatus_prov, onSuccess}) => {

    const alta_proveedor = async () => {
        if (estatus_prov === '1') {
            altadobleprov();
            return;
        }
        try {
            const url = `http://localhost/bdinprosi/webservice/gestion/alta_proveedor/${id_prov}`;
            const response = await axios.post(url, { 
                headers: { 'Content-Type' : 'application/json'}
            });
            if (response) {
                console.log('Alta de proveedor exitosa');
                deleteproveedoralta();
                onSuccess();
            } else {
                console.log('Error al realizar la alta de proveedor');
                deleteproveedoraltaerror();
            }
        } catch (error) {
            console.error(error);        
            console.log('Error al realizar petición');
            alertaglobal();
        }
    }

    const baja_proveedor = async () => {
        if (estatus_prov === '0') {
            bajadobleprov();
            return;
        }
        try {
            const url = `http://localhost/bdinprosi/webservice/gestion/baja_proveedor/${id_prov}`;
            const response = await axios.post(url, { 
                headers: { 'Content-Type' : 'application/json'}
            });
            if (response) {
                console.log('Baja de proveedor exitosa');
                deleteproveedorbaja();
                onSuccess();
            } else {
                console.log('Error al realizar la baja de proveedor');
                deleteproveedorbajaerror();
            }
        } catch (error) {
            console.error(error);
            console.log('Error al realizar petición');
            alertaglobal();
        }
    }
    
    return (
        <div className="container-fluid d-flex">
            <Button variant="outline-success" className="me-4" onClick={alta_proveedor}>
                <i className="bi bi-check-circle"></i>
            </Button>
            <Button variant="outline-danger" onClick={baja_proveedor}>
                <i className="bi bi-x-circle"></i>
            </Button>
        </div>
    );
}

export default DeleteProveedor;