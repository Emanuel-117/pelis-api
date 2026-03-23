/**
 * Skeleton loader que imita filas reales de la tabla.
 * Mucho más profesional que un spinner básico.
 * @param {number} rows - Cantidad de filas skeleton
 * @param {number} columns - Cantidad de columnas
 */
export default function SkeletonRow({ rows = 5, columns = 5 }) {
    const widths = ['60%', '85%', '45%', '70%', '55%', '90%', '40%'];

    return (
        <>
            {Array.from({ length: rows }).map((_, ri) => (
                <tr key={ri} className="skeleton-row">
                    {Array.from({ length: columns }).map((_, ci) => (
                        <td key={ci}>
                            <div
                                className="skeleton skeleton-cell"
                                style={{ width: widths[(ri * columns + ci) % widths.length] }}
                            />
                        </td>
                    ))}
                </tr>
            ))}
        </>
    );
}
