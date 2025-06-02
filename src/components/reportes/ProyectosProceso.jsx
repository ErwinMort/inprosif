import axios from 'axios';
import * as ReportesPdf from './utils/ReportesPdf'; // Asegúrate de que la ruta sea correcta

export const ProyectosProceso = async ({ fechainicio, fechafin }) => {
    try {
        // Función para generar el reporte de proyectos en proceso
        const response = await axios.post('http://localhost/bdinprosi/webservice/gestion/reporteproceso', {
            fechainicio,
            fechafin,
        });
        if (response.status === 200 && response.data.status === "success") {
            ReportesPdf.ProcesoPdf({
                fechainicio,
                fechafin,
                datos: response.data.data, // Asegúrate de que la estructura de datos sea correcta
            });
        } else {
            console.error("Error al generar el reporte de proyectos en proceso:", response.data);
        }

        return response.data; // Retorna los datos del reporte
    } catch (error) {
        console.error("Error al generar el reporte de proyectos en proceso:", error);
        return;
    }
}