import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import AppLayout from './components/layout/AppLayout';
import Dashboard from './pages/Dashboard';
import GeneroPage from './pages/GeneroPage';
import DirectorPage from './pages/DirectorPage';
import ProductoraPage from './pages/ProductoraPage';
import TipoPage from './pages/TipoPage';
import MediaPage from './pages/MediaPage';
import MediaForm from './components/media/MediaForm';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="generos" element={<GeneroPage />} />
            <Route path="directores" element={<DirectorPage />} />
            <Route path="productoras" element={<ProductoraPage />} />
            <Route path="tipos" element={<TipoPage />} />
            <Route path="media" element={<MediaPage />} />
            <Route path="media/nueva" element={<MediaForm />} />
            <Route path="media/editar/:id" element={<MediaForm />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
