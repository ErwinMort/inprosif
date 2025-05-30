import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Button, Modal, Form } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { addventasuccess, alertaglobal } from '../alertas';
import axios from 'axios';

const AddVentas = ({onSuccess}) => {
    const [show, setShow] = useState(false);
    const OpenModal = () => setShow(true);
    const CloseModal = () => setShow(false);
    const [productos, setProductos] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [ventas, setVentas] = useState({
        id_clie: '',
        id_prod: '',
        unidad_vta: '',
        costop_vta: '',
        fecha_vta: '',
        fechafin_vta: ''
    });

    const getproducto = async () => {
        try {
            const url = 'http://localhost/bdinprosi/webservice/gestion/get_nom_prod';
            const response = await axios.get(url, {
                headers: { 'Content-Type' : 'application/json'}
            });
            setProductos(response.data.producto);
            console.log('Cargaron correctamente los datos de productos');
        } catch (error) {
            console.error(error);
            console.log('Error al realizar la petición');
            alertaglobal();
        }
    }
    const getcliente = async () => {
        try {
            const url = 'http://localhost/bdinprosi/webservice/gestion/get_nom_clie';
            const response = await axios.get(url, {
                headers: { 'Content-Type' : 'application/json'}
            });
            setClientes(response.data.cliente);
            console.log('Cargaron correctamente los nombres de cliente');
        } catch (error) {
            console.error(error);
            console.log('Error al realizar la petición');
            alertaglobal();
        }
    }

    const add_venta = async (e) => {
        e.preventDefault();
        try {
            const url = 'http://localhost/bdinprosi/webservice/gestion/add_ventas';
            const response = await axios.post(url, ventas, {
                headers: { 'Content-Type' : 'application/json'}
            });
            setVentas(response.data.Status === 'Success');
            CloseModal();
            onSuccess();
            console.log('Venta agregada correctamente');
            addventasuccess();
        } catch (error) {
            console.error(error);
            alertaglobal();
            console.log('Huvo error al realizar la petición');
        }
    }

    const Change = async (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setVentas(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    useEffect(() => {
        getproducto();
        getcliente();
    }, []);

    return (
        <div className='mb-3 d-flex'>
            <Button variant='success' onClick={OpenModal}>
                Agregar Venta
            </Button>

            <Modal show={show} onHide={CloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title style={{fontWeight:'bold'}}>Agregar Nueva Venta</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={add_venta}>
                        <div className="mb-2">
                            <Form.Group>
                                <Form.Label>Nombre del cliente:</Form.Label>
                                <Form.Control
                                    name='id_clie'
                                    as='select'
                                    type='text'
                                    value={ventas.id_clie}
                                    onChange={Change}
                                >
                                    <option value="">Selecciona un cliente</option>
                                    {clientes.map((cliente) => (
                                        <option key={cliente.id_clie} value={cliente.id_clie}>
                                            {cliente.nom_clie}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                        </div>
                        <div className="mb-2">
                            <Form.Group>
                                <Form.Label>Nombre del producto:</Form.Label>
                                <Form.Control
                                    name='id_prod'
                                    as='select'
                                    type='text'
                                    value={ventas.id_prod}
                                    onChange={Change}
                                >
                                    <option value="">Selecciona un producto</option>
                                    {productos.map((producto) => (
                                        <option key={producto.id_prod} value={producto.id_prod}>
                                            {producto.nom_prod}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                        </div>
                        <div className="mb-2">
                            <Form.Group>
                                <Form.Label>Unidades:</Form.Label>
                                <Form.Control
                                    name='unidad_vta'
                                    type='number'
                                    placeholder='Escribe las unidades pedidas'
                                    value={ventas.unidad_vta}
                                    onChange={Change}
                                ></Form.Control>
                            </Form.Group>
                        </div>
                        <div className="mb-2">
                            <Form.Group>
                                <Form.Label>Costo del proyecto:</Form.Label>
                                <Form.Control
                                    name='costop_vta'
                                    type='number'
                                    placeholder='Escribe las unidades pedidas'
                                    value={ventas.costop_vta}
                                    onChange={Change}
                                ></Form.Control>
                            </Form.Group>
                        </div>
                        <div className="mb-2">
                            <Form.Group>
                                <Form.Label>Fecha de inicio:</Form.Label>
                                <Form.Control
                                    name='fecha_vta'
                                    type='date'
                                    value={ventas.fecha_vta}
                                    onChange={Change}
                                ></Form.Control>
                            </Form.Group>
                        </div>
                        <div className="mb-2">
                            <Form.Group>
                                <Form.Label>Fecha de fin:</Form.Label>
                                <Form.Control
                                    name='fechafin_vta'
                                    type='date'
                                    value={ventas.fechafin_vta}
                                    onChange={Change}
                                ></Form.Control>
                            </Form.Group>
                        </div>
                        <div className='d-flex justify-content-between align-items-center'>
                            <Button variant='secondary' className='mt-2' onClick={CloseModal}>
                                Cancelar
                            </Button>
                            <Button variant='primary' className='mt-2' type='submit'>
                                Agregar
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default AddVentas;