import CrudModule from '../components/shared/CrudModule';
import { productoras } from '../api/endpoints/productoras.api';
import ProductoraForm from '../components/productora/ProductoraForm';
import { BsBuildingFill } from 'react-icons/bs';

export default function ProductoraPage() {
    return (
        <>
            <div className="page-header">
                <div>
                    <h1 className="page-title">Productoras</h1>
                    <p className="page-subtitle">Control de empresas productoras (Netflix, HBO, Warner, etc.)</p>
                </div>
            </div>
            <CrudModule
                apiObj={productoras}
                entityName="Productora"
                nameField="nombre"
                FormComponent={ProductoraForm}
                icon={<BsBuildingFill style={{ color: 'var(--color-warning)', marginRight: '.5rem' }} />}
            />
        </>
    );
}
