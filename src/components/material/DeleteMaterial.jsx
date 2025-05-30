import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { alertaglobal, altadoblemat, bajadoblemat, deletematerialalta, deletematerialaltaerror, deletematerialbaja, deletematerialbajaerror } from '../alertas';

const DeleteMaterial =  ({id_mat, onSuccess, estatus_mat}) => {

    const alta_material = async () => {
        if (estatus_mat === '1') {
            altadoblemat();
            return;
        }

        try {
            const url = `http://localhost/bdinprosi/webservice/gestion/alta_material/${id_mat}`;
            const response = await axios.post(url, {
                headers: {'Content-Type' : 'application/json'}
            });

            if (response) {
                console.log('Alta exitosa del material');
                deletematerialalta();
                onSuccess();
            } else {
                console.log('Fallo la Alta del material');
                deletematerialaltaerror();
            }
        } catch (error) {
            console.error(error);
            console.log('Fallo al realizar la petición');
            alertaglobal();
        }
    }

    const baja_material = async () => {
        if (estatus_mat === '0') {
            bajadoblemat();
            return;
        }

        try {
            const url = `http://localhost/bdinprosi/webservice/gestion/baja_material/${id_mat}`;
            const response = await axios.post(url, {
                headers: {'Content-Type' : 'application/json'}
            });

            if (response) {
                console.log('Baja exitosa del material');
                onSuccess();
                deletematerialbaja();
            } else {
                console.log('Fallo la Baja del material');
                deletematerialbajaerror();
            }
        } catch (error) {
            console.error(error);
            console.log('Fallo al realizar la petición');
            alertaglobal();
        }
    }

    return(
        <div className="ms-2">
            <Button variant="outline-success" onClick={alta_material} className="me-2">
                <i className="bi bi-check-circle"></i>
            </Button>
            <Button variant="outline-danger" onClick={baja_material}>
                <i className="bi bi-x-circle"></i>
            </Button>
        </div>
    );
}

export default DeleteMaterial;