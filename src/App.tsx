import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BasicDataPage from './basic-data/BasicDataPage';
import RecordingPage from './recording/RecordingPage';
import CanI from './shared/CanI';
import SplashPage from './splash/SplashPage';
import SuccessPage from './SuccessPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CanI onSuccessRoute='dados-pessoais/passo-1'><SplashPage /></CanI>} />
        <Route path="/dados-pessoais/passo-1" element={<CanI><BasicDataPage /></CanI>} />
        <Route path="/dados-pessoais/passo-2" element={<CanI><BasicDataPage /></CanI>} />
        <Route path="/gravar" element={<CanI><RecordingPage /></CanI>} />
        <Route path="/sucesso" element={<CanI><SuccessPage /></CanI>} />
      </Routes>
    </Router>
  );
}

export default App;
