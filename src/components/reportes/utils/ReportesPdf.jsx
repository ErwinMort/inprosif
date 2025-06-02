import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const ProcesoPdf = async ({ fechainicio, fechafin, datos }) => {
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

    autoTable(doc, {
        head: [['Nombre del Proceso', 'Descripción', 'Características', 'Notas', 'Fecha']],
        body: tabla,
        startY: 60,
    });

    doc.save('reporte_proyectos_proceso.pdf');
};


export const FinalizadoPdf = ({ fechainicio, fechafin, datos }) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    // Título
    const titulo = 'Proyectos Finalizados';
    const tituloX = (pageWidth - doc.getTextWidth(titulo)) / 2;
    doc.setFontSize(18);
    doc.text(titulo, tituloX, 20);

    // Fechas
    doc.setFontSize(12);
    doc.text(`Fecha de Inicio: ${fechainicio}`, 14, 30);
    const fechaFinText = `Fecha de Fin: ${fechafin}`;
    const fechaFinX = pageWidth - doc.getTextWidth(fechaFinText) - 14;
    doc.text(fechaFinText, fechaFinX, 30);

    // Descripción
    const descripcionReporte =
        'Se detalla la información correspondiente a los proyectos ya finalizados o entregados con éxito.';
    const descripcionLineas = doc.splitTextToSize(descripcionReporte, pageWidth - 28);
    doc.text(descripcionLineas, 14, 40);

    // Tabla
    const tabla = datos.map((item) => [
        item.fecha_vta || item.fecha_solicitada || '-',
        item.unidad_vta || item.unidades || '-',
        item.costop_vta || item.costo || '-',
        item.nom_clie || item.cliente || '-',
        item.nom_prod || item.producto || '-',
    ]);

    autoTable(doc, {
        head: [['Fecha Solicitada', 'Unidades', 'Costo', 'Cliente', 'Producto']],
        body: tabla,
        startY: 60,
    });

    // Guardar
    doc.save('reporte_proyectos_finalizados.pdf');
};
