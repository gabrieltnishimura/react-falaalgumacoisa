import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styles from './App.module.css';
import BasicDataPage from './basic-data/BasicDataPage';
import HomePage from "./HomePage";
import RecordingPage from './recording/RecordingPage';
import Header from './shell/Header';

function App() {
  return (
    <div className={styles.pageWrapper}>
      <Router>
        <Header></Header>
        <div className={styles.contentWrapper}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dados-pessoais" element={<BasicDataPage />} />
            <Route path="/gravar" element={<RecordingPage />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
