import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { generos } from '../api/endpoints/generos.api';
import { directores } from '../api/endpoints/directores.api';
import { productoras } from '../api/endpoints/productoras.api';
import { tipos } from '../api/endpoints/tipos.api';
import { media } from '../api/endpoints/media.api';
import {
    BsCollectionPlayFill, BsTagFill, BsPeopleFill,
    BsBuildingFill, BsCameraReelsFill, BsArrowRight,
} from 'react-icons/bs';

const CARDS = [
    { label: 'Producciones', icon: <BsCollectionPlayFill />, path: '/media', color: '#6c63ff', fetch: media.getAll },
    { label: 'Géneros', icon: <BsTagFill />, path: '/generos', color: '#10b981', fetch: generos.getAll },
    { label: 'Directores', icon: <BsPeopleFill />, path: '/directores', color: '#3b82f6', fetch: directores.getAll },
    { label: 'Productoras', icon: <BsBuildingFill />, path: '/productoras', color: '#f59e0b', fetch: productoras.getAll },
    { label: 'Tipos', icon: <BsCameraReelsFill />, path: '/tipos', color: '#ef4444', fetch: tipos.getAll },
];

export default function Dashboard() {
    const [counts, setCounts] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        CARDS.forEach(({ label, fetch }) => {
            fetch().then((r) => {
                setCounts((prev) => ({ ...prev, [label]: r.data?.total ?? r.data?.data?.length ?? 0 }));
            }).catch(() => { });
        });
    }, []);

    return (
        <div className="page-fade">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Panel de Administración</h1>
                    <p className="page-subtitle">Gestiona el contenido de la plataforma de entretenimiento</p>
                </div>
            </div>

            <div className="stats-grid">
                {CARDS.map(({ label, icon, path, color }) => (
                    <div
                        key={label}
                        className="glass-card stat-card"
                        style={{ cursor: 'pointer', color }}
                        onClick={() => navigate(path)}
                    >
                        <div className="stat-card-icon" style={{ background: `${color}1a` }}>{icon}</div>
                        <div className="stat-card-value" style={{ color: 'var(--color-text)' }}>
                            {counts[label] ?? <span style={{ fontSize: '1.2rem', opacity: .5 }}>—</span>}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span className="stat-card-label">{label}</span>
                            <BsArrowRight style={{ opacity: .4, fontSize: '.85rem' }} />
                        </div>
                    </div>
                ))}
            </div>

            <div className="glass-card" style={{ padding: '1.5rem' }}>
                <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '.5rem' }}>Bienvenido al CMS</h2>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '.9rem', lineHeight: 1.7, maxWidth: 600 }}>
                    Desde aquí puedes gestionar todo el contenido de la plataforma de entretenimiento de la{' '}
                    <strong style={{ color: 'var(--color-accent)' }}>Institución Universitaria Digital de Antioquia</strong>.
                    Administra géneros, directores, productoras, tipos y el catálogo completo de producciones audiovisuales.
                </p>
            </div>
        </div>
    );
}
