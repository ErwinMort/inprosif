import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Button, Modal, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { addclientesuccess, addclienteerror } from "../alertas";

const AddCliente = ({ onSuccess }) => {
    const [show, setShow] = useState(false);
    const CloseModal = () => setShow(false);
    const OpenShow = () => setShow(true);

   // State para el formulario de usuario
   const [usuario, setUsuario] = useState({
    email_us: "",
    pass_us: "",
    tipo_us: "1",
    estatus_us: "1",
    sesion_us: "0",
    fecha_us: "",
});
  // Función para manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario((prev) => ({
        ...prev,
        [name]: value,
    }));
};

// Función para agregar un nuevo usuario
const handleAddUsuario = async (e) => {
    e.preventDefault();
    try {
        const url = "http://localhost/bdinprosi/webservice/gestion/add_usuario";
        const response = await axios.post(url, usuario, {
            headers: { "Content-Type": "application/json" },
        });

        if (response.data.Status === "Success") {
            CloseModal();
            onSuccess();
            addclientesuccess();
            setUsuario({
                email_us: "",
                pass_us: "",
                tipo_us: "1",
                estatus_us: "1",
                sesion_us: "0",
                fecha_us: "",
            });
        } else {
            addclienteerror();
        }
    } catch (error) {
        console.error("Error:", error);
        addclienteerror();
    }
};

return (
    <div className="mb-3 d-flex">
        <Button variant="success" onClick={OpenShow}>
            <i className="bi bi-plus-square"></i> Agregar usuario
        </Button>

        <Modal show={show} onHide={CloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>Agregar Nuevo Usuario</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleAddUsuario}>
                    <Form.Group className="mb-2" controlId="email_us">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Email"
                            name="email_us"
                            value={usuario.email_us}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-2" controlId="pass_us">
                        <Form.Label>Contraseña:</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Contraseña"
                            name="pass_us"
                            value={usuario.pass_us}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-2" controlId="fecha_us">
                        <Form.Label>Fecha de registro:</Form.Label>
                        <Form.Control
                            type="date"
                            name="fecha_us"
                            value={usuario.fecha_us}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Button className="mt-2 w-100" type="submit">
                        Agregar
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    </div>
);
};

export default AddCliente;
