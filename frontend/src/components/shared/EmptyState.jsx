/**
 * Pantalla de estado vacío — se muestra cuando no hay registros.
 */
export default function EmptyState({ icon = '📭', title = 'Sin registros', description, action }) {
    return (
        <div className="empty-state">
            <div className="empty-state-icon">{icon}</div>
            <h3>{title}</h3>
            {description && <p>{description}</p>}
            {action && <div style={{ marginTop: '1.25rem' }}>{action}</div>}
        </div>
    );
}
