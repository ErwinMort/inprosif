import { Form, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './css/GenerarEvidencias.module.css';
import { genevidencia } from '../alertas';

const GenerarEvidencias = () => {
    const [productos, setProductos] = useState([]);
    const [cotizaciones, setCotizaciones] = useState([]);
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
            console.log(response.data);
            setInformes({
                img_evid: '',
                id_cot: '',
                id_prod: ''
            });
            console.log("Evidencia enviada exitosamente.");
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

    const Change = (e) => {
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
        <div className={styles.con}>
            <h1 className={styles.title}>Subir Evidencia</h1>
            <div className={styles.container}>
                <Form onSubmit={add_evidencia} className={styles.form}>
                    <Form.Group controlId='id_prod'>
                        <Form.Label className={styles.label}>Selecciona el proyecto a evidenciar:</Form.Label>
                        <Form.Control className={styles.select} name='id_prod' as='select' onChange={Change} value={informes.id_prod}>
                            <option value="">Selecciona el nombre del proyecto</option>
                            {productos.map((producto) => (
                                <option key={producto.id_prod} value={producto.id_prod}>
                                    {producto.nom_prod}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group className='mt-2' controlId='id_cot'>
                        <Form.Label className={styles.label}>Selecciona la cotización:</Form.Label>
                        <Form.Control className={styles.select} name='id_cot' as='select' onChange={Change} value={informes.id_cot}>
                            <option value="">Selecciona el nombre del proyecto</option>
                            {cotizaciones.map((cotizacion) => (
                                <option key={cotizacion.id_cot} value={cotizacion.id_cot}>
                                    {cotizacion.nomper_cot}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group className='mt-2' controlId='img_evid'>
                        <Form.Label className={styles.label}>Imagenes del proyecto:</Form.Label>
                        <Form.Control className={styles.input} name='img_evid' type='file' onChange={Change} />
                    </Form.Group>

                    <div className={styles.buttonContainer}>
                        <Button variant='secondary' className={styles.button}>
                            Cancelar
                        </Button>
                        <Button variant='success' type='submit' className={styles.button}>
                            Enviar Evidencia
                        </Button>
                    </div>
                </Form>
            </div>
        </div>

    );
}

export default GenerarEvidencias;
