/**
 * Badge visual para el campo estado de cualquier entidad.
 */
export default function StatusBadge({ estado }) {
    const isActive = estado === 'Activo';
    return (
        <span className={`badge-status ${isActive ? 'active' : 'inactive'}`}>
            <span className="dot" />
            {estado || 'Desconocido'}
        </span>
    );
}
