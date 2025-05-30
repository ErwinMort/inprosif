import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Encabezado from '../components/Encabezado';
import Nav from '../components/Nav';
import '../styles/panel.css';
import '../styles/panel1.css';
import GenerarEvidencias from '../components/evidencias/GenerarEvidencias';

const Evidencias = () => {
    return (
        <div>
            <Encabezado />
            <Nav />
            <div className="row">
                <main className="col-8 mt-5">
                    <GenerarEvidencias />
                </main>
            </div>
        </div>
    );
}

export default Evidencias;