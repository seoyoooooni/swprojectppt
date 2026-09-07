import { HashRouter, Route, Routes } from 'react-router-dom';
import ArchivePage from './pages/ArchivePage';
import PresentationPage from './pages/PresentationPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <HashRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/" element={<ArchivePage />} />
        <Route path="/presentations/:presentationId" element={<PresentationPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
