import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes } from 'react-router-dom';
import AutoAuthenticationRoute from './authentication/AutoAuthenticationRoute';
import ProtectedRoute from './authentication/ProtectedRoute';
import UnauthenticatedRoute from './authentication/UnauthenticatedRoute';
import { UserContext } from './authentication/UserProvider';
import DashboardPage from './dashboard/DashboardPage';
import LeaderboardPage from './dashboard/LeaderboardPage';
import ErrorPage from './error/ErrorPage';
import HomePage from './home/HomePage';
import LoginPage from './login/LoginPage';
import RecordingPage from './recording/RecordingPage';
import RegistrationPage from './registration/RegistrationPage';

function App() {
  const authenticationState = useContext(UserContext);
  const isAuth = authenticationState.user && Boolean(authenticationState.user);
  console.log('Rerendering app with', authenticationState.user);

  return (
    <Router>
      <Routes>
        <UnauthenticatedRoute path="/" component={<HomePage />} isAuth={isAuth}></UnauthenticatedRoute>
        <UnauthenticatedRoute path="/login" component={<LoginPage />} isAuth={isAuth}></UnauthenticatedRoute>
        <UnauthenticatedRoute path="/error" component={<ErrorPage />} isAuth={isAuth}></UnauthenticatedRoute>
        <AutoAuthenticationRoute path="/cadastro" component={<RegistrationPage />} isAuth={isAuth}></AutoAuthenticationRoute>
        <ProtectedRoute path="/dashboard" component={<DashboardPage />} redirectTo="/login" isAuth={isAuth}></ProtectedRoute>
        <ProtectedRoute path="/ranking" component={<LeaderboardPage />} redirectTo="/login" isAuth={isAuth}></ProtectedRoute>
        <AutoAuthenticationRoute path="/fala/:theme" component={<RecordingPage />} isAuth={isAuth}></AutoAuthenticationRoute>
      </Routes>
    </Router>
  );
}

export default App;
