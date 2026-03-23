import { BsCollectionPlayFill } from 'react-icons/bs';
import MediaList from '../components/media/MediaList';

export default function MediaPage() {
    return (
        <>
            <div className="page-header">
                <div>
                    <h1 className="page-title">
                        <BsCollectionPlayFill style={{ color: 'var(--color-accent)', marginRight: '.5rem', fontSize: '1.5rem' }} />
                        Catálogo Media
                    </h1>
                    <p className="page-subtitle">Gestiona las películas, documentales y series de la plataforma</p>
                </div>
            </div>
            <MediaList />
        </>
    );
}
