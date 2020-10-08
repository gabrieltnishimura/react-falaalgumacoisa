import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes } from 'react-router-dom';
import AutoAuthenticationRoute from './authentication/AutoAuthenticationRoute';
import ProtectedRoute from './authentication/ProtectedRoute';
import UnauthenticatedRoute from './authentication/UnauthenticatedRoute';
import { UserContext } from './authentication/UserProvider';
import DashboardPage from './dashboard/DashboardPage';
import LeaderboardPage from './dashboard/LeaderboardPage';
import HomePage from './home/HomePage';
import LoginPage from './login/LoginPage';
import ModalTestPage from './ModalTestPage';
import RecordingPage from './recording/RecordingPage';

function App() {
  const authenticationState = useContext(UserContext);
  const isAuth = authenticationState.user;
  console.log('Rerendering app with', authenticationState.user);

  return (
    <Router>
      <Routes>
        <UnauthenticatedRoute path="/" component={<HomePage />} isAuth={isAuth}></UnauthenticatedRoute>
        <UnauthenticatedRoute path="/login" component={<LoginPage />} isAuth={isAuth}></UnauthenticatedRoute>
        <ProtectedRoute path="/dashboard" component={<DashboardPage />} redirectTo="/login" isAuth={isAuth}></ProtectedRoute>
        <ProtectedRoute path="/ranking" component={<LeaderboardPage />} redirectTo="/login" isAuth={isAuth}></ProtectedRoute>
        <AutoAuthenticationRoute path="/fala" component={<RecordingPage />} isAuth={isAuth}></AutoAuthenticationRoute>
      </Routes>
    </Router>
  );
}

export default App;
