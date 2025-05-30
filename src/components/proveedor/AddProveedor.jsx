import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Button, Modal, Form } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { alertaglobal, addproveedorerror, addproveedorsuccess } from '../alertas';

const AddProveedor = ({onSuccess}) => {
    const [show, setShow] = useState(false);
    const OpenModal = () => setShow(true);
    const CloseModal = () => setShow(false);

    const [estados, setEstados] = useState([]);
    const [proveedores, setProveedores] = useState({
        nom_prov: '',
        desc_prov: '',
        tel_prov: '',
        email_prov: '',
        asesorv_prov: '',
        notas_prov: '',
        estatus_prov: '',
        cve_est: '',
        fecha_prov: '' // Nueva propiedad para la fecha

    });

    const get_estado = async () => {
        try {
            const url = 'http://localhost/bdinprosi/webservice/gestion/get_nom_est';
            const response = await axios.get(url, {
                headers: { 'Content-Type': 'application/json' }
            });

            setEstados(response.data.estado);
            console.log('Datos de estados exitoso');
        } catch (error) {
            console.error(error);
            console.log('Error al realizar la petición');
        }
    }

    const add_proveedor = async (e) => {
        e.preventDefault(); // Evitar que se refresque la pagina mientras llenamos el formulario
        try {
            const url = 'http://localhost/bdinprosi/webservice/gestion/add_proveedor';
            const response = await axios.post(url, proveedores, {
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.data.Status === 'Success') {
                CloseModal();
                onSuccess();
                console.log('Proveedor registrado exitosamente');
                addproveedorsuccess();
            } else {
                console.log('Proveedor no registrado fallo');
                addproveedorerror();
            }
        } catch (error) {
            console.error(error);
            console.log('Huvo error al realizar la petición');
            alertaglobal();
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
        <div className='mb-3 d-flex'>
            <Button variant='success' onClick={OpenModal}>
                <i class="bi bi-person-plus"></i> Agregar Proveedor
            </Button>

            <Modal show={show} onHide={CloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Agregar Nuevo Proveedor</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={add_proveedor}>
                        <div className='d-flex align-items-center justify-content-around'>
                            <Form.Group controlId='nom_prov'>
                                <Form.Label>Proveedor:</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Nombre del proveedor'
                                    name='nom_prov'
                                    value={proveedores.nom_prov}
                                    onChange={Change}
                                ></Form.Control>
                            </Form.Group>

                            <Form.Group controlId='desc_prov'>
                                <Form.Label>Descripción:</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Escribe la descripción del provedor'
                                    name='desc_prov'
                                    value={proveedores.desc_prov}
                                    onChange={Change}
                                ></Form.Control>
                            </Form.Group>
                        </div>

                        <div className='d-flex align-items-center justify-content-around mt-2'>
                            <Form.Group controlId='tel_prov'>
                                <Form.Label>Teléfono:</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Escribe el teléfono'
                                    name='tel_prov'
                                    value={proveedores.tel_prov}
                                    onChange={Change}
                                ></Form.Control>
                            </Form.Group>

                            <Form.Group controlId='email_prov'>
                                <Form.Label>Correo Electronico:</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Escribe correo electronico'
                                    name='email_prov'
                                    value={proveedores.email_prov}
                                    onChange={Change}
                                ></Form.Control>
                            </Form.Group>
                        </div>

                        <div className='d-flex align-items-center justify-content-around mt-2'>
                            <Form.Group controlId='asesorv_prov'>
                                <Form.Label>Asesor de Ventas:</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Escribe el asesor de ventas'
                                    name='asesorv_prov'
                                    value={proveedores.asesor_prov}
                                    onChange={Change}
                                ></Form.Control>
                            </Form.Group>

                            <Form.Group controlId='notas_prov'>
                                <Form.Label>Notas:</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Escribe datos adicionales'
                                    name='notas_prov'
                                    value={proveedores.notas_prov}
                                    onChange={Change}
                                >
                                </Form.Control>
                            </Form.Group>
                        </div>

                        <div className='d-flex align-items-center justify-content-around mt-2'>
                            <Form.Group controlId='cve_est'>
                                <Form.Label>Estado:</Form.Label>
                                <Form.Control
                                    as='select'
                                    type='text'
                                    placeholder='Selecciona el estado'
                                    name='cve_est'
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

                            <Form.Group className="mb-2" controlId="estatus_prov">
                                <Form.Label>Estatus:</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="estatus_prov"
                                    value={proveedores.estatus_prov}
                                    onChange={Change}
                                >
                                    <option value="">Selecciona una opción</option>
                                    <option value="1">Activo</option>
                                    <option value="0">Inactivo</option>
                                </Form.Control>
                            </Form.Group>
                        </div>

                        <div className='d-flex align-items-center justify-content-around mt-2'>
                        <Form.Group controlId='fecha_prov'>
                            <Form.Label>Fecha:</Form.Label>
                            <Form.Control
                                type='date'
                                name='fecha_prov'
                                value={proveedores.fecha_prov}
                                onChange={Change}
                            />
                        </Form.Group>
                        </div>
                        
                        <div className='mt-2 d-flex align-items-center justify-content-between'>
                            <Button className='mt-2 ms-1' variant='secondary' onClick={CloseModal}>
                                Cancelar
                            </Button>
                            <Button className='mt-2 me-1 ' type='submit'>
                                Agregar
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default AddProveedor;