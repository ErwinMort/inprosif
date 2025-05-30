import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { genevidencia } from '../alertas';

const GenEvidencias = ({onSuccess}) => {
    const [show, setShow] = useState(false);
    const [productos, setProductos] = useState([]);
    const [cotizaciones, setCotizaciones] = useState([]);


    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const [informes, setInformes] = useState({
        img_evid: '',
        id_cot: '',
        id_prod: ''
    });

    const add_evidencia = async (e) => {
        e.preventDefault();
        try {
            const url = 'http://localhost/bdinprosi/webservice/gestion/add_evidencia';
            const response = await axios.post(url, informes, {
                headers: { 'Content-Type': 'application/json' }
            });
            setInformes(response.data);
            console.log('Datos enviados de la API: ', response.data);
            handleClose();
            onSuccess();
            genevidencia();
        } catch (error) {
            console.error(error);
            console.log('Error al realizar la petición');
        }
    }

    const get_productos = async () => {
        try {
            const url = 'http://localhost/bdinprosi/webservice/gestion/get_nom_prod';
            const response = await axios.get(url);
            setProductos(response.data.producto);
            console.log('Datos recibidos de la API: ', response.data);
        } catch (error) {
            console.error(error);
            console.log('Error al realizar la petición');
        }
    }
    const get_cotizaciones = async () => {
        try {
            const url = 'http://localhost/bdinprosi/webservice/gestion/get_cot';
            const response = await axios.get(url);
            setCotizaciones(response.data.cotizacion);
            console.log('Datos recibidos de la API: ', response.data);
        } catch (error) {
            console.error(error);
            console.log('Error al realizar la petición');
        }
    }

    const Change = async (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setInformes(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    useEffect(() => {
        get_productos();
        get_cotizaciones();
    }, []);

    return (
        <>
            <Button variant="success" className='d-flex mb-3' onClick={handleShow}>
                Subir Información de Proyecto
            </Button>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Subir Información de Proyecto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={add_evidencia}>
                        <Form.Group controlId='id_prod'>
                            <Form.Label>Selecciona el proyecto a evidenciar:</Form.Label>
                            <Form.Control name='id_prod' as='select' onChange={Change} value={informes.id_prod}>
                            <option value="">Selecciona el nombre del proyecto</option>
                            {productos.map((producto) => (
                                <option key={producto.id_prod} value={producto.id_prod}>
                                    {producto.nom_prod}
                                </option>
                            ))}
                                
                            </Form.Control>
                        </Form.Group>

                        <Form.Group className='mt-2' controlId='id_cot'>
                            <Form.Label>Selecciona la cotización:</Form.Label>
                            <Form.Control name='id_cot' as='select' onChange={Change} value={informes.id_cot}>
                            <option value="">Selecciona el nombre del proyecto</option>
                            {cotizaciones.map((cotizacion) => (
                                <option key={cotizacion.id_cot} value={cotizacion.id_cot}>
                                    {cotizacion.nomper_cot}
                                </option>
                            ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className='mt-2' controlId='img_evid'>
                            <Form.Label>Imagenes del proyecto:</Form.Label>
                            <Form.Control name='img_evid' type='file' onChange={Change} />
                        </Form.Group>
                        
                        <Button variant='secondary' onClick={handleClose} className='mt-3 me-3'>
                            Cancelar
                        </Button>
                        <Button variant='success' type='submit' className='mt-3'>
                            Enviar Evidencia
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default GenEvidencias;