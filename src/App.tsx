import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/Layout/MainLayout';
import AISupportPage from './pages/HD-AI/AISupportPage';
import ReportsPage from './pages/Reports/ReportsPage';
import MetricsPage from './pages/Metrics/MetricsPage';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/ai-support" replace />} />
          <Route path="ai-support" element={<AISupportPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="metrics" element={<MetricsPage />} />
          <Route path="*" element={<Navigate to="/ai-support" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;