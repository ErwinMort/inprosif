import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Button, Modal, Form } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { alertaglobal, editproveedorsuccess, editproveedorerror } from '../alertas';


const EditProveedor = ({proveedor, id_prov, onSuccess}) => {
    const [show, setShow] = useState(false);
    const [estados, setEstados] = useState([]);
    const [proveedores, setProveedores] = useState({
        nom_prov: proveedor.nom_prov || '',
        desc_prov: proveedor.desc_prov || '',
        tel_prov: proveedor.tel_prov || '',
        email_prov: proveedor.email_prov || '',
        asesorv_prov: proveedor.asesorv_prov || '',
        notas_prov: proveedor.notas_prov  || '',
        cve_est: proveedor.cve_est || ''
    });

    const OpenModal = () => setShow(true);
    const CloseModal = () => setShow(false);
    
    const update_proveedor = async (event) => {
        event.preventDefault();
        try {
            const url = `http://localhost/bdinprosi/webservice/gestion/update_proveedor/${id_prov}`;
            const response = await axios.post(url, proveedores, {
                headers: { 'Content-Type' : 'application'}
            });

            if (response) {
                console.log('Actualización de proveedor correctamente');
                editproveedorsuccess();
                onSuccess();
                setProveedores(response.data);
                CloseModal();
            } else {
                console.log('Error al actualizar material');
                editproveedorerror();
                setProveedores(response.data);
                CloseModal();
            }
        } catch (error) {
            console.error(error);
            console.log('Error al realizar petición');
            alertaglobal();
        }
    }

    const get_estado = async () => {
        try {
            const url = 'http://localhost/bdinprosi/webservice/gestion/get_nom_est';    
            const response = await axios.get(url, {
                headers: { 'Content-Type': 'application/json' }
            });
 
            setEstados(response.data.estado);
            console.log('Se muestran nombres de estado correctamente');
        } catch (error) {
            console.error(error);
            console.log('Error al realizar la petición'); 
        }
    }

    const Change = (e) => {
        const { name, value } = e.target;
        setProveedores(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    useEffect(() => {
        get_estado();
    }, []);

    return (
        <div className='container-fluid'>
            <Button variant='outline-warning' onClick={OpenModal}>
                <i class="bi bi-pencil-square"></i>
            </Button>

            <Modal show={show} onHide={CloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Datos del Proveedor</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={update_proveedor}>
                        <div className='d-flex align-items-center justify-content-around'>
                            <Form.Group controlId='nom_prov'>
                                <Form.Label>Nombre de Proveedor: </Form.Label>
                                <Form.Control
                                    type='text'
                                    name='nom_prov'
                                    placeholder='Nombre del proveedor'
                                    value={proveedores.nom_prov}
                                    onChange={Change}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='desc_prov'>
                                <Form.Label>Descripción de Proveedor: </Form.Label>
                                <Form.Control
                                    type='text'
                                    name='desc_prov'
                                    placeholder='Descripción del proveedor'
                                    value={proveedores.desc_prov}
                                    onChange={Change}
                                ></Form.Control>
                            </Form.Group>
                        </div>
                        <div className='d-flex align-items-center justify-content-around mt-2'>
                            <Form.Group controlId='tel_prov'>
                                <Form.Label>Teléfono de Proveedor: </Form.Label>
                                <Form.Control
                                    type='text'
                                    name='tel_prov'
                                    placeholder='Teléfono del proveedor'
                                    value={proveedores.tel_prov}
                                    onChange={Change}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='email_prov'>
                                <Form.Label>Correo de Proveedor: </Form.Label>
                                <Form.Control
                                    type='text'
                                    name='email_prov'
                                    placeholder='Correo del proveedor'
                                    value={proveedores.email_prov}
                                    onChange={Change}
                                ></Form.Control>
                            </Form.Group>
                        </div>
                        <div className='d-flex align-items-center justify-content-around mt-2'>
                            <Form.Group controlId='asesorv_prov'>
                                <Form.Label>Asesor de Ventas: </Form.Label>
                                <Form.Control
                                    type='text'
                                    name='asesorv_prov'
                                    placeholder='Asesor del proveedor'
                                    value={proveedores.asesorv_prov}
                                    onChange={Change}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='notas_prov' className=''>
                                <Form.Label>Notas de Proveedor: </Form.Label>
                                <Form.Control
                                    type='text'
                                    name='notas_prov'
                                    placeholder='Notas adicionales proveedor'
                                    value={proveedores.notas_prov}
                                    onChange={Change}
                                ></Form.Control>
                            </Form.Group>
                        </div>
                        <div className='me-3 ms-3 mt-2'>
                            
                            <Form.Group controlId='cve_est' className=''>
                                <Form.Label>Estado de Proveedor: </Form.Label>
                                <Form.Control
                                    as='select'
                                    name='cve_est'
                                    placeholder='Estado del proveedor'
                                    value={proveedores.cve_est}
                                    onChange={Change}
                                >
                                    <option value=''>Selecciona el estado</option>
                                    {estados.map((estado) => (
                                        <option key={estado.cve_est} value={estado.cve_est}>
                                            {estado.nom_est}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                        </div>

                        <div className='d-flex align-items-center justify-content-between mt-3 me-3 ms-3'>
                            <Button variant='secondary' onClick={CloseModal}>Cancelar</Button>
                            <Button variant='primary' type='submit'>Guardar Cambios</Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default EditProveedor;