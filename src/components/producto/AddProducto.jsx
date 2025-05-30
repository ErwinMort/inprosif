import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Button, Modal, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { addproductosuccess, addproductoerror } from "../alertas";

const AddProducto = ({ onSuccess }) => {
    const [show, setShow] = useState(false);
    const CloseModal = () => setShow(false);
    const OpenShow = () => setShow(true); 

    const [productos, setProductos] = useState([]);
    const [procesos, setProcesos] = useState([]);
    const [materiales, setMateriales] = useState([]);
    const [product, setProduct] = useState({
        nom_prod: "",
        desc_prod: "",
        img_prod: "",
        estatus_prod: "",
        public_prod: "",
        id_pco: "",
        id_mat: "",
        fecha_prod: "", // Nueva propiedad para la fecha

    });

    const getproductos = async () => {
        try {
            const url = "http://localhost/bdinprosi/webservice/gestion/productos";
            const response = await axios.get(url, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            setProductos(response.data.producto);
            console.log("Datos de productos cargados correctamente");
        } catch (error) {
            console.error(error);
        }
    };

    const get_proceso = async () => {
        try {
            const url = "http://localhost/bdinprosi/webservice/gestion/get_nom_pco";
            const response = await axios.get(url, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            setProcesos(response.data.proceso);
            console.log("Datos de procesos cargados correctamente");
        } catch (error) {
            console.error(error);
            console.log("Error al realizar la petición");
        }
    };

    const get_material = async () => {
        try {
            const url = "http://localhost/bdinprosi/webservice/gestion/get_nom_mat";
            const response = await axios.get(url, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            setMateriales(response.data.material);
            console.log("Datos de materiales cargados correctamente");
        } catch (error) {
            console.error(error);
            console.log("Error al realizar la petición");
        }
    };

    const Add_Producto = async (e) => {
        e.preventDefault(); // Evita la recarga de la página al enviar el formulario
        try {
            const url = "http://localhost/bdinprosi/webservice/gestion/add_producto";
            const response = await axios.post(url, product, {
                headers: { "Content-Type": "application/json" },
            });

            if (response.data.Status === "Success") {
                CloseModal();
                onSuccess();
                console.log("Producto registrado exitosamente");
                addproductosuccess();
                // Limpia el formulario
                setProduct({
                    nom_prod: "",
                    desc_prod: "",
                    img_prod: "",
                    estatus_prod: "",
                    public_prod: "",
                    id_pco: "",
                    id_mat: "",
                    fecha_prod: "",

                });
            } else {
                console.log(response.data.Mensaje);
                addproductoerror();
            }
        } catch (error) {
            console.log("Hay un error", error);
        }
    };

    const Change = (e) => {
        const { name, value } = e.target;
        setProduct((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    useEffect(() => {
        getproductos();
        get_proceso();
        get_material();
    }, []);

    return (
        <div className="mb-3 d-flex">
            <Button variant="success" onClick={OpenShow}>
                <i className="bi bi-plus-square"></i> Agregar Producto
            </Button>

            <Modal show={show} onHide={CloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Agregar Nuevo Producto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={Add_Producto}>
                        <div className="d-flex align-items-center justify-content-around">
                            <Form.Group className="mb-2" controlId="nom_prod">
                                <Form.Label>Nombre del Producto:</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Nombre del Producto"
                                    name="nom_prod"
                                    value={product.nom_prod}
                                    onChange={Change}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-2" controlId="desc_prod">
                                <Form.Label>Descripción:</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Descripción del Producto"
                                    name="desc_prod"
                                    value={product.desc_prod}
                                    onChange={Change}
                                />
                            </Form.Group>
                        </div>

                        <div className="d-flex align-items-center justify-content-around">
                            <Form.Group className="mb-2" controlId="estatus_prod">
                                <Form.Label>Estatus:</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="estatus_prod"
                                    value={product.estatus_prod}
                                    onChange={Change}
                                >
                                    <option value="">Selecciona una opción</option>
                                    <option value="1">Activo</option>
                                    <option value="0">Inactivo</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group className="mb-2" controlId="public_prod">
                                <Form.Label>Público:</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="public_prod"
                                    value={product.public_prod}
                                    onChange={Change}
                                >
                                    <option value="">Selecciona una opción</option>
                                    <option value="1">Publicar</option>
                                    <option value="0">No Publicar</option>
                                </Form.Control>
                            </Form.Group>
                        </div>

                        <div className="d-flex align-items-center justify-content-around">
                            <Form.Group className="mb-2" controlId="id_pco">
                                <Form.Label>Proceso:</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="id_pco"
                                    value={product.id_pco}
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
                                    value={product.id_mat}
                                    onChange={Change}
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

                        <div className="d-flex align-items-center justify-content-between ms-3">
                            <Form.Group className="mb-2" controlId="img_prod">
                                <Form.Label>Imagen:</Form.Label>
                                <Form.Control
                                    type="file"
                                    name="img_prod"
                                    value={product.img_prod}
                                    onChange={Change}
                                />
                            </Form.Group>

                            <Form.Group className="mb-2" controlId="fecha_prod">
                                <Form.Label>Fecha:</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="fecha_prod"
                                    value={product.fecha_prod}
                                    onChange={Change}
                                />
                            </Form.Group>
                        </div>

                        <Button className="mt-2 w-100" type="submit">
                            Agregar
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default AddProducto;
