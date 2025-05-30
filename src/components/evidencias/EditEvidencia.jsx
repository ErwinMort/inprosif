import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Button, Modal, Form } from 'react-bootstrap';
import { useState } from 'react';
import { alertaglobal, updateevidenciasuccess } from '../alertas';
import axios from 'axios';

const EditEvidencia = ({ evidencia, id_evid, onSuccess }) => {
    const [show, setShow] = useState(false);
    const OpenModal = () => setShow(true);
    const CloseModal = () => setShow(false);
    const [evidencias, setEvidencias] = useState({
        id_clie: evidencia.id_clie || '',
        id_prod: evidencia.id_prod || '',
        img_evid: evidencia.img_evid || ''
    });

    const update_evidencia = async (e) => {
        e.preventDefault();
        try {
            const url = `http://localhost/bdinprosi/webservice/gestion/update_evidencia/${id_evid}`;
            const response = await axios.post(url, evidencias, {
                headers: { 'Content-Type' : 'application/json' }
            });
            setEvidencias(response.data);
            onSuccess();
            CloseModal();
            console.log('Evidencia actualizada corretamente');
        } catch (error) {
            console.error(error);
            console.log('Error al realizar petición');
            alertaglobal();
        }
    }

    const Change = (e) => {
        const { name, value } = e.target;
        setEvidencias(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    return (
        <div>
            <Button variant='outline-warning' onClick={OpenModal}>
                <i class="bi bi-pencil-square"></i>
            </Button>
            <Modal show={show} onHide={CloseModal} >
                <Modal.Header closeButton>
                    <Modal.Title>Actualizar Evidencia</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={update_evidencia}>
                        <Form.Group controlId='id_clie'>
                            <Form.Label>Cliente: </Form.Label>
                            <Form.Control
                                name='id_clie'
                                readOnly
                                value={evidencia.nom_clie}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='id_prod'>
                            <Form.Label>Producto/Servicio:</Form.Label>
                            <Form.Control
                                name='id_prod'
                                readOnly
                                value={evidencia.nom_prod}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='img_evid'>
                            <Form.Label>Imagen Nueva:</Form.Label>
                            <Form.Control
                                name='img_evid'
                                type='file'
                                onChange={Change}
                            ></Form.Control>
                        </Form.Group>

                        <Button type='submit' variant='primary' className='mt-3'>
                            Actualizar Evidencia
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default EditEvidencia;