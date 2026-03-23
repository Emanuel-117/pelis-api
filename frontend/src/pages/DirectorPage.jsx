import CrudModule from '../components/shared/CrudModule';
import { directores } from '../api/endpoints/directores.api';
import DirectorForm from '../components/director/DirectorForm';
import { BsPeopleFill } from 'react-icons/bs';

export default function DirectorPage() {
    return (
        <>
            <div className="page-header">
                <div>
                    <h1 className="page-title">Directores</h1>
                    <p className="page-subtitle">Administra los directores registrados en el sistema</p>
                </div>
            </div>
            <CrudModule
                apiObj={directores}
                entityName="Director"
                nameField="nombres"
                FormComponent={DirectorForm}
                icon={<BsPeopleFill style={{ color: 'var(--color-info)', marginRight: '.5rem' }} />}
            />
        </>
    );
}
