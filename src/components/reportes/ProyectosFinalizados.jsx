import axios from "axios";
import * as ReportesPdf from './utils/ReportesPdf'; // Asegúrate de que la ruta sea correcta

export const ProyectosFinalizados = async ({ fechainicio, fechafin }) => {
    try {
        // Función para generar el reporte de proyectos finalizados
        const response = await axios.post('http://localhost/bdinprosi/webservice/gestion/reportesfinalizados', {
            fechainicio,
            fechafin,
        });
        if (response.status === 200 && response.data.status === "success") {
            ReportesPdf.FinalizadoPdf({
                fechainicio,
                fechafin,
                datos: response.data.data, // Asegúrate que `data` exista
            });
        // } else {
            console.error("Error:", response.data);
        }

        return response.data;
    } catch (error) {
        console.error("Error al generar el reporte de proyectos finalizados:", error);
        return;
    }
}