import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Encabezado from '../components/Encabezado';
import Nav from '../components/Nav';
import TablaVentas from '../components/ventas/TablaVentas';

const GestionVentas = () => {
    return (
        <div>
            <Encabezado />
            <Nav />
            <div className="row" >
                    <main className="mt-5 col-8"> 
                        <TablaVentas />
                    </main>
            </div>
        </div>
    );
}

export default GestionVentas;
