import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Button, Modal, Form } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import axios from 'axios';

const UpdateProducto = ({ producto, onSuccess }) => {
    const [show, setShow] = useState(false);
    const [procesos, setProcesos] = useState([]);
    const [materiales, setMateriales] = useState([]);

    // Inicializar los campos con los valores del producto recibido
    const [formData, setFormData] = useState({
        nom_prod: producto.nom_prod || "",
        desc_prod: producto.desc_prod || "",
        estatus_prod: producto.estatus_prod || "",
        public_prod: producto.public_prod || "",
        id_pco: producto.id_pco || "",
        id_mat: producto.id_mat || ""
    });

    const CloseModal = () => setShow(false);
    const OpenShow = () => setShow(true);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const get_proceso = async () => {
        try {
            const url = 'http://localhost/inprosi/webservice/gestion/get_nom_pco';
            const response = await axios.get(url, {
                headers: { 'Content-Type': 'application/json' }
            });
            setProcesos(response.data.proceso);
        } catch (error) {
            console.error(error);
        }
    };

    const get_material = async () => {
        try {
            const url = 'http://localhost/inprosi/webservice/gestion/get_nom_mat';
            const response = await axios.get(url, {
                headers: { 'Content-Type': 'application/json' }
            });
            setMateriales(response.data.material);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = `http://localhost/inprosi/webservice/gestion/update_producto/${producto.id_prod}`;
            await axios.put(url, formData, {
                headers: { 'Content-Type': 'application/json' }
            });
            onSuccess();  // Refrescar la tabla después de actualizar
            CloseModal();
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        get_proceso();
        get_material();
    }, []);

    return (
        <div className='container-fluid'>
            <Button variant='outline-warning' onClick={OpenShow}>
                <i className="bi bi-pencil-square"></i>
            </Button>

            <Modal show={show} onHide={CloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Producto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <div className="d-flex align-items-center justify-content-around">
                            <Form.Group className="mb-2" controlId="nom_prod">
                                <Form.Label>Nombre del Producto:</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="nom_prod"
                                    value={formData.nom_prod}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>

                            <Form.Group className="mb-2" controlId="desc_prod">
                                <Form.Label>Descripción:</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="desc_prod"
                                    value={formData.desc_prod}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                        </div>

                        <div className="d-flex align-items-center justify-content-around">
                            <Form.Group className="mb-2" controlId="estatus_prod">
                                <Form.Label>Estatus:</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="estatus_prod"
                                    value={formData.estatus_prod}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="public_prod">
                                <Form.Label>Público:</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="public_prod"
                                    value={formData.public_prod}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                        </div>

                        <div className="d-flex align-items-center justify-content-around">
                            <Form.Group className="mb-2" controlId="id_pco">
                                <Form.Label>Proceso:</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="id_pco"
                                    value={formData.id_pco}
                                    onChange={handleInputChange}
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
                                    value={formData.id_mat}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Selecciona tu material</option>
                                    {materiales.map((material) => (
                                        <option key={material.id_mat} value={material.id_mat}>
                                            {material.nom_mat}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                        </div>

                        <Button className="mt-2 w-100" type="submit">
                            Actualizar
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default UpdateProducto;
