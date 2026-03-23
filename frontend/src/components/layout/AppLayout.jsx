import { Outlet } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import Sidebar from './Sidebar';
import AppNavbar from './AppNavbar';
import ToastContainer from '../shared/ToastContainer';

export default function AppLayout() {
    const { state } = useApp();
    const collapsed = state.sidebarCollapsed;

    return (
        <div className="app-shell">
            <Sidebar />
            <AppNavbar />
            <main className={`main-content${collapsed ? ' sidebar-collapsed' : ''}`}>
                <div className="page-fade">
                    <Outlet />
                </div>
            </main>
            <ToastContainer />
        </div>
    );
}
