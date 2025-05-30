import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Encabezado from '../components/Encabezado';
import Nav from '../components/Nav';
import '../styles/PanelAdmin.css';

// Configura Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const Admin = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalVentas: 0,
    totalInversion: 0,
    totalGanancias: 0
  });
  const [ventasPorMes, setVentasPorMes] = useState([]);
  const [proyectosPorEstado, setProyectosPorEstado] = useState([]);
  const [proveedoresFrecuentes, setProveedoresFrecuentes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ventasResponse = await fetch('http://localhost/bdinprosi/webservice/gestion/ventasMensuales');
        const ventasData = await ventasResponse.json();
        setVentasPorMes(ventasData);

        const statsResponse = await fetch('http://localhost/bdinprosi/webservice/gestion/monthlyStats');
        const statsData = await statsResponse.json();
        setStats(statsData);

        const proyectosResponse = await fetch('http://localhost/bdinprosi/webservice/gestion/proyectosPorEstado');
        const proyectosData = await proyectosResponse.json();
        setProyectosPorEstado(proyectosData);

        const proveedoresResponse = await fetch('http://localhost/bdinprosi/webservice/gestion/proveedoresFrecuentes');
        const proveedoresData = await proveedoresResponse.json();
        setProveedoresFrecuentes(proveedoresData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const nombresMeses = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const chartData = {
    labels: ventasPorMes.map(item => nombresMeses[item.mes - 1] || `Mes ${item.mes}`),
    datasets: [
      {
        label: 'Total Ventas',
        data: ventasPorMes.map(item => item.total_ventas),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ]
  };

  const chartPieData = {
    labels: ['Pendiente', 'En Proceso', 'Finalizado', 'Cancelado'],
    datasets: [
      {
        data: [
          proyectosPorEstado.find(item => item.estatus_vta === '0')?.total || 0,
          proyectosPorEstado.find(item => item.estatus_vta === '1')?.total || 0,
          proyectosPorEstado.find(item => item.estatus_vta === '2')?.total || 0,
          proyectosPorEstado.find(item => item.estatus_vta === '3')?.total || 0
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)', // Pendiente
          'rgba(54, 162, 235, 0.2)', // En Proceso
          'rgba(75, 192, 192, 0.2)', // Finalizado
          'rgba(255, 206, 86, 0.2)'  // Cancelado
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 206, 86, 1)'
        ],
        borderWidth: 1
      }
    ]
  };

  return (
    <div>
      <Encabezado />
      <Nav />
      <div className="row">
        <main className="mt-5 col-8">
          <section className="stats">
            <h2>Informe del Último Año</h2>
            <div className="stats-cards">
              <div className="card">
                <h3>Total de Ventas Generadas</h3>
                <p>{stats.totalVentas} ventas</p>
              </div>
              <div className="card">
                <h3>Inversión Total</h3>
                <p>$ {stats.totalInversion} MXN</p>
              </div>
              <div className="card">
                <h3>Ganancias</h3>
                <p>$ {stats.totalGanancias} MXN</p>
              </div>
            </div>
          </section>

          <section className="chart">
            <h2>Ventas del año por Mes</h2>
            <Bar data={chartData} />
          </section>

          <section className="chart">
            <h2>Ventas por Estado</h2>
            <Pie data={chartPieData} />
          </section>
          <section className="top-providers">
            <h2>Proveedores Más Frecuentes</h2>
            <table>
              <thead>
                <tr>
                  <th>Proveedor</th>
                  <th>Última Compra</th>
                </tr>
              </thead>
              <tbody>
              {proveedoresFrecuentes.map((prov, index) => (
        <tr key={index}>
          <td>{prov.nom_prov}</td>
          <td>
            {prov.ultima_compra 
              ? new Date(prov.ultima_compra).toLocaleDateString() 
              : "Sin registro"}
          </td>
        </tr>
      ))}
              </tbody>
            </table>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Admin;
