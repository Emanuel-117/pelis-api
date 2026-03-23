import { NavLink, useLocation } from 'react-router-dom';
import {
    BsCameraReelsFill,
    BsCollectionPlayFill,
    BsPeopleFill,
    BsBuildingFill,
    BsTagFill,
    BsGridFill,
    BsChevronLeft,
    BsChevronRight,
} from 'react-icons/bs';
import { MdLocalMovies } from 'react-icons/md';
import { useApp } from '../../context/AppContext';

const NAV_ITEMS = [
    { to: '/', label: 'Dashboard', icon: <BsGridFill /> },
    { to: '/media', label: 'Media', icon: <BsCollectionPlayFill /> },
    { to: '/generos', label: 'Géneros', icon: <BsTagFill /> },
    { to: '/directores', label: 'Directores', icon: <BsPeopleFill /> },
    { to: '/productoras', label: 'Productoras', icon: <BsBuildingFill /> },
    { to: '/tipos', label: 'Tipos', icon: <BsCameraReelsFill /> },
];

export default function Sidebar() {
    const { state, toggleSidebar } = useApp();
    const collapsed = state.sidebarCollapsed;
    const location = useLocation();

    return (
        <aside className={`app-sidebar${collapsed ? ' collapsed' : ''}`}>
            {/* Header */}
            <div className="sidebar-header">
                <div className="sidebar-logo"><MdLocalMovies style={{ color: '#fff' }} /></div>
                <span className="sidebar-title">Las Pelis del Oeste</span>
            </div>

            {/* Navigation */}
            <nav className="sidebar-nav">
                <div className="sidebar-group-label">Navegación</div>
                {NAV_ITEMS.map(({ to, label, icon }) => (
                    <NavLink
                        key={to}
                        to={to}
                        end={to === '/'}
                        className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
                        title={collapsed ? label : undefined}
                    >
                        <span className="icon">{icon}</span>
                        <span className="sidebar-link-label">{label}</span>
                    </NavLink>
                ))}
            </nav>

            {/* Toggle Collapse */}
            <button
                onClick={toggleSidebar}
                title={collapsed ? 'Expandir' : 'Colapsar'}
                style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 .75rem 1rem',
                    background: 'rgba(108,99,255,.1)',
                    border: '1px solid rgba(108,99,255,.2)',
                    borderRadius: 'var(--radius-sm)',
                    color: 'var(--color-text-muted)',
                    cursor: 'pointer', padding: '.55rem',
                    transition: 'var(--transition)', fontFamily: 'var(--font)',
                }}
            >
                {collapsed ? <BsChevronRight /> : <BsChevronLeft />}
                {!collapsed && <span style={{ fontSize: '.8rem', marginLeft: '.5rem', fontWeight: 500 }}>Colapsar</span>}
            </button>
        </aside>
    );
}
