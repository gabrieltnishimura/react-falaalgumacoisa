import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes } from 'react-router-dom';
import AutoAuthenticationRoute from './authentication/AutoAuthenticationRoute';
import ProtectedRoute from './authentication/ProtectedRoute';
import UnauthenticatedRoute from './authentication/UnauthenticatedRoute';
import { UserContext } from './authentication/UserProvider';
import DashboardPage from './dashboard/DashboardPage';
import FriendsLeaderboardPage from './dashboard/FriendsLeaderboardPage';
import LeaderboardPage from './dashboard/LeaderboardPage';
import DeleteUserPage from './delete-user/DeleteUserPage';
import DisabledMicrophonePage from './enable-mic/DisabledMicrophonePage';
import EnableMicrophonePage from './enable-mic/EnableMicrophonePage';
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
        <UnauthenticatedRoute path="/habilitar-microfone" component={<EnableMicrophonePage />} isAuth={isAuth}></UnauthenticatedRoute>
        <UnauthenticatedRoute path="/erro-mic-desabilitado" component={<DisabledMicrophonePage />} isAuth={isAuth}></UnauthenticatedRoute>
        <AutoAuthenticationRoute path="/cadastro" component={<RegistrationPage />} isAuth={isAuth}></AutoAuthenticationRoute>
        <ProtectedRoute path="/dashboard" component={<DashboardPage />} redirectTo="/login" isAuth={isAuth}></ProtectedRoute>
        <ProtectedRoute path="/placar-dos-lideres" component={<LeaderboardPage />} redirectTo="/login" isAuth={isAuth}></ProtectedRoute>
        <ProtectedRoute path="/placar-dos-amigos" component={<FriendsLeaderboardPage />} redirectTo="/login" isAuth={isAuth}></ProtectedRoute>
        <ProtectedRoute path="/excluir" component={<DeleteUserPage />} redirectTo="/login" isAuth={isAuth}></ProtectedRoute>
        <AutoAuthenticationRoute path="/fale/:theme" component={<RecordingPage />} isAuth={isAuth}></AutoAuthenticationRoute>
      </Routes>
    </Router>
  );
}

export default App;
