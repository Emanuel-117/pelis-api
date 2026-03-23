import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Hook genérico CRUD con caché de 30 segundos.
 * @param {object} api - Objeto con métodos { getAll, create, update, remove }
 */
export function useCrud(api) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const cacheRef = useRef({ data: null, timestamp: 0 });
    const CACHE_TTL = 30_000; // 30 segundos

    const fetchAll = useCallback(async (force = false) => {
        const now = Date.now();
        if (!force && cacheRef.current.data && now - cacheRef.current.timestamp < CACHE_TTL) {
            setData(cacheRef.current.data);
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const res = await api.getAll();
            const result = res.data?.data ?? [];
            cacheRef.current = { data: result, timestamp: Date.now() };
            setData(result);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [api]);

    useEffect(() => { fetchAll(); }, [fetchAll]);

    const create = useCallback(async (payload) => {
        const res = await api.create(payload);
        await fetchAll(true);
        return res.data;
    }, [api, fetchAll]);

    const update = useCallback(async (id, payload) => {
        const res = await api.update(id, payload);
        await fetchAll(true);
        return res.data;
    }, [api, fetchAll]);

    const remove = useCallback(async (id) => {
        const res = await api.remove(id);
        await fetchAll(true);
        return res.data;
    }, [api, fetchAll]);

    return { data, loading, error, reload: () => fetchAll(true), create, update, remove };
}
