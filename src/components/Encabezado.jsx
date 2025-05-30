import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../styles/panel.css';
import '../styles/panel1.css';

const Encabezado = () => {
    return (
        <div>
            <header>
                <div className="logo" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px' }}>
                    <h1 style={{ margin: 0, marginLeft: '110px', fontSize:'2rem', flexGrow: 1, textAlign: 'center', fontWeight: 'bold' }}>PANEL DE ADMINISTRACIÓN - INPROSI</h1>
                </div>
            </header>
        </div>
    );
}

export default Encabezado;
