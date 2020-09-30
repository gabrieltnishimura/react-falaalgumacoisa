import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BasicDataPage from './basic-data/BasicDataPage';
import CompleteRegistrationPage from './basic-data/CompleteRegistrationPage';
import RecordingPage from './recording/RecordingPage';
import CanI from './shared/CanI';
import SuccessPage from './SuccessPage';
import HomePage from './home/HomePage';
import LoginPage from './LoginPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CanI onSuccessRoute='fala'><HomePage /></CanI>} />
        <Route path="/dados-pessoais/passo-1" element={<CanI><BasicDataPage /></CanI>} />
        <Route path="/dados-pessoais/passo-2" element={<CanI><CompleteRegistrationPage /></CanI>} />
        <Route path="/fala" element={<RecordingPage />} />
        <Route path="/sucesso" element={<CanI><SuccessPage /></CanI>} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
