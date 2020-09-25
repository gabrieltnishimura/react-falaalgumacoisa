import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BasicDataPage from './basic-data/BasicDataPage';
import CompleteRegistrationPage from './basic-data/CompleteRegistrationPage';
import RecordingPage from './recording/RecordingPage';
import CanI from './shared/CanI';
import SplashPage from './splash/SplashPage';
import SuccessPage from './SuccessPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CanI onSuccessRoute='fala'><SplashPage /></CanI>} />
        <Route path="/dados-pessoais/passo-1" element={<CanI><BasicDataPage /></CanI>} />
        <Route path="/dados-pessoais/passo-2" element={<CanI><CompleteRegistrationPage /></CanI>} />
        <Route path="/fala" element={<CanI><RecordingPage /></CanI>} />
        <Route path="/sucesso" element={<CanI><SuccessPage /></CanI>} />
      </Routes>
    </Router>
  );
}

export default App;
