import CrudModule from '../components/shared/CrudModule';
import { generos } from '../api/endpoints/generos.api';
import GeneroForm from '../components/genero/GeneroForm';
import { BsTagFill } from 'react-icons/bs';

export default function GeneroPage() {
    return (
        <>
            <div className="page-header">
                <div>
                    <h1 className="page-title">Géneros</h1>
                    <p className="page-subtitle">Gestiona los géneros disponibles para las producciones</p>
                </div>
            </div>
            <CrudModule
                apiObj={generos}
                entityName="Género"
                nameField="nombre"
                FormComponent={GeneroForm}
                icon={<BsTagFill style={{ color: 'var(--color-success)', marginRight: '.5rem' }} />}
            />
        </>
    );
}
