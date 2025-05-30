import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Button, Modal, Form } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { alertaglobal, addprocesosuccess } from '../alertas';

const AddProceso = ({ onSuccess }) => {
    const [show, setShow] = useState(false);
    const OpenModal = () => setShow(true);
    const CloseModal = () => setShow(false);
    const [proveedores, setproveedores] = useState([]);

    const [materiales, setMateriales] = useState({
        nom_mat: '',
        desc_mat: '',
        notas_mat: '',
        estatus_mat: '',
        id_prov: ''
    });

    const add_material = async (e) => {
        e.preventDefault();
        try {
            const url = 'http://localhost/bdinprosi/webservice/gestion/add_material';
            const response = await axios.post(url, materiales, {
                headers: { 'Content-Type' : 'application/json'}
            });
            
            setMateriales(response.data.Status === 'Success');
            CloseModal();
            onSuccess(); 
            console.log('Material agregado correctamente');
            addprocesosuccess();
        } catch (error) {
            console.error(error);
            console.log('Error al realizar la petición');
            alertaglobal();
        }
    }

    const get_proveedor = async () => {
        try {
            const url = 'http://localhost/bdinprosi/webservice/gestion/get_nom_prov';
            const response = await axios.get(url, {
                headers: { 'Content-Type' : 'application/json'}
            });

            setproveedores(response.data.proveedor);
            console.log('Datos de proveedor recuperados con exito');
        } catch (error) {
            console.error(error);
            console.log('Falla al realizar la petición');
        }
    }

    const Change = async (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setMateriales(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    useEffect(() => {
        get_proveedor();
    }, []);
    
    return (
        <div className='d-flex mb-3'>
            <Button variant='success' onClick={OpenModal}>
                <i class="bi bi-gear"></i> Agregar Material
            </Button>

            <Modal show={show} onHide={CloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Agregar Nuevo Material</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={add_material}>
                        <Form.Group controlId='nom_mat'>
                            <Form.Label>Material:</Form.Label>
                            <Form.Control
                                name='nom_mat'
                                type='text'
                                placeholder='Escribe nombre del material'
                                value={materiales.nom_mat}
                                onChange={Change}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='desc_mat'>
                            <Form.Label>Descripción:</Form.Label>
                            <Form.Control
                                name='desc_mat'
                                type='text'
                                placeholder='Escribe descripcion del material'
                                value={materiales.desc_mat}
                                onChange={Change}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='notas_mat'>
                            <Form.Label>Notas Adicionales:</Form.Label>
                            <Form.Control
                                className='py-4'
                                name='notas_mat'
                                type='text'
                                placeholder='Escribe notas adicionales del material'
                                value={materiales.notas_mat}
                                onChange={Change}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='estatus_mat'>
                            <Form.Label>Estatus:</Form.Label>
                            <Form.Control
                                as="select"
                                name='estatus_mat'
                                type='number'
                                value={materiales.estatus_mat}
                                onChange={Change}
                            >
                                <option value="">Selecciona una opción</option>
                                <option value="1">Activo</option>
                                <option value="0">Inactivo</option> 
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='id_prov'>
                            <Form.Label>Proveedor:</Form.Label>
                            <Form.Control
                                as='select'
                                name='id_prov'
                                value={materiales.id_prov}
                                onChange={Change}
                            >
                                <option value=''>Selecciona el Proveedor</option>
                                {proveedores.map((proveedor) => (
                                        <option key={proveedor.id_prov} value={proveedor.id_prov}>
                                            {proveedor.nom_prov}
                                        </option>
                                    ))}
                            </Form.Control>
                        </Form.Group>

                        <div className='container-fluid mt-3'>
                            <Button variant='primary' className='w-100' type='submit'>
                                Agregar
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default AddProceso;