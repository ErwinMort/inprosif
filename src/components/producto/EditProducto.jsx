import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Button, Modal, Form } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { alertaglobal,editproductosuccess,editproductoerror } from '../alertas';

const EditProducto = ({producto, id_prod, onSuccess}) => {
    const [show, setShow] = useState(false);
    const [procesos, setProcesos] = useState([]);
    const [materiales, setMateriales] = useState([]);
    const [productos, setProductos] =useState({
        nom_prod: producto.nom_prod || '', 
        desc_prod: producto.desc_prod || '',
        id_pco: producto.id_pco || '',
        id_mat: producto.id_mat || ''
    });

    const CloseModal = () => setShow(false);
    const OpenShow = () => setShow(true);

    const get_proceso = async () => {
        try {
            const url = 'http://localhost/bdinprosi/webservice/gestion/get_nom_pco';
            const response = await axios.get(url, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            setProcesos(response.data.proceso);
            console.log('Nombres de proceso vizualizados correctamente');
        } catch (error) {
            console.error(error);
            console.log('Error al realizar la petición');
        }
    }

    const get_material = async () => {
        try {
            const url = 'http://localhost/bdinprosi/webservice/gestion/get_nom_mat';
            const response = await axios.get(url, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            setMateriales(response.data.material);
            console.log('Nombres de materiales vizualizados correctamente');
        } catch (error) {
            console.error(error);
            console.log('Error al realizar la petición');
        }
    }

    const update_producto = async (event) => {
        event.preventDefault();
        try {
            const url = `http://localhost/bdinprosi/webservice/gestion/editar_producto/${id_prod}`;
            const response = await axios.post(url, productos, {
                headers: { 'Content-Type' : 'application/json'}
            });

            if (response) {
                editproductosuccess();
                console.log('Actualización de producto exitosa');
                setProductos(response.data);
                onSuccess();
                CloseModal();
            } else {
                editproductoerror();
                console.log('Fallo al actualizar producto');
                setProductos(response.data);
                CloseModal();
            }
        } catch (error) {
            console.error(error);
            console.log('Fallo al realizar la petricion');
            alertaglobal();
        }
    }

    const Change = (e) => {
        const { name, value } = e.target;
        setProductos(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    // Monta el componente proceso y material
    useEffect(() => {
        get_proceso();
        get_material();
    }, []);

    return (
        <div className='container-fluid d-flex justify-content-center align-items-center'>
            <Button variant='outline-warning' onClick={OpenShow}>
                <i className="bi bi-pencil-square"></i>
            </Button>

            <Modal show={show} onHide={CloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Producto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={update_producto}>
                        <div className="d-flex align-items-center justify-content-around">
                            <Form.Group className="mb-2" controlId="nom_prod">
                                <Form.Label>Nombre del Producto:</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Nombre del Producto"
                                    name="nom_prod"
                                    value={productos.nom_prod}
                                    onChange={Change}
                                />
                            </Form.Group>

                            <Form.Group className="mb-2" controlId="desc_prod">
                                <Form.Label>Descripción:</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Descripción del Producto"
                                    name="desc_prod"
                                    value={productos.desc_prod}
                                    onChange={Change}
                                />
                            </Form.Group>
                        </div>

                        <div className="d-flex align-items-center justify-content-around">
                            <Form.Group className="mb-2" controlId="id_pco">
                                <Form.Label>Proceso:</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="id_pco"
                                    value={productos.id_pco}
                                    onChange={Change}
                                >
                                    <option value="">Selecciona tu proceso</option>
                                    {procesos.map((proceso) => (
                                        <option key={proceso.id_pco} value={proceso.id_pco}>
                                            {proceso.nom_pco}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>

                            <Form.Group className="mb-2" controlId="id_mat">
                                <Form.Label>Material:</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="id_mat"
                                    value={productos.id_mat}
                                    onChange={Change}
                                >
                                    <option value="">Selecciona tu proceso</option>
                                    {materiales.map((material) => (
                                        <option key={material.id_mat} value={material.id_mat}>
                                            {material.nom_mat}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                        </div>

                        <Button className="mt-2 w-100" type="submit" >
                            Actualizar
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default EditProducto;