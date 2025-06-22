import { BrowserRouter, Route, Routes } from 'react-router-dom';
import styles from './App.module.css';
import { Header } from './components/Header/Header';
import { HighlightsList } from './components/HighlightsList/HighlightsList';
import { Uploader } from './components/Uploader/Uploader';

function App() {
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Header />
        <Uploader />
        <HighlightsList />
        <Routes>
          <Route path="/" element={<div>Upload</div>} />
          <Route path="/generate" element={<div>Generate</div>} />
          <Route path="/history" element={<div>History</div>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
