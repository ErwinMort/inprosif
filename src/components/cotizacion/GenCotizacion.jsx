import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';
import { alertaglobal, gencotizacionerror, cotizacionsuccess } from '../alertas';
/* import { alertaglobal, gencotizacionerror, gencotizacionsuccess } from '../alertas'; */
import { useNavigate } from 'react-router-dom';

const GenCotizacion = () => {
    const navigate = useNavigate();
    const [tipoPersona, setTipoPersona] = useState('');
    const [cotizaciones, setCotizaciones] = useState({
        nomper_cot: '',
        fecha_cot: '',
        cantprod_cot: '',
        uniprod_cot: '',
        precprod_cot: '',
        imptot_cot: '',
        subtot_cot: '',
        iva_cot: '',
        isr_cot: '',
        total_cot: '',
        monlet_cot: '',
        notas_cot: ''
    });

    const toggleISR = (event) => {
        setTipoPersona(event.target.value);
    }

    const generar_cotizacion = async () => {
        try {
            const url = 'http://localhost/bdinprosi/webservice/gestion/generar_cotizacion';
            const response = await axios.post(url, cotizaciones, {
                headers: { 'Content-Type': 'application/json' }
            });
            if (response.data.Status === 'Success') {
                console.log('Cotización generada correctamente');
                cotizacionsuccess();
                /* gencotizacionsuccess(); */
            } else {
                console.log('No se pudo generar la cotización');
                gencotizacionerror();
            }
        } catch (error) {
            console.error(error);
            console.log('Error al realizar petición');
            alertaglobal();
        }
    }

    const Change = (e) => {
        const { name, value } = e.target;
        setCotizaciones(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    return (
        <>
            <section className='w-10 text-center mt-0'>
                <div style={{ fontWeight: 'bold', height: '1em' }}></div>
            </section>
            <div className='d-flex' style={{ marginTop: '30px' }}>

                <div
                    className='card p-3'
                    style={{
                        position: 'fixed',      // Posición fija (como lo tenías)
                        top: '100px',           // 100px desde arriba (igual que antes)
                        right: '20px',          // 20px desde la derecha (sin cambios)
                        width: '640px',         // Ancho fijo (original)
                        height: 'calc(100vh - 120px)', // Altura dinámica (viewport - margen superior)
                        overflowY: 'auto',      // Scroll vertical interno
                        zIndex: 1000            // Prioridad de capa
                    }}
                >
                    <div className=''>
                        <h2 className='mb-3' style={{ fontWeight: 'bold' }}>Formulario de Cotización</h2>
                        <Form onSubmit={generar_cotizacion}>
                            <div>
                                <section className='card w-100 border-danger'>
                                    <h3 style={{ fontWeight: 'bold' }}>Datos Generales</h3>
                                    <Form.Group controlId='fecha_cot'>
                                        <div className='d-flex'>
                                            <Form.Label style={{ fontWeight: 'bold', marginLeft: '2px' }}>Fecha: </Form.Label>
                                        </div>
                                        <Form.Control
                                            placeholder='Escribe la fecha'
                                            name='fecha_cot'
                                            onChange={Change}
                                            value={cotizaciones.fecha_cot}
                                            type='date'
                                        ></Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId='tipopersona' className='mt-2'>
                                        <div className='d-flex'>
                                            <Form.Label style={{ fontWeight: 'bold', marginLeft: '2px' }}>Tipo de Persona: </Form.Label>
                                        </div>
                                        <Form.Control
                                            as='select'
                                            onChange={toggleISR}
                                            value={tipoPersona}
                                        >
                                            <option value="">Selecciona tipo de persona</option>
                                            <option value="fisica">Persona Física</option>
                                            <option value="moral">Persona Moral</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId='nomper_cot' className='mt-2'>
                                        <div className='d-flex'>
                                            <Form.Label style={{ fontWeight: 'bold', marginLeft: '2px' }}>A quién va dirigida (Nombre o Razón Social):</Form.Label>
                                        </div>
                                        <Form.Control
                                            placeholder='Nombre o Razón Social'
                                            onChange={Change}
                                            name='nomper_cot'
                                            type='text'
                                        ></Form.Control>
                                    </Form.Group>
                                </section>

                                <section className='card w-100 border-danger mt-5'>
                                    <h3 style={{ fontWeight: 'bold' }}>Detalles del Producto/Servicio</h3>
                                    <Form.Group controlId='cantprod_cot'>
                                        <div className='d-flex'>
                                            <Form.Label style={{ fontWeight: 'bold', marginLeft: '2px' }}>Cantidad: </Form.Label>
                                        </div>
                                        <Form.Control
                                            placeholder='Escribe la cantidad solicitada'
                                            onChange={Change}
                                            name='cantprod_cot'
                                            type='text'
                                        ></Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId='uniprod_cot' className='mt-2'>
                                        <div className='d-flex'>
                                            <Form.Label style={{ fontWeight: 'bold', marginLeft: '2px' }}>Unidad de medida: </Form.Label>
                                        </div>
                                        <Form.Control
                                            placeholder='Escribe la unidad de medida'
                                            onChange={Change}
                                            name='precprod_cot'
                                            type='text'
                                        ></Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId='' className='mt-2'> {/* Falta en la tabla cotizaciÓn */}
                                        <div className='d-flex'>
                                            <Form.Label style={{ fontWeight: 'bold', marginLeft: '2px' }}>Descripción del producto/servicio:</Form.Label>
                                        </div>
                                        <Form.Control
                                            placeholder='Descripción del producto/servicio'
                                            onChange={Change}
                                            name=''
                                            type='text'
                                        ></Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId='precprod_cot' className='mt-2'>
                                        <div className='d-flex'>
                                            <Form.Label style={{ fontWeight: 'bold', marginLeft: '2px' }}>Precio Unitario:</Form.Label>
                                        </div>
                                        <Form.Control
                                            type='number'
                                            onChange={Change}
                                            value={cotizaciones.precprod_cot}
                                            name='precprod_cot'
                                            placeholder='Escribe el precio unitario del producto/servicio'
                                        ></Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId='imptot_cot' className='mt-2'>
                                        <div className='d-flex'>
                                            <Form.Label style={{ fontWeight: 'bold', marginLeft: '2px' }}>Importe:</Form.Label>
                                        </div>
                                        <Form.Control
                                            placeholder='Escribe el importe del producto/servicio'
                                            onChange={Change}
                                            name='imptot_cot'
                                            type='number'
                                        ></Form.Control>
                                    </Form.Group>
                                </section>

                                <section className='card w-100 border-danger mt-5'>
                                    <h3 style={{ fontWeight: 'bold' }}>Cálculos</h3>
                                    <Form.Group controlId='subtot_cot'>
                                        <div className='d-flex'>
                                            <Form.Label style={{ fontWeight: 'bold', marginLeft: '2px' }}>Subtotal: </Form.Label>
                                        </div>
                                        <Form.Control
                                            placeholder='Escribe el subtotal'
                                            onChange={Change}
                                            type='number'
                                        ></Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId='iva_cot' className='mt-2'>
                                        <div className='d-flex'>
                                            <Form.Label style={{ fontWeight: 'bold', marginLeft: '2px' }}>IVA (16%): </Form.Label>
                                        </div>
                                        <Form.Control
                                            type='number'
                                            placeholder='IVA'
                                            onChange={Change}
                                        ></Form.Control>
                                    </Form.Group>
                                    {tipoPersona === 'moral' && (
                                        <Form.Group controlId='isr_cot' className='mt-2' id="isrField">
                                            <div className='d-flex'>
                                                <Form.Label style={{ fontWeight: 'bold', marginLeft: '2px' }}>ISR (1.25%): </Form.Label>
                                            </div>
                                            <Form.Control
                                                type='number'
                                                placeholder='ISR'
                                                onChange={Change}
                                            ></Form.Control>
                                        </Form.Group>
                                    )}
                                    <Form.Group controlId='total_cot' className='mt-2'>
                                        <div className='d-flex'>
                                            <Form.Label style={{ fontWeight: 'bold', marginLeft: '2px' }}>Total:</Form.Label>
                                        </div>
                                        <Form.Control
                                            placeholder='Escribe el monto total'
                                            type='number'
                                            onChange={Change}
                                        ></Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId='monlet_cot' className='mt-2'>
                                        <div className='d-flex'>
                                            <Form.Label style={{ fontWeight: 'bold', marginLeft: '2px' }}>Total en letras:</Form.Label>
                                        </div>
                                        <Form.Control
                                            placeholder='Escribe el monto total en letras'
                                            type='text'
                                            onChange={Change}
                                        ></Form.Control>
                                    </Form.Group>
                                </section>
                                <section className='card w-100 border-danger mt-5'>
                                    <Form.Group controlId='notas_cot'>
                                        <div className='d-flex'>
                                            <Form.Label style={{ fontWeight: 'bold', marginLeft: '2px' }}>Notas Adicionales:</Form.Label>
                                        </div>
                                        <Form.Control
                                            placeholder='Escribe notas adicionales al producto/Servicio'
                                            type='text'
                                            onChange={Change}
                                            className='py-4'
                                        ></Form.Control>
                                    </Form.Group>
                                </section>

                                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px', marginBottom: '10px' }}>
                                    <Button
                                        type='submit'
                                        style={{
                                            backgroundColor: '#c01300',
                                            border: 'none',
                                            borderRadius: '5px',
                                            marginRight: '10px' // Espacio entre botones
                                        }}
                                    >
                                        Generar Cotización
                                    </Button>

                                    <Button
                                        type='button' // Cambia esto según lo que necesites
                                        style={{
                                            backgroundColor: '#6c757d', // Color gris (puedes cambiarlo)
                                            border: 'none',
                                            borderRadius: '5px'
                                        }}
                                        onClick={() => navigate('/generacioncotizaciones')}>
                                        Cancelar
                                    </Button>
                                </div>
                            </div>
                        </Form>
                    </div>

                </div>
            </div>
        </>
    );
};
export default GenCotizacion;
