import { Button, Form } from 'react-bootstrap';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ProyectosFinalizados } from './ProyectosFinalizados';
import { ProyectosProceso } from './ProyectosProceso';

const GenerarReporte = () => {
    const [tiporeporte, setTiporeporte] = useState('');
    const [fechainicio, setFechainicio] = useState('');
    const [fechafin, setFechafin] = useState('');

    const envioreporte = async (e) => {
        e.preventDefault();

        if (tiporeporte === 'Proyectos en Proceso') {
            try {
                const response = await ProyectosProceso({ fechainicio, fechafin });
                if (response) {
                    console.log("Reporte de proyectos en proceso generado exitosamente");
                } else {
                    console.error("Error al generar el reporte de proyectos en proceso");
                }
            } catch (error) {
                console.error("Error al generar el reporte de proyectos en proceso:", error);
            }
        } else if (tiporeporte === 'Proyectos Finalizados') {
            try {
                const response = await ProyectosFinalizados({ fechainicio, fechafin });
                if (response) {
                    console.log("Reporte de proyectos finalizados generado exitosamente");
                } else {
                    console.error("Error al generar el reporte de proyectos finalizados");
                }
            } catch (error) {
                console.error("Error al generar el reporte de proyectos finalizados:", error);
            }
        } else {
            console.error("Por favor, selecciona un tipo de reporte válido");
        }
    };

    return (
        <div className='card p-3 w-100 container-fluid' style={{ marginTop: '100px' }}>
            <div className='mt-2'>
                <h4 style={{ fontWeight: 'bold', fontSize: '30px' }}>Generar Reporte</h4>
            </div>
            <Form className='p-4' onSubmit={envioreporte}>
                <div className='card w-100 p-3'>
                    <Form.Group controlId='tipoReporte' className='mb-3'>
                        <Form.Label>Selecciona el tipo de reporte:</Form.Label>
                        <Form.Select value={tiporeporte} onChange={(e) => setTiporeporte(e.target.value)}>
                            <option value=''>Selecciona el reporte a generar</option>
                            <option value='Proyectos en Proceso'>Proyectos en Proceso</option>
                            <option value='Proyectos Finalizados'>Proyectos Finalizados</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group controlId='fechainicio' className='mb-3'>
                        <Form.Label>Fecha de Inicio:</Form.Label>
                        <Form.Control type='date' value={fechainicio} onChange={(e) => setFechainicio(e.target.value)} />
                    </Form.Group>

                    <Form.Group controlId='fechafin' className='mb-3'>
                        <Form.Label>Fecha de Fin:</Form.Label>
                        <Form.Control type='date' value={fechafin} onChange={(e) => setFechafin(e.target.value)} />
                    </Form.Group>
                </div>
                <Button variant='success' type='submit' className='mt-3'>
                    Generar Reporte
                </Button>
            </Form>
        </div>
    );
};

export default GenerarReporte;
