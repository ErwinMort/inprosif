import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Button, Modal, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf'; 
import autoTable from 'jspdf-autotable';
import { alertaglobal, cotizacionsuccess } from '../alertas';

const UpdateCot = ({ cotizacion, id_cot, onSuccess }) => {
    const [show, setShow] = useState(false);
    const [tipopersona, setTipopersona] = useState('');
    const [cliente, setCliente] = useState([]);
    const [producto, setProducto] = useState([]);
    const [cotizaciones, setCotizaciones] = useState({
        nomper_cot: cotizacion.nomper_cot || '',
        razonsoc_cot: cotizacion.razonsoc_cot || '',
        id_clie: cotizacion.id_clie || '',
        id_prod: cotizacion.id_prod || '',
        desc_cot: cotizacion.desc_cot || '',
        img_cot: cotizacion.img_cot || '',
        cantprod_cot: cotizacion.cantprod_cot || '',
        uniprod_cot: cotizacion.uniprod_cot || '',
        precprod_cot: cotizacion.precprod_cot || '',
        imptot_cot: cotizacion.imptot_cot || '',
        subtot_cot: cotizacion.subtot_cot || '',
        iva_cot: cotizacion.iva_cot || '',
        isr_cot: cotizacion.isr_cot || '',
        total_cot: cotizacion.total_cot || '',
        monlet_cot: cotizacion.monlet_cot || '',
        notas_cot: cotizacion.notas_cot || ''
    });

    const OpenModal = () => setShow(true);
    const CloseModal = () => setShow(false);

    const personatipo = (e) => {
        setTipopersona(e.target.value);
    }

    const numberToWords = (num) => {
        const unidades = ['Cero', 'Uno', 'Dos', 'Tres', 'Cuatro', 'Cinco', 'Seis', 'Siete', 'Ocho', 'Nueve'];
        const decenas = ['Diez', 'Veinte', 'Treinta', 'Cuarenta', 'Cincuenta', 'Sesenta', 'Setenta', 'Ochenta', 'Noventa'];
        const excepcionesDecenas = ['Once', 'Doce', 'Trece', 'Catorce', 'Quince', 'Dieciséis', 'Diecisiete', 'Dieciocho', 'Diecinueve'];
        const centenas = ['Cien', 'Doscientos', 'Trescientos', 'Cuatrocientos', 'Quinientos', 'Seiscientos', 'Setecientos', 'Ochocientos', 'Novecientos'];

        const miles = ['', 'Mil', 'Millón', 'Mil Millones', 'Billón'];

        const convertir = (n) => {
            if (n < 10) return unidades[n];
            if (n >= 11 && n <= 19) return excepcionesDecenas[n - 11];
            if (n < 100) {
                const d = Math.floor(n / 10);
                const u = n % 10;
                return u === 0 ? decenas[d - 1] : `${decenas[d - 1]} y ${unidades[u]}`;
            }
            if (n < 1000) {
                const c = Math.floor(n / 100);
                const resto = n % 100;
                return resto === 0 ? centenas[c - 1] : `${centenas[c - 1]} ${convertir(resto)}`;
            }
            if (n < 1_000_000) {
                const milesPart = Math.floor(n / 1000);
                const resto = n % 1000;
                const milesTexto = milesPart === 1 ? 'mil' : `${convertir(milesPart)} mil`;
                return resto === 0 ? milesTexto : `${milesTexto} ${convertir(resto)}`;
            }
            if (n < 1_000_000_000) {
                const millonesPart = Math.floor(n / 1_000_000);
                const resto = n % 1_000_000;
                const millonesTexto = millonesPart === 1 ? 'un millón' : `${convertir(millonesPart)} millones`;
                return resto === 0 ? millonesTexto : `${millonesTexto} ${convertir(resto)}`;
            }
            if (n < 1_000_000_000_000) {
                const billonesPart = Math.floor(n / 1_000_000_000);
                const resto = n % 1_000_000_000;
                const billonesTexto = billonesPart === 1 ? 'mil millones' : `${convertir(billonesPart)} mil millones`;
                return resto === 0 ? billonesTexto : `${billonesTexto} ${convertir(resto)}`;
            }
            return 'Número demasiado grande';
        };

        const entero = Math.floor(num);
        const decimales = Math.round((num - entero) * 100);

        const enteroTexto = convertir(entero);
        const decimalesTexto = decimales > 0 ? `con ${convertir(decimales)} centavos` : '';

        return `${enteroTexto} ${decimalesTexto}`;
    }



    useEffect(() => {
    const calcularTotales = () => {
        const cantidad = parseFloat(cotizaciones.cantprod_cot) || 0;
        const precioUnitario = parseFloat(cotizaciones.precprod_cot) || 0;

        const importe = cantidad * precioUnitario;
        const subtotal = importe;
        const iva = subtotal * 0.16;
        const isr = tipopersona === "moral" ? subtotal * 0.0125 : 0;
        const total = subtotal + iva - isr;

        const importeEnLetras = numberToWords(total);

        setCotizaciones((prevState) => ({
            ...prevState,
            imptot_cot: importe.toFixed(2),
            subtot_cot: subtotal.toFixed(2),
            iva_cot: iva.toFixed(2),
            isr_cot: isr.toFixed(2),
            total_cot: total.toFixed(2),
            monlet_cot: importeEnLetras,
        }));
    };

    if (tipopersona) {
        calcularTotales();
    }
}, [cotizaciones.cantprod_cot, cotizaciones.precprod_cot, tipopersona]);


    const Change = (e) => {
        const { name, value } = e.target;
        setCotizaciones((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    const cotizar = async (e) => {
        e.preventDefault();
        if (tipopersona === 'fisica') {
            try {
                const url = `http://localhost/bdinprosi/webservice/gestion/update_cotizacion_fisica/${id_cot}`;
                const response = await axios.post(url, cotizaciones, {
                    headers: { 'Content-Type': 'application/json' }
                });
                setCotizaciones(response.data);
                console.log('Cotización fisica realizada exitosamente');
                onSuccess(response.data);
                cotizacionsuccess();
                cotfisica();
                CloseModal();
            } catch (error) {
                console.error(error);
                console.log('Error al realizar la petición');
                alertaglobal();
            }
        } else if (tipopersona === 'moral') {
            try {
                const url = `http://localhost/bdinprosi/webservice/gestion/update_cotizacion_moral/${id_cot}`;
                const response = await axios.post(url, cotizaciones, {
                    headers: { 'Content-Type': 'application/json' }
                });
                setCotizaciones(response.data);
                console.log('Cotización moral realizada exitosamente');
                onSuccess(response.data);
                cotizacionsuccess();
                CloseModal();
                cotmoral();
            } catch (error) {
                console.error(error);
                console.log('Error al realizar la petición');
                alertaglobal();
            }
        }
    }


    const cotfisica = () => {
        const doc = new jsPDF();

        const marginLeft = 20;
        const pageWidth = doc.internal.pageSize.width;
        const marginRight = pageWidth - marginLeft;

        doc.setFontSize(16);
        doc.setFont("helvetica", "bold");
        doc.text("Cotización", pageWidth / 2, 20, { align: "center" });

        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text("Atención:", marginLeft, 40);

        doc.setFont("helvetica", "normal");
        doc.text(`         A quién corresponda: (${cotizaciones.nomper_cot})`, marginLeft, 46);

        const redaccion = `${cotizaciones.razonsoc_cot}`;
        const textArray = doc.splitTextToSize(redaccion, pageWidth - 2 * marginLeft);
        textArray.forEach((line, index) => {
            doc.text(line, marginLeft, 52 + index * 5);
        });

        const tableStartY = 90;
        const tableHeaders = [
            "Producto",
            "Cantidad",
            "Unidad de Medida",
            "Descripción",
            "Costo Unitario",
            "Importe",
        ];
        const tableBody = [
            [
                cotizaciones.id_prod,
                cotizaciones.cantprod_cot,
                cotizaciones.uniprod_cot,
                cotizaciones.desc_cot,
                cotizaciones.precprod_cot,
                cotizaciones.imptot_cot,
            ],
        ];

        autoTable(doc,{
            startY: tableStartY,
            head: [tableHeaders],
            body: tableBody,
            headStyles: { fillColor: [200, 200, 200], textColor: 0 },
            bodyStyles: { fontSize: 10, textColor: 50 },
            styles: { halign: "center", cellPadding: 3 },
        });

        const totalsStartY = doc.lastAutoTable.finalY + 20;
        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
        doc.text(`Subtotal: $${cotizaciones.subtot_cot}`, marginRight, totalsStartY, { align: "right" });
        doc.text(`IVA (16%): $${cotizaciones.iva_cot}`, marginRight, totalsStartY + 10, { align: "right" });
        if (tipopersona === "moral") {
            doc.text(`ISR (1.25%): -$${cotizaciones.isr_cot}`, marginRight, totalsStartY + 15, { align: "right" });
        }
        doc.text(`Total: $${cotizaciones.total_cot}`, marginRight, totalsStartY + 20, { align: "right" });

        doc.text("Importe en letras:", marginLeft, totalsStartY + 30);
        doc.text(`(${cotizaciones.monlet_cot} 25/100)`, marginLeft + 40, totalsStartY + 30);

        const notasStartY = totalsStartY + 40;
        doc.text("Notas:", marginLeft, notasStartY);
        const notas = doc.splitTextToSize(cotizaciones.notas_cot, pageWidth - 2 * marginLeft);
        notas.forEach((line, index) => {
            doc.text(line, marginLeft, notasStartY + 10 + index * 5);
        });

        const pagoStartY = notasStartY + 45;
        doc.text("Datos para forma de pago por cheque o transferencia electrónica de fondos", marginLeft, pagoStartY);
        doc.text("Razón Social:              Jaime Hidalgo Reygadas", marginLeft, pagoStartY + 10);
        doc.text("Banorte Cta:                0123456789", marginLeft, pagoStartY + 15);
        doc.text("Clave Interbancaria:    059 929 2017381038 0", marginLeft, pagoStartY + 20);

        const contactoStartY = pagoStartY + 35;
        doc.text("Contacto:", marginLeft, contactoStartY);
        doc.text("Ing. Jaime Hidalgo R", marginLeft, contactoStartY + 10);
        doc.text("Dirección y Ventas", marginLeft, contactoStartY + 15);
        doc.text("Celular: 2225-772053                                                    Email. ing.jaimehidalgo@gmail.com", marginLeft, contactoStartY + 20);

        doc.save(`Cotizacion_${cotizaciones.nomper_cot}.pdf`);
    }

    const cotmoral = () => {
        const doc = new jsPDF();

        const marginLeft = 20;
        const pageWidth = doc.internal.pageSize.width;
        const marginRight = pageWidth - marginLeft;

        doc.setFontSize(16);
        doc.setFont("helvetica", "bold");
        doc.text("Cotización", pageWidth / 2, 20, { align: "center" });

        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text("Atención:", marginLeft, 40);

        doc.setFont("helvetica", "normal");
        doc.text(`         A quién corresponda: (${cotizaciones.nomper_cot})`, marginLeft, 46);

        const redaccion = `${cotizaciones.razonsoc_cot}`;
        const textArray = doc.splitTextToSize(redaccion, pageWidth - 2 * marginLeft);
        textArray.forEach((line, index) => {
            doc.text(line, marginLeft, 52 + index * 5);
        });

        const tableStartY = 90;
        const tableHeaders = [
            "Producto",
            "Cantidad",
            "Unidad de Medida",
            "Descripción",
            "Costo Unitario",
            "Importe",
        ];
        const tableBody = [
            [
                cotizaciones.id_prod,
                cotizaciones.cantprod_cot,
                cotizaciones.uniprod_cot,
                cotizaciones.desc_cot,
                cotizaciones.precprod_cot,
                cotizaciones.imptot_cot,
            ],
        ];

        autoTable(doc,{
            startY: tableStartY,
            head: [tableHeaders],
            body: tableBody,
            headStyles: { fillColor: [200, 200, 200], textColor: 0 },
            bodyStyles: { fontSize: 10, textColor: 50 },
            styles: { halign: "center", cellPadding: 3 },
        });

        const totalsStartY = doc.lastAutoTable.finalY + 20;
        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
        doc.text(`Subtotal: $${cotizaciones.subtot_cot}`, marginRight, totalsStartY, { align: "right" });
        doc.text(`IVA (16%): $${cotizaciones.iva_cot}`, marginRight, totalsStartY + 10, { align: "right" });
        if (tipopersona === "moral") {
            doc.text(`ISR (1.25%): -$${cotizaciones.isr_cot}`, marginRight, totalsStartY + 15, { align: "right" });
        }
        doc.text(`Total: $${cotizaciones.total_cot}`, marginRight, totalsStartY + 20, { align: "right" });

        doc.text("Importe en letras:", marginLeft, totalsStartY + 30);
        doc.text(`(${cotizaciones.monlet_cot} 25/100)`, marginLeft + 40, totalsStartY + 30);

        const notasStartY = totalsStartY + 40;
        doc.text("Notas:", marginLeft, notasStartY);
        const notas = doc.splitTextToSize(cotizaciones.notas_cot, pageWidth - 2 * marginLeft);
        notas.forEach((line, index) => {
            doc.text(line, marginLeft, notasStartY + 10 + index * 5);
        });

        const pagoStartY = notasStartY + 45;
        doc.text("Datos para forma de pago por cheque o transferencia electrónica de fondos", marginLeft, pagoStartY);
        doc.text("Razón Social:              Jaime Hidalgo Reygadas", marginLeft, pagoStartY + 10);
        doc.text("Banorte Cta:                0123456789", marginLeft, pagoStartY + 15);
        doc.text("Clave Interbancaria:    059 929 2017381038 0", marginLeft, pagoStartY + 20);

        const contactoStartY = pagoStartY + 35;
        doc.text("Contacto:", marginLeft, contactoStartY);
        doc.text("Ing. Jaime Hidalgo R", marginLeft, contactoStartY + 10);
        doc.text("Dirección y Ventas", marginLeft, contactoStartY + 15);
        doc.text("Celular: 2225-772053                                                    Email. ing.jaimehidalgo@gmail.com", marginLeft, contactoStartY + 20);

        doc.save(`Cotizacion_${cotizaciones.nomper_cot}.pdf`);
    }

    const get_cliente = async () => {
        try {
            const url = 'http://localhost/bdinprosi/webservice/gestion/get_nom_clie';
            const response = await axios.get(url, {
                headers: { 'Content-Type': 'application/json' }
            });

            setCliente(response.data.cliente);
        } catch (error) {
            console.error(error);
        }
    }

    const get_producto = async () => {
        try {
            const url = 'http://localhost/bdinprosi/webservice/gestion/get_nom_prod';
            const response = await axios.get(url, {
                headers: { 'Content-Type': 'application/json' }
            });

            setProducto(response.data.producto);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        get_cliente();
        get_producto();
    }, [])

    return (
        <div className='container-fluid'>
            <Button variant='outline-warning' onClick={OpenModal}>
                <i className="bi bi-pencil-square"></i>
            </Button>

            <Modal show={show} onHide={CloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Generación de Cotización</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={cotizar}>
                        <section className='mb-2'>
                            <h4 className="text-danger fw-bold mb-3 text-center">Datos Generales</h4>
                            <Form.Group controlId="tipopersona" className="mb-2">
                                <Form.Label style={{ fontWeight: 'bold' }}>Tipo de Persona: </Form.Label>
                                <Form.Select value={tipopersona} onChange={personatipo}>
                                    <option value="">Selecciona tipo de persona</option>
                                    <option value="fisica">Persona Física</option>
                                    <option value="moral">Persona Moral</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group controlId='nomper_cot' className='mb-2'>
                                <Form.Label style={{ fontWeight: 'bold' }}>A quién va dirigida (Nombre o Razón Social): </Form.Label>
                                <Form.Control type='text' name='nomper_cot' placeholder='Nombre de la persona o empresa' value={cotizaciones.nomper_cot} onChange={Change} />
                            </Form.Group>
                            <Form.Group controlId="razonsoc_cot" className="mb-2">
                                <Form.Label className="d-flex" style={{ fontWeight: "bold" }}>Redacción de la cotización:</Form.Label>
                                <Form.Control type="text" as="textarea" rows={4} placeholder="Contenido de la cotización" name='razonsoc_cot' value={cotizaciones.razonsoc_cot} onChange={Change} />
                            </Form.Group>
                            <Form.Group controlId="id_clie" className="mb-2">
                                <Form.Label className="d-flex" style={{ fontWeight: "bold" }}>Cliente</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="id_clie"
                                    value={cliente.find(client => client.id_clie === cotizaciones.id_clie)?.nom_clie || ''}
                                    readOnly
                                />
                            </Form.Group>
                        </section>
                        <section>
                            <h4 className="text-danger fw-bold mb-3 text-center">Detalles del Producto/Servicio</h4>
                            <Form.Group controlId="id_prod" className="mb-3">
                                <Form.Label className="d-flex" style={{ fontWeight: "bold" }}>Producto:</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="id_prod"
                                    value={producto.find(product => product.id_prod === cotizaciones.id_prod)?.nom_prod || ''}
                                    readOnly
                                />
                            </Form.Group>
                            <Form.Group controlId="desc_cot" className="mb-2">
                                <Form.Label className='d-flex' style={{ fontWeight: 'bold' }}>Descripción del producto:</Form.Label>
                                <Form.Control type="text" name='desc_cot' placeholder='Escribe una breve descripción' value={cotizaciones.desc_cot} readOnly />
                            </Form.Group>
                            <Form.Group controlId="img_cot" className="mb-2">
                                <Form.Label className='d-flex' style={{ fontWeight: 'bold' }}>Imagen Previa:</Form.Label>
                                <Form.Control type="file" name='img_cot' onChange={Change} />
                            </Form.Group>
                            <Form.Group controlId="uniprod_cot" className="mb-2">
                                <Form.Label className='d-flex' style={{ fontWeight: 'bold' }}>Unidad de Medida:</Form.Label>
                                <Form.Control type="text" name='uniprod_cot' placeholder="Unidad de medida" value={cotizaciones.uniprod_cot} onChange={Change} />
                            </Form.Group>
                            <Form.Group controlId="cantprod_cot" className="mb-2">
                                <Form.Label className='d-flex' style={{ fontWeight: 'bold' }}>Cantidad:</Form.Label>
                                <Form.Control type="number" name='cantprod_cot' placeholder="Cantidad solicitada" value={cotizaciones.cantprod_cot} min='0' readOnly />
                            </Form.Group>
                            <Form.Group controlId="precprod_cot" className="mb-2">
                                <Form.Label className='d-flex' style={{ fontWeight: 'bold' }}>Precio Unitario:</Form.Label>
                                <Form.Control type="number" name='precprod_cot' placeholder="Precio unitario" value={cotizaciones.precprod_cot} min='0' step='0.01' onChange={Change} />
                            </Form.Group>
                            <Form.Group controlId="imptot_cot" className="mb-2">
                                <Form.Label className='d-flex' style={{ fontWeight: 'bold' }}>Importe Total:</Form.Label>
                                <Form.Control type="number" name='imptot_cot' placeholder="Importe total" value={cotizaciones.imptot_cot || ''} min='0' step='0.01' onChange={Change} />
                            </Form.Group>
                        </section>

                        <section className='mb-3'>
                            <h4 className="text-danger fw-bold mb-3 text-center">Totales</h4>
                            <Form.Group controlId="subtot_cot" className="mb-2">
                                <Form.Label className='d-flex' style={{ fontWeight: 'bold' }}>Subtotal:</Form.Label>
                                <Form.Control type="number" name="subtot_cot" value={cotizaciones.subtot_cot || ''} min='0' step='0.01' onChange={Change} />
                            </Form.Group>
                            <Form.Group controlId="iva_cot" className="mb-2">
                                <Form.Label className='d-flex' style={{ fontWeight: 'bold' }}>IVA (16%):</Form.Label>
                                <Form.Control type="number" name="iva_cot" value={cotizaciones.iva_cot || ''} min='0' step='0.01' onChange={Change} />
                            </Form.Group>
                            {tipopersona === "moral" && (
                                <Form.Group controlId="isr_cot" className="mb-3">
                                    <Form.Label className='d-flex' style={{ fontWeight: 'bold' }}>ISR(1.25%):</Form.Label>
                                    <Form.Control type="number" name='isr_cot' placeholder="ISR" value={cotizaciones.isr_cot || ''} min='0' step='0.01' onChange={Change} />
                                </Form.Group>
                            )}
                            <Form.Group controlId="total_cot" className="mb-2">
                                <Form.Label className='d-flex' style={{ fontWeight: 'bold' }}>Total:</Form.Label>
                                <Form.Control type="number" name="total_cot" value={cotizaciones.total_cot || ''} min='0' step='0.01' onChange={Change} />
                            </Form.Group>
                            <Form.Group controlId="monlet_cot">
                                <Form.Label>Importe en Letras</Form.Label>
                                <Form.Control type="text" value={cotizaciones.monlet_cot} readOnly />
                            </Form.Group>
                            <Form.Group controlId="notas_cot" className="mb-2">
                                <Form.Label className='d-flex' style={{ fontWeight: 'bold' }}>Notas:</Form.Label>
                                <Form.Control as="textarea" rows={3} name="notas_cot" placeholder="Notas adicionales" value={cotizaciones.notas_cot} onChange={Change} />
                            </Form.Group>
                        </section>

                        <section>
                            <Button className='me-3' variant='secondary' onClick={CloseModal}>Cancelar</Button>
                            <Button variant='primary' type='submit'>Generar Cotización</Button>
                        </section>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default UpdateCot;

/* import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Button, Modal, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf'; 
import { alertaglobal, cotizacionsuccess } from '../alertas';

const UpdateCot = ({ cotizacion, id_cot, onSuccess }) => {
    const [show, setShow] = useState(false);
    const [tipopersona, setTipopersona] = useState('');
    const [cliente, setCliente] = useState([]);
    const [producto, setProducto] = useState([]);
    const [cotizaciones, setCotizaciones] = useState({
        nomper_cot: cotizacion.nomper_cot || '',
        razonsoc_cot: cotizacion.razonsoc_cot || '',
        id_clie: cotizacion.id_clie || '',
        id_prod: cotizacion.id_prod || '',
        desc_cot: cotizacion.desc_cot || '',
        img_cot: cotizacion.img_cot || '',
        cantprod_cot: cotizacion.cantprod_cot || '',
        uniprod_cot: cotizacion.uniprod_cot || '',
        precprod_cot: cotizacion.precprod_cot || '',
        imptot_cot: cotizacion.imptot_cot || '',
        subtot_cot: cotizacion.subtot_cot || '',
        iva_cot: cotizacion.iva_cot || '',
        isr_cot: cotizacion.isr_cot || '',
        total_cot: cotizacion.total_cot || '',
        monlet_cot: cotizacion.monlet_cot || '',
        notas_cot: cotizacion.notas_cot || ''
    });

    const OpenModal = () => setShow(true);
    const CloseModal = () => setShow(false);

    const personatipo = (e) => {
        setTipopersona(e.target.value);
    }

    const numberToWords = (num) => {
        const unidades = ['cero', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve'];
        const decenas = ['diez', 'veinte', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa'];
        const excepcionesDecenas = ['once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve'];
        const centenas = ['cien', 'doscientos', 'trescientos', 'cuatrocientos', 'quinientos', 'seiscientos', 'setecientos', 'ochocientos', 'novecientos'];

        const miles = ['', 'mil', 'millón', 'mil millones', 'billón'];

        const convertir = (n) => {
            if (n < 10) return unidades[n];
            if (n >= 11 && n <= 19) return excepcionesDecenas[n - 11];
            if (n < 100) {
                const d = Math.floor(n / 10);
                const u = n % 10;
                return u === 0 ? decenas[d - 1] : `${decenas[d - 1]} y ${unidades[u]}`;
            }
            if (n < 1000) {
                const c = Math.floor(n / 100);
                const resto = n % 100;
                return resto === 0 ? centenas[c - 1] : `${centenas[c - 1]} ${convertir(resto)}`;
            }
            if (n < 1_000_000) {
                const milesPart = Math.floor(n / 1000);
                const resto = n % 1000;
                const milesTexto = milesPart === 1 ? 'mil' : `${convertir(milesPart)} mil`;
                return resto === 0 ? milesTexto : `${milesTexto} ${convertir(resto)}`;
            }
            if (n < 1_000_000_000) {
                const millonesPart = Math.floor(n / 1_000_000);
                const resto = n % 1_000_000;
                const millonesTexto = millonesPart === 1 ? 'un millón' : `${convertir(millonesPart)} millones`;
                return resto === 0 ? millonesTexto : `${millonesTexto} ${convertir(resto)}`;
            }
            if (n < 1_000_000_000_000) {
                const billonesPart = Math.floor(n / 1_000_000_000);
                const resto = n % 1_000_000_000;
                const billonesTexto = billonesPart === 1 ? 'mil millones' : `${convertir(billonesPart)} mil millones`;
                return resto === 0 ? billonesTexto : `${billonesTexto} ${convertir(resto)}`;
            }
            return 'Número demasiado grande';
        };

        const entero = Math.floor(num);
        const decimales = Math.round((num - entero) * 100);

        const enteroTexto = convertir(entero);
        const decimalesTexto = decimales > 0 ? `con ${convertir(decimales)} centavos` : '';

        return `${enteroTexto} ${decimalesTexto}`;
    }



    useEffect(() => {
        const calcularTotales = () => {
            const cantidad = parseFloat(cotizaciones.cantprod_cot) || 0;
            const precioUnitario = parseFloat(cotizaciones.precprod_cot) || 0;

            const importe = cantidad * precioUnitario;
            const subtotal = importe;
            const iva = subtotal * 0.16;
            const isr = tipopersona === "moral" ? subtotal * 0.0125 : 0;
            const total = subtotal + iva - isr;

            const importeEnLetras = numberToWords(total);

            setCotizaciones((prevState) => ({
                ...prevState,
                imptot_cot: importe.toFixed(2),
                subtot_cot: subtotal.toFixed(2),
                iva_cot: iva.toFixed(2),
                isr_cot: isr.toFixed(2),
                total_cot: total.toFixed(2),
                monlet_cot: importeEnLetras,
            }));
        };

        if (tipopersona) {
            calcularTotales();
        }
    }, [cotizaciones.cantprod_cot, cotizaciones.precprod_cot, tipopersona, cotizaciones]);



    const Change = (e) => {
        const { name, value } = e.target;
        setCotizaciones((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    const cotizar = async (e) => {
        e.preventDefault();
        if (tipopersona === 'fisica') {
            try {
                const url = `http://localhost/bdinprosi/webservice/gestion/update_cotizacion_fisica/${id_cot}`;
                const response = await axios.post(url, cotizaciones, {
                    headers: { 'Content-Type': 'application/json' }
                });
                setCotizaciones(response.data);
                console.log('Cotización fisica realizada exitosamente');
                onSuccess(response.data);
                cotizacionsuccess();
                cotfisica();
                CloseModal();
            } catch (error) {
                console.error(error);
                console.log('Error al realizar la petición');
                alertaglobal();
            }
        } else if (tipopersona === 'moral') {
            try {
                const url = `http://localhost/bdinprosi/webservice/gestion/update_cotizacion_moral/${id_cot}`;
                const response = await axios.post(url, cotizaciones, {
                    headers: { 'Content-Type': 'application/json' }
                });
                setCotizaciones(response.data);
                console.log('Cotización moral realizada exitosamente');
                onSuccess(response.data);
                cotizacionsuccess();
                CloseModal();
                cotmoral();
            } catch (error) {
                console.error(error);
                console.log('Error al realizar la petición');
                alertaglobal();
            }
        }
    }


    const cotfisica = () => {
        const doc = new jsPDF();

        const marginLeft = 20;
        const pageWidth = doc.internal.pageSize.width;
        const marginRight = pageWidth - marginLeft;

        doc.setFontSize(16);
        doc.setFont("helvetica", "bold");
        doc.text("Cotización", pageWidth / 2, 20, { align: "center" });

        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text("Atención:", marginLeft, 40);

        doc.setFont("helvetica", "normal");
        doc.text(`         A quién corresponda: (${cotizaciones.nomper_cot})`, marginLeft, 46);

        const redaccion = `${cotizaciones.razonsoc_cot}`;
        const textArray = doc.splitTextToSize(redaccion, pageWidth - 2 * marginLeft);
        textArray.forEach((line, index) => {
            doc.text(line, marginLeft, 52 + index * 5);
        });

        const tableStartY = 90;
        const tableHeaders = [
            "Producto",
            "Cantidad",
            "Unidad de Medida",
            "Descripción",
            "Costo Unitario",
            "Importe",
        ];
        const tableBody = [
            [
                cotizaciones.id_prod,
                cotizaciones.cantprod_cot,
                cotizaciones.uniprod_cot,
                cotizaciones.desc_cot,
                cotizaciones.precprod_cot,
                cotizaciones.imptot_cot,
            ],
        ];

        doc.autoTable({
            startY: tableStartY,
            head: [tableHeaders],
            body: tableBody,
            headStyles: { fillColor: [200, 200, 200], textColor: 0 },
            bodyStyles: { fontSize: 10, textColor: 50 },
            styles: { halign: "center", cellPadding: 3 },
        });

        const totalsStartY = doc.lastAutoTable.finalY + 20;
        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
        doc.text(`Subtotal: $${cotizaciones.subtot_cot}`, marginRight, totalsStartY, { align: "right" });
        doc.text(`IVA (16%): $${cotizaciones.iva_cot}`, marginRight, totalsStartY + 10, { align: "right" });
        if (tipopersona === "moral") {
            doc.text(`ISR (1.25%): -$${cotizaciones.isr_cot}`, marginRight, totalsStartY + 15, { align: "right" });
        }
        doc.text(`Total: $${cotizaciones.total_cot}`, marginRight, totalsStartY + 20, { align: "right" });

        doc.text("Importe en letras:", marginLeft, totalsStartY + 30);
        doc.text(`(${cotizaciones.monlet_cot} 25/100)`, marginLeft + 40, totalsStartY + 30);

        const notasStartY = totalsStartY + 40;
        doc.text("Notas:", marginLeft, notasStartY);
        const notas = doc.splitTextToSize(cotizaciones.notas_cot, pageWidth - 2 * marginLeft);
        notas.forEach((line, index) => {
            doc.text(line, marginLeft, notasStartY + 10 + index * 5);
        });

        const pagoStartY = notasStartY + 45;
        doc.text("Datos para forma de pago por cheque o transferencia electrónica de fondos", marginLeft, pagoStartY);
        doc.text("Razón Social:              Jaime Hidalgo Reygadas", marginLeft, pagoStartY + 10);
        doc.text("Banorte Cta:                0123456789", marginLeft, pagoStartY + 15);
        doc.text("Clave Interbancaria:    059 929 2017381038 0", marginLeft, pagoStartY + 20);

        const contactoStartY = pagoStartY + 35;
        doc.text("Contacto:", marginLeft, contactoStartY);
        doc.text("Ing. Jaime Hidalgo R", marginLeft, contactoStartY + 10);
        doc.text("Dirección y Ventas", marginLeft, contactoStartY + 15);
        doc.text("Celular: 2225-772053                                                    Email. ing.jaimehidalgo@gmail.com", marginLeft, contactoStartY + 20);

        doc.save(`Cotizacion_${cotizaciones.nomper_cot}.pdf`);
    }

    const cotmoral = () => {
        const doc = new jsPDF();

        const marginLeft = 20;
        const pageWidth = doc.internal.pageSize.width;
        const marginRight = pageWidth - marginLeft;

        doc.setFontSize(16);
        doc.setFont("helvetica", "bold");
        doc.text("Cotización", pageWidth / 2, 20, { align: "center" });

        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text("Atención:", marginLeft, 40);

        doc.setFont("helvetica", "normal");
        doc.text(`         A quién corresponda: (${cotizaciones.nomper_cot})`, marginLeft, 46);

        const redaccion = `${cotizaciones.razonsoc_cot}`;
        const textArray = doc.splitTextToSize(redaccion, pageWidth - 2 * marginLeft);
        textArray.forEach((line, index) => {
            doc.text(line, marginLeft, 52 + index * 5);
        });

        const tableStartY = 90;
        const tableHeaders = [
            "Producto",
            "Cantidad",
            "Unidad de Medida",
            "Descripción",
            "Costo Unitario",
            "Importe",
        ];
        const tableBody = [
            [
                cotizaciones.id_prod,
                cotizaciones.cantprod_cot,
                cotizaciones.uniprod_cot,
                cotizaciones.desc_cot,
                cotizaciones.precprod_cot,
                cotizaciones.imptot_cot,
            ],
        ];

        doc.autoTable({
            startY: tableStartY,
            head: [tableHeaders],
            body: tableBody,
            headStyles: { fillColor: [200, 200, 200], textColor: 0 },
            bodyStyles: { fontSize: 10, textColor: 50 },
            styles: { halign: "center", cellPadding: 3 },
        });

        const totalsStartY = doc.lastAutoTable.finalY + 20;
        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
        doc.text(`Subtotal: $${cotizaciones.subtot_cot}`, marginRight, totalsStartY, { align: "right" });
        doc.text(`IVA (16%): $${cotizaciones.iva_cot}`, marginRight, totalsStartY + 10, { align: "right" });
        if (tipopersona === "moral") {
            doc.text(`ISR (1.25%): -$${cotizaciones.isr_cot}`, marginRight, totalsStartY + 15, { align: "right" });
        }
        doc.text(`Total: $${cotizaciones.total_cot}`, marginRight, totalsStartY + 20, { align: "right" });

        doc.text("Importe en letras:", marginLeft, totalsStartY + 30);
        doc.text(`(${cotizaciones.monlet_cot} 25/100)`, marginLeft + 40, totalsStartY + 30);

        const notasStartY = totalsStartY + 40;
        doc.text("Notas:", marginLeft, notasStartY);
        const notas = doc.splitTextToSize(cotizaciones.notas_cot, pageWidth - 2 * marginLeft);
        notas.forEach((line, index) => {
            doc.text(line, marginLeft, notasStartY + 10 + index * 5);
        });

        const pagoStartY = notasStartY + 45;
        doc.text("Datos para forma de pago por cheque o transferencia electrónica de fondos", marginLeft, pagoStartY);
        doc.text("Razón Social:              Jaime Hidalgo Reygadas", marginLeft, pagoStartY + 10);
        doc.text("Banorte Cta:                0123456789", marginLeft, pagoStartY + 15);
        doc.text("Clave Interbancaria:    059 929 2017381038 0", marginLeft, pagoStartY + 20);

        const contactoStartY = pagoStartY + 35;
        doc.text("Contacto:", marginLeft, contactoStartY);
        doc.text("Ing. Jaime Hidalgo R", marginLeft, contactoStartY + 10);
        doc.text("Dirección y Ventas", marginLeft, contactoStartY + 15);
        doc.text("Celular: 2225-772053                                                    Email. ing.jaimehidalgo@gmail.com", marginLeft, contactoStartY + 20);

        doc.save(`Cotizacion_${cotizaciones.nomper_cot}.pdf`);
    }

    const get_cliente = async () => {
        try {
            const url = 'http://localhost/bdinprosi/webservice/gestion/get_nom_clie';
            const response = await axios.get(url, {
                headers: { 'Content-Type': 'application/json' }
            });

            setCliente(response.data.cliente);
            console.log('Datos de estados exitoso');
        } catch (error) {
            console.error(error);
            console.log('Error al realizar la petición');
        }
    }

    const get_producto = async () => {
        try {
            const url = 'http://localhost/bdinprosi/webservice/gestion/get_nom_prod';
            const response = await axios.get(url, {
                headers: { 'Content-Type': 'application/json' }
            });

            setProducto(response.data.producto);
            console.log('Datos de estados exitoso');
        } catch (error) {
            console.error(error);
            console.log('Error al realizar la petición');
        }
    }

    useEffect(() => {
        get_cliente();
        get_producto();
    }, [])

    return (
        <div className='container-fluid'>
            <Button variant='outline-warning' onClick={OpenModal}>
                <i className="bi bi-pencil-square"></i>
            </Button>

            <Modal show={show} onHide={CloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Generación de Cotización</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={cotizar}>
                        <section className='mb-2'>
                            <h4 className="text-danger fw-bold mb-3 text-center">Datos Generales</h4>
                            <Form.Group controlId="tipopersona" className="mb-2">
                                <Form.Label style={{ fontWeight: 'bold' }}>Tipo de Persona: </Form.Label>
                                <Form.Select value={tipopersona} onChange={personatipo}>
                                    <option value="">Selecciona tipo de persona</option>
                                    <option value="fisica">Persona Física</option>
                                    <option value="moral">Persona Moral</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group controlId='nomper_cot' className='mb-2'>
                                <Form.Label style={{ fontWeight: 'bold' }}>A quién va dirigida (Nombre o Razón Social): </Form.Label>
                                <Form.Control type='text' name='nomper_cot' placeholder='Nombre de la persona o empresa' value={cotizaciones.nomper_cot} onChange={Change} />
                            </Form.Group>
                            <Form.Group controlId="razonsoc_cot" className="mb-2">
                                <Form.Label className="d-flex" style={{ fontWeight: "bold" }}>Redacción de la cotización:</Form.Label>
                                <Form.Control type="text" as="textarea" rows={4} placeholder="Contenido de la cotización" name='razonsoc_cot' value={cotizaciones.razonsoc_cot} onChange={Change} />
                            </Form.Group>
                            <Form.Group controlId="id_clie" className="mb-2">
                                <Form.Label className="d-flex" style={{ fontWeight: "bold" }}>Cliente</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="id_clie"
                                    value={cliente.find(client => client.id_clie === cotizaciones.id_clie)?.nom_clie || ''}
                                    readOnly
                                />
                            </Form.Group>
                        </section>
                        <section>
                            <h4 className="text-danger fw-bold mb-3 text-center">Detalles del Producto/Servicio</h4>
                            <Form.Group controlId="id_prod" className="mb-3">
                                <Form.Label className="d-flex" style={{ fontWeight: "bold" }}>Producto:</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="id_prod"
                                    value={producto.find(product => product.id_prod === cotizaciones.id_prod)?.nom_prod || ''}
                                    readOnly
                                />
                            </Form.Group>
                            <Form.Group controlId="desc_cot" className="mb-2">
                                <Form.Label className='d-flex' style={{ fontWeight: 'bold' }}>Descripción del producto:</Form.Label>
                                <Form.Control type="text" name='desc_cot' placeholder='Escribe una breve descripción' value={cotizaciones.desc_cot} readOnly />
                            </Form.Group>
                            <Form.Group controlId="img_cot" className="mb-2">
                                <Form.Label className='d-flex' style={{ fontWeight: 'bold' }}>Imagen Previa:</Form.Label>
                                <Form.Control type="file" name='img_cot' onChange={Change} />
                            </Form.Group>
                            <Form.Group controlId="uniprod_cot" className="mb-2">
                                <Form.Label className='d-flex' style={{ fontWeight: 'bold' }}>Unidad de Medida:</Form.Label>
                                <Form.Control type="text" name='uniprod_cot' placeholder="Unidad de medida" value={cotizaciones.uniprod_cot} onChange={Change} />
                            </Form.Group>
                            <Form.Group controlId="cantprod_cot" className="mb-2">
                                <Form.Label className='d-flex' style={{ fontWeight: 'bold' }}>Cantidad:</Form.Label>
                                <Form.Control type="number" name='cantprod_cot' placeholder="Cantidad solicitada" value={cotizaciones.cantprod_cot} min='0' readOnly />
                            </Form.Group>
                            <Form.Group controlId="precprod_cot" className="mb-2">
                                <Form.Label className='d-flex' style={{ fontWeight: 'bold' }}>Precio Unitario:</Form.Label>
                                <Form.Control type="number" name='precprod_cot' placeholder="Precio unitario" value={cotizaciones.precprod_cot} min='0' onChange={Change} />
                            </Form.Group>
                            <Form.Group controlId="imptot_cot" className="mb-2">
                                <Form.Label className='d-flex' style={{ fontWeight: 'bold' }}>Importe Total:</Form.Label>
                                <Form.Control type="number" name='imptot_cot' placeholder="Importe total" value={cotizaciones.imptot_cot || ''} min='0' onChange={Change} />
                            </Form.Group>
                        </section>

                        <section className='mb-3'>
                            <h4 className="text-danger fw-bold mb-3 text-center">Totales</h4>
                            <Form.Group controlId="subtot_cot" className="mb-2">
                                <Form.Label className='d-flex' style={{ fontWeight: 'bold' }}>Subtotal:</Form.Label>
                                <Form.Control type="number" name="subtot_cot" value={cotizaciones.subtot_cot || ''} min='0' onChange={Change} />
                            </Form.Group>
                            <Form.Group controlId="iva_cot" className="mb-2">
                                <Form.Label className='d-flex' style={{ fontWeight: 'bold' }}>IVA (16%):</Form.Label>
                                <Form.Control type="number" name="iva_cot" value={cotizaciones.iva_cot || ''} min='0' onChange={Change} />
                            </Form.Group>
                            {tipopersona === "moral" && (
                                <Form.Group controlId="isr_cot" className="mb-3">
                                    <Form.Label className='d-flex' style={{ fontWeight: 'bold' }}>ISR(1.25%):</Form.Label>
                                    <Form.Control type="number" name='isr_cot' placeholder="ISR" value={cotizaciones.isr_cot || ''} min='0' onChange={Change} />
                                </Form.Group>
                            )}
                            <Form.Group controlId="total_cot" className="mb-2">
                                <Form.Label className='d-flex' style={{ fontWeight: 'bold' }}>Total:</Form.Label>
                                <Form.Control type="number" name="total_cot" value={cotizaciones.total_cot || ''} min='0' onChange={Change} />
                            </Form.Group>
                            <Form.Group controlId="monlet_cot">
                                <Form.Label>Importe en Letras</Form.Label>
                                <Form.Control type="text" value={cotizaciones.monlet_cot} readOnly />
                            </Form.Group>
                            <Form.Group controlId="notas_cot" className="mb-2">
                                <Form.Label className='d-flex' style={{ fontWeight: 'bold' }}>Notas:</Form.Label>
                                <Form.Control as="textarea" rows={3} name="notas_cot" placeholder="Notas adicionales" value={cotizaciones.notas_cot} onChange={Change} />
                            </Form.Group>
                        </section>

                        <section>
                            <Button className='me-3' variant='secondary' onClick={CloseModal}>Cancelar</Button>
                            <Button variant='primary' type='submit'>Generar Cotización</Button>
                        </section>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default UpdateCot;
 */