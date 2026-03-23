import CrudModule from '../components/shared/CrudModule';
import { tipos } from '../api/endpoints/tipos.api';
import TipoForm from '../components/tipo/TipoForm';
import { BsCameraReelsFill } from 'react-icons/bs';

export default function TipoPage() {
    return (
        <>
            <div className="page-header">
                <div>
                    <h1 className="page-title">Tipos de Producción</h1>
                    <p className="page-subtitle">Clasificaciones principales como Película, Serie o Documental</p>
                </div>
            </div>
            <CrudModule
                apiObj={tipos}
                entityName="Tipo"
                nameField="nombre"
                FormComponent={TipoForm}
                icon={<BsCameraReelsFill style={{ color: 'var(--color-danger)', marginRight: '.5rem' }} />}
            />
        </>
    );
}
