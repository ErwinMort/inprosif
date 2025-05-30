import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Encabezado from '../components/Encabezado';
import Nav from '../components/Nav';
import TablaProceso from '../components/catprocesos/TablaProceso';

const GestionCatProceso = () => {
    return (
        <div>
            <Encabezado />
            <Nav />
            <div className="row">
                <main className="mt-5 col-9">
                    <TablaProceso />
                </main>
            </div>
        </div>
    );
}

export default GestionCatProceso;