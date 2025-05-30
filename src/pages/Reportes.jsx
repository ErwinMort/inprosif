import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Encabezado from '../components/Encabezado';
import Nav from '../components/Nav';
import GenerarReportes from '../components/reportes/GenerarReportes';
/* import GenReportes from '../components/reportes/GenReportes'; VANE*/

const Reportes = () => {
    return (
        <div>
            <Encabezado /> 
            <Nav />
                <div className="row">
                    <main className="col-8 mt-5">
                        <GenerarReportes />
                        {/* <GenReportes /> VANE */}
                    </main>
                </div>
        </div>
    );
}

export default Reportes;
