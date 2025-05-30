import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; 
import { alertaglobal, fechasalerta, reportess } from '../alertas';

const GenerarReportes = () => {
    const [tiporeporte, setTiporeporte] = useState('');
    const [fechainicio, setFechainicio] = useState('');
    const [fechafin, setFechafin] = useState('');
    const [reporte, setReporte] = useState([]);

    const generarpdf = async (e) => {
        e.preventDefault();

        if (tiporeporte === 'Proyectos en Proceso') {
            try {
                const response = await axios.post('http://localhost/bdinprosi/webservice/gestion/reporteproceso', {
                    fechainicio,
                    fechafin,
                });
                if (response.data.status === 'success') {
                    setReporte(response.data.data);
                    generarPDF(response.data.data);
                    reportess();
                } else {
                    fechasalerta();
                }
            } catch (error) {
                console.error('Error generando el reporte:', error);
                alertaglobal();
            }
        } else if (tiporeporte === 'Proyectos Finalizados') {
            try {
                const response = await axios.post('http://localhost/bdinprosi/webservice/gestion/reportesfinalizados', {
                    fechainicio,
                    fechafin,
                });
                if (response.data.status === 'success') {
                    setReporte(response.data.data);
                    generarPDFfin(response.data.data);
                    reportess();
                } else {
                    fechasalerta();
                }
            } catch (error) {
                console.error('Error generando el reporte:', error);
                alertaglobal();
            }
        }
    }

    const generarPDF = (datos) => {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();

        const titulo = 'Proyectos en Proceso';
        const tituloX = (pageWidth - doc.getTextWidth(titulo)) / 2;
        doc.setFontSize(18);
        doc.text(titulo, tituloX, 20);

        doc.setFontSize(12);
        const fechaInicio = `Fecha: ${fechainicio}`;
        const fechaFin = `Fecha: ${fechafin}`;
        doc.text(fechaInicio, 14, 30);
        const fechaFinX = pageWidth - doc.getTextWidth(fechaFin) - 14;
        doc.text(fechaFin, fechaFinX, 30);

        const descripcionReporte =
            'Se detalla la información correspondiente a los proyectos que se encuentran en curso o próximos a ser entregados.';
        const descripcionLíneas = doc.splitTextToSize(descripcionReporte, pageWidth - 28);
        doc.text(descripcionLíneas, 14, 40);

        const tabla = datos.map((item) => [
            item.nom_pco,
            item.desc_pco,
            item.caract_pco,
            item.otro_pco,
            item.fecha_pco,
        ]);

        doc.autoTable({
            head: [['Nombre del Proceso', 'Descripción', 'Características', 'Notas', 'Fecha']],
            body: tabla,
            startY: 60,
        });

        doc.save('reporte_proyectos_proceso.pdf');
    }

    const generarPDFfin = (datos) => {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();

        const titulo = 'Proyectos Finalizados';
        const tituloX = (pageWidth - doc.getTextWidth(titulo)) / 2;
        doc.setFontSize(18);
        doc.text(titulo, tituloX, 20);

        doc.setFontSize(12);
        const fechaInicio = `Fecha de Inicio: ${fechainicio}`;
        const fechaFin = `Fecha de Fin: ${fechafin}`;
        doc.text(fechaInicio, 14, 30);
        const fechaFinX = pageWidth - doc.getTextWidth(fechaFin) - 14;
        doc.text(fechaFin, fechaFinX, 30);

        const descripcionReporte =
            'Se detalla la información correspondiente a los proyectos ya finalizados o entregados con éxito.';
        const descripcionLíneas = doc.splitTextToSize(descripcionReporte, pageWidth - 28);
        doc.text(descripcionLíneas, 14, 40);

        const tabla = datos.map((item) => [
            item.fecha_vta,
            item.unidad_vta,
            item.costop_vta,
            item.nom_clie,
            item.nom_prod,
        ]);

        doc.autoTable({
            head: [['Fecha Solicitada', 'Unidades', 'Costo', 'Cliente', 'Producto']],
            body: tabla,
            startY: 60,
        });

        doc.save('reporte_proyectos_finalizados.pdf');
    }


    return (
        <div className='card p-3 w-100 container-fluid' style={{ marginTop: '100px' }}>
            <div className='mt-2'>
                <h4 style={{ fontWeight: 'bold', fontSize: '30px' }}>Generar Reporte</h4>
            </div>
            <Form className='p-4' onSubmit={generarpdf}>
                <div className='card w-100'>
                    <Form.Group controlId='tipoReporte' className='mb-2'>
                        <Form.Label className='d-flex'>Selecciona el tipo de reporte:</Form.Label>
                        <Form.Control
                            as='select'
                            value={tiporeporte}
                            onChange={(e) => setTiporeporte(e.target.value)}
                        >
                            <option value=''>Selecciona el reporte a generar</option>
                            <option value='Proyectos en Proceso'>Proyectos en Proceso</option>
                            <option value='Proyectos Finalizados'>Proyectos Finalizados</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='fechainicio' className='mb-2'>
                        <Form.Label className='d-flex'>Fecha de Inicio:</Form.Label>
                        <Form.Control
                            name='fechainicio'
                            type='date'
                            value={fechainicio}
                            onChange={(e) => setFechainicio(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId='fechafin' className='mb-2'>
                        <Form.Label className='d-flex'>Fecha de Fin:</Form.Label>
                        <Form.Control
                            name='fechafin'
                            type='date'
                            value={fechafin}
                            onChange={(e) => setFechafin(e.target.value)}
                        />
                    </Form.Group>
                </div>
                <Button variant='success' type='submit' className='mt-3 d-flex'>
                    Generar Reporte
                </Button>
            </Form>
        </div>
    );
};

export default GenerarReportes;
