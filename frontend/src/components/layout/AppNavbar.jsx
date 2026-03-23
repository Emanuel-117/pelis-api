import { useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { BsList } from 'react-icons/bs';
import { MdLocalMovies } from 'react-icons/md';

const BREADCRUMBS = {
    '/': ['Dashboard'],
    '/generos': ['Catálogos', 'Géneros'],
    '/directores': ['Catálogos', 'Directores'],
    '/productoras': ['Catálogos', 'Productoras'],
    '/tipos': ['Catálogos', 'Tipos'],
    '/media': ['Contenido', 'Media'],
    '/media/nueva': ['Contenido', 'Media', 'Nuevo registro'],
};

export default function AppNavbar() {
    const { toggleSidebar } = useApp();
    const { pathname } = useLocation();

    const isEdit = pathname.startsWith('/media/editar/');
    const crumbs = isEdit
        ? ['Contenido', 'Media', 'Editar registro']
        : BREADCRUMBS[pathname] ?? ['Página'];

    return (
        <header className="app-navbar">
            <button className="navbar-toggle-btn" onClick={toggleSidebar} aria-label="Toggle sidebar">
                <BsList size={22} />
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '.6rem', marginRight: 'auto' }}>
                <MdLocalMovies style={{ color: 'var(--color-accent)', fontSize: '1.3rem' }} />
                <span className="navbar-brand-text">IU Digital Antioquia</span>
            </div>
            <nav className="breadcrumb-nav" aria-label="Breadcrumb">
                {crumbs.map((c, i) => (
                    <span key={c} style={{ display: 'flex', alignItems: 'center', gap: '.4rem' }}>
                        {i > 0 && <span className="sep">/</span>}
                        <span className={i === crumbs.length - 1 ? 'current' : ''}>{c}</span>
                    </span>
                ))}
            </nav>
        </header>
    );
}
