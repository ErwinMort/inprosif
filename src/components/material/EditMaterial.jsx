import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Button, Modal, Form } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { alertaglobal, editmaterialsuccess, editmaterialerror } from '../alertas';

const EditMaterial = ({ material, id_mat, onSuccess }) => {
    const [show, setShow] = useState(false);
    const OpenModal = () => setShow(true);
    const CloseModal = () => setShow(false);


    const [proveedores, setProveedores] = useState([]);
    const [materiales, setMateriales] = useState({
        nom_mat: material.nom_mat || '',
        desc_mat: material.desc_mat || '',
        notas_mat: material.notas_mat || '',
        id_prov: material.id_prov || ''
    });

    const get_proveedor = async () => {
        try {
            const url = 'http://localhost/bdinprosi/webservice/gestion/get_nom_prov';
            const response = await axios.get(url, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            setProveedores(response.data.proveedor);
            console.log('Nombres de proceso vizualizados correctamente');
        } catch (error) {
            console.error(error);
            console.log('Error al realizar la petición');
        }
    }

    const update_material = async (event) => {
        event.preventDefault();
        try {
            const url = `http://localhost/bdinprosi/webservice/gestion/update_material/${id_mat}`;
            const response = await axios.post(url, materiales, {
                headers: { 'Content-Type': 'application/json' }
            });

            if (response) {
                console.log('Actualización de material exitosa');
                setMateriales(response.data);
                onSuccess();
                CloseModal();
                editmaterialsuccess();
            } else {
                console.log('Fallo al actualizar material');
                setMateriales(response.data);
                CloseModal();
                editmaterialerror();
            }
        } catch (error) {
            console.error(error);
            console.log('Fallo al realizar la petricion');
            alertaglobal();
        }
    }

    const Change = (e) => {
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
        <div>
            <Button variant='outline-warning' onClick={OpenModal}>
                <i className="bi bi-pencil-square"></i>
            </Button>

            <Modal show={show} onHide={CloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Datos del Material</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form onSubmit={update_material}>
                        <Form.Group controlId='nom_mat'>
                            <Form.Label>Material: </Form.Label>
                            <Form.Control
                                name='nom_mat'
                                value={materiales.nom_mat}
                                onChange={Change}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='desc_mat'>
                            <Form.Label>Descripción: </Form.Label>
                            <Form.Control
                                name='desc_mat'
                                value={materiales.desc_mat}
                                onChange={Change}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='notas_mat'>
                            <Form.Label>Notas Adicionasles: </Form.Label>
                            <Form.Control
                                name='notas_mat'
                                value={materiales.notas_mat}
                                onChange={Change}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='id_prov'>
                            <Form.Label>Proveedor: </Form.Label>
                            <Form.Control
                                name='id_prov'
                                as='select'
                                value={materiales.id_prov}
                                onChange={Change}
                            >
                                <option value="">Selecciona tu proceso</option>
                                {proveedores.map((proveedor) => (
                                    <option key={proveedor.id_prov} value={proveedor.id_prov}>
                                        {proveedor.nom_prov}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        <Button type='submit' className='w-100 mt-3'>
                            Actualizar
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default EditMaterial;