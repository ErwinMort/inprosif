import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Encabezado from '../components/Encabezado';
import Nav from '../components/Nav';
import TablaMaterial from '../components/material/TablaMaterial';

const GestionMaterial = () => {
    return (
        <div>
            <Encabezado />
            <Nav />
                <div className="row">
                    <main className="col-8 mt-5">
                        <TablaMaterial />
                    </main>
                </div>
        </div>
    );
}

export default GestionMaterial;
