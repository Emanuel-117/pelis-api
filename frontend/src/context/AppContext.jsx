import { createContext, useContext, useReducer } from 'react';
import { appReducer, initialState } from './appReducer';

const AppContext = createContext(null);

let toastIdCounter = 0;

export function AppProvider({ children }) {
    const [state, dispatch] = useReducer(appReducer, initialState);

    const toast = {
        success: (message, title = 'Éxito') =>
            dispatch({ type: 'ADD_TOAST', payload: { id: ++toastIdCounter, type: 'success', title, message } }),
        error: (message, title = 'Error') =>
            dispatch({ type: 'ADD_TOAST', payload: { id: ++toastIdCounter, type: 'error', title, message } }),
        warning: (message, title = 'Atención') =>
            dispatch({ type: 'ADD_TOAST', payload: { id: ++toastIdCounter, type: 'warning', title, message } }),
        info: (message, title = 'Información') =>
            dispatch({ type: 'ADD_TOAST', payload: { id: ++toastIdCounter, type: 'info', title, message } }),
        dismiss: (id) => dispatch({ type: 'REMOVE_TOAST', payload: id }),
    };

    const toggleSidebar = () => dispatch({ type: 'TOGGLE_SIDEBAR' });

    return (
        <AppContext.Provider value={{ state, toast, toggleSidebar }}>
            {children}
        </AppContext.Provider>
    );
}

export const useApp = () => {
    const ctx = useContext(AppContext);
    if (!ctx) throw new Error('useApp debe usarse dentro de <AppProvider>');
    return ctx;
};
