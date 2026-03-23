import { useEffect, useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
    BsCheckCircleFill,
    BsXCircleFill,
    BsExclamationTriangleFill,
    BsInfoCircleFill,
    BsX,
} from 'react-icons/bs';

const ICONS = {
    success: <BsCheckCircleFill />,
    error: <BsXCircleFill />,
    warning: <BsExclamationTriangleFill />,
    info: <BsInfoCircleFill />,
};

function ToastItem({ toast }) {
    const { toast: toastAPI } = useApp();
    const [removing, setRemoving] = useState(false);

    const dismiss = () => {
        setRemoving(true);
        setTimeout(() => toastAPI.dismiss(toast.id), 280);
    };

    useEffect(() => {
        const timer = setTimeout(dismiss, 4200);
        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={`toast-item ${toast.type}${removing ? ' removing' : ''}`}>
            <span className="toast-icon">{ICONS[toast.type]}</span>
            <div className="toast-content">
                <div className="toast-title">{toast.title}</div>
                {toast.message && <div className="toast-msg">{toast.message}</div>}
            </div>
            <button className="toast-close" onClick={dismiss} aria-label="Cerrar">
                <BsX />
            </button>
        </div>
    );
}

export default function ToastContainer() {
    const { state } = useApp();
    return (
        <div className="toast-container" aria-live="polite">
            {state.toasts.map((t) => (
                <ToastItem key={t.id} toast={t} />
            ))}
        </div>
    );
}
