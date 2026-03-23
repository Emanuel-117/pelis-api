import { useState, useEffect } from 'react';

/**
 * Retrasa la actualización del valor hasta que el usuario deje de escribir.
 * Ideal para campos de búsqueda — evita renders en cada keystroke.
 * @param {*} value - El valor a "debouncear"
 * @param {number} delay - Milisegundos de espera (default 300ms)
 */
export function useDebounce(value, delay = 300) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(timer);
    }, [value, delay]);

    return debouncedValue;
}
