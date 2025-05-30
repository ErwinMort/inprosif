/* Código combinado */
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import {
  publicalta,
  publicaltaerror,
  publicbaja,
  publicbajaerror,
  publicoaltadoble,
  publicobajadoble
} from '../alertas';

const BajaPublicProd = ({ id_prod, estatus_prod, onSuccess }) => {

  const public_prod_v1 = async () => {
    if (estatus_prod === '1') {
      // Ya está público, no repetir
      publicoaltadoble();
      return;
    }

    try {
      const url = `http://localhost/bdinprosi/webservice/gestion/public_producto_v1/${id_prod}`;
      const response = await axios.post(url, null, {
        headers: { 'Content-Type': 'application/json' }
      });

      if (response) {
        console.log('Estado del producto cambió a público');
        publicalta();
        onSuccess();
      } else {
        console.log('No se pudo cambiar el estado público del producto');
        publicaltaerror();
      }
    } catch (error) {
      console.error(error);
      publicaltaerror();
    }
  };

  const public_prod_v2 = async () => {
    if (estatus_prod === '0') {
      // Ya no es público, no repetir
      publicobajadoble();
      return;
    }

    try {
      const url = `http://localhost/bdinprosi/webservice/gestion/public_producto_v2/${id_prod}`;
      const response = await axios.post(url, null, {
        headers: { 'Content-Type': 'application/json' }
      });

      if (response) {
        console.log('Estado del producto cambió a no público');
        publicbaja();
        onSuccess();
      } else {
        console.log('No se pudo cambiar el estado a no público del producto');
        publicbajaerror();
      }
    } catch (error) {
      console.error(error);
      publicbajaerror();
    }
  };

  return (
    <div className="container-fluid d-flex justify-content-center gap-2 flex-wrap">
      <Button
        variant="outline-success"
        onClick={public_prod_v1}
        className="d-flex align-items-center justify-content-center"
        style={{ minWidth: '45px', minHeight: '45px' }}
      >
        <i className="bi bi-bell"></i>
      </Button>

      <Button
        variant="outline-danger"
        onClick={public_prod_v2}
        className="d-flex align-items-center justify-content-center"
        style={{ minWidth: '45px', minHeight: '45px' }}
      >
        <i className="bi bi-bell-slash"></i>
      </Button>
    </div>
  );
};

export default BajaPublicProd;
