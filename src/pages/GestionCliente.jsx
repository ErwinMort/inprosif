import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Encabezado from '../components/Encabezado';
import Nav from '../components/Nav';
import TablaCliente from '../components/cliente/TablaCliente';

const GestionCliente = () => {
    return (
        <div>
            <Encabezado />
            <Nav />
            <div className="row">
                <main className="mt-5 col-9">
                    <TablaCliente />
                </main>
            </div>
        </div>
    );
}

export default GestionCliente;