import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styles from './App.module.css';
import BasicDataPage from './basic-data/BasicDataPage';
import HomePage from './HomePage';
import RecordingPage from './recording/RecordingPage';
import CanI from './shared/CanI';
import SplashPage from './splash/SplashPage';
import SuccessPage from './SuccessPage';

function App() {
  return (
    <div className={styles.pageWrapper}>
      <Router>
        <div className={styles.contentWrapper}>
          <Routes>
            <Route path="/" element={<CanI onSuccessRoute='dados-pessoais'><SplashPage /></CanI>} />
            <Route path="/login" element={<HomePage />} />
            <Route path="/dados-pessoais" element={<CanI><BasicDataPage /></CanI>} />
            <Route path="/gravar" element={
              <CanI><RecordingPage /></CanI>} />
            <Route path="/sucesso" element={<SuccessPage />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
