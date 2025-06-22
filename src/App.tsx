import { BrowserRouter, Route, Routes } from 'react-router-dom';
import styles from './App.module.css';
import { Header } from './components/Header';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { HistoryPage } from './pages/HistoryPage';
import { GeneratorPage } from './pages/GeneratorPage';

function App() {
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<AnalyticsPage />} />
          <Route path="/generate" element={<GeneratorPage />} />
          <Route path="/history" element={<HistoryPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
