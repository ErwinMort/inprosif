import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Button, Modal, Form } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';
import { alertaglobal, editventaerror, editventasuccess } from '../alertas';


const EditVenta = ({ venta, num_vta, onSuccess }) => {
    const [show, setShow] = useState(false);
    const OpenModal = () => setShow(true);
    const CloseModal = () => setShow(false);
    const [ventas, setVentas] = useState({
        nom_clie: venta.nom_clie || '',
        nom_prod: venta.nom_prod || '',
        unidad_vta: venta.unidad_vta || '',
        costop_vta: venta.costop_vta || '',
        fecha_vta: venta.fecha_vta || '',
        fechafin_vta: venta.fechafin_vta || ''
    });

    const update_ventas = async (event) => {
        event.preventDefault();
        try {
            const url = `http://localhost/bdinprosi/webservice/gestion/update_ventas/${num_vta}`;
            const response = await axios.post(url, ventas, {
                headers: { 'Content-Type' : 'application/json'}
            });

            if (response) {
                setVentas(response.data);
                console.log('Venta actualizada correctamente');
                editventasuccess();
                onSuccess();
                CloseModal();   
            } else {
                console.log('No se puedo actualizar la venta');
                editventaerror();
            }
        } catch (error) {
            console.error(error);
            console.log('Error al realizar la petición');
            alertaglobal();
        }
    }

    const Change = (e) => {
        const { name, value } = e.target;
        setVentas(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
    
    return(
        <div className='container-fluid'>
            <Button variant='outline-warning' onClick={OpenModal}>
                <i class="bi bi-pencil-square"></i>
            </Button>


            <Modal show={show} onHide={CloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title style={{ fontWeight: 'bold' }}>Editar Datos de Venta</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={update_ventas}>
                        <div className="mb-2">
                            <Form.Group>
                                <Form.Label>Cliente: </Form.Label>
                                <Form.Control
                                    name='id_clie'
                                    value={ventas.nom_clie}
                                    readOnly
                                ></Form.Control>
                            </Form.Group>
                        </div>
                        <div className="mb-2">
                            <Form.Group>
                                <Form.Label>Producto: </Form.Label>
                                <Form.Control
                                    name='id_prod'
                                    value={ventas.nom_prod}
                                    readOnly
                                ></Form.Control>
                            </Form.Group>
                        </div>
                        <div className="mb-2">
                            <Form.Group>
                                <Form.Label>Unidad: </Form.Label>
                                <Form.Control
                                    name='unidad_vta'
                                    type='number'
                                    value={ventas.unidad_vta}
                                    onChange={Change}
                                ></Form.Control>
                            </Form.Group>
                        </div>
                        <div className="mb-2">
                            <Form.Group>
                                <Form.Label>Costo de proyecto: </Form.Label>
                                <Form.Control
                                    name='costop_vta'
                                    type='number'
                                    value={ventas.costop_vta}
                                    onChange={Change}
                                ></Form.Control>
                            </Form.Group>
                        </div>
                        <div className="mb-2">
                            <Form.Group>
                                <Form.Label>Fecha Inicio: </Form.Label>
                                <Form.Control
                                    name='fecha_vta'
                                    value={ventas.fecha_vta}
                                    readOnly
                                ></Form.Control>
                            </Form.Group>
                        </div>
                        <div className="mb-2">
                            <Form.Group>
                                <Form.Label>Fecha Fin: </Form.Label>
                                <Form.Control
                                    name='fechafin_vta'
                                    value={ventas.fechafin_vta}
                                    onChange={Change}
                                    type='date'
                                ></Form.Control>
                            </Form.Group>
                        </div>
                        <div className='d-flex align-items-center justify-content-between mt-2'>
                            <Button variant='secondary' onClick={CloseModal}>Cancelar</Button>
                            <Button variant='primary' type='submit'>Guardar Cambios</Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default EditVenta;