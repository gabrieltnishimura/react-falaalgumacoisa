import React, { useContext } from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import OurMissionPage from './about-us/OurMissionPage';
import PrivacyPolicyPage from './about-us/PrivacyPolicyPage';
import TermsOfServicePage from './about-us/TermsOfServicePage';
import AutoAuthenticationRoute from './authentication/AutoAuthenticationRoute';
import ProtectedRoute from './authentication/ProtectedRoute';
import { UserContext } from './authentication/UserProvider';
import DashboardPage from './dashboard/DashboardPage';
import FriendsLeaderboardPage from './dashboard/FriendsLeaderboardPage';
import LeaderboardPage from './dashboard/LeaderboardPage';
import ReferAFriendPage from './dashboard/ReferAFriendPage';
import SearchFriendsPage from './dashboard/SearchFriendsPage';
import DeleteUserPage from './delete-user/DeleteUserPage';
import DisabledMicrophonePage from './enable-mic/DisabledMicrophonePage';
import EnableMicrophonePage from './enable-mic/EnableMicrophonePage';
import ErrorPage from './error/ErrorPage';
import NotFoundPage from './error/NotFoundPage';
import HomePage from './home/HomePage';
import LoginPage from './login/LoginPage';
import NotificationsPage from './notifications/NotificationsPage';
import RecordingPage from './recording/RecordingPage';
import EditAccountPage from './registration/EditAccountPage';
import EditProfilePage from './registration/EditProfilePage';
import RegistrationPage from './registration/RegistrationPage';

function App() {
  const authenticationState = useContext(UserContext);
  const isAuth = authenticationState.user && Boolean(authenticationState.user);
  console.log('Rerendering app with', authenticationState.user, authenticationState.metadata, isAuth);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/termos-de-servico" element={<TermsOfServicePage />} />
        <Route path="/politica-de-privacidade" element={<PrivacyPolicyPage />} />
        <Route path="/nossa-missao" element={<OurMissionPage />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="/habilitar-microfone" element={<EnableMicrophonePage />} />
        <Route path="/erro-mic-desabilitado" element={<DisabledMicrophonePage />} />
        <Route path="/cadastro" element={
          <AutoAuthenticationRoute isAuth={isAuth}>
            <RegistrationPage />
          </AutoAuthenticationRoute>
        } />
        <Route path="/dashboard" element={
          <ProtectedRoute isAuth={isAuth}>
            <DashboardPage />
          </ProtectedRoute>
        } />
        <Route path="/alterar-conta" element={
          <ProtectedRoute isAuth={isAuth}>
            <EditAccountPage />
          </ProtectedRoute>
        } />
        <Route path="/alterar-perfil" element={
          <ProtectedRoute isAuth={isAuth}>
            <EditProfilePage />
          </ProtectedRoute>
        } />
        <Route path="/indique-um-amigo" element={
          <ProtectedRoute isAuth={isAuth}>
            <ReferAFriendPage />
          </ProtectedRoute>
        } />
        <Route path="/placar-dos-lideres" element={
          <ProtectedRoute isAuth={isAuth}>
            <LeaderboardPage />
          </ProtectedRoute>
        } />
        <Route path="/placar-dos-amigos" element={
          <ProtectedRoute isAuth={isAuth}>
            <FriendsLeaderboardPage />
          </ProtectedRoute>
        } />
        <Route path="/buscar-amigos" element={
          <ProtectedRoute isAuth={isAuth}>
            <SearchFriendsPage />
          </ProtectedRoute>
        } />
        <Route path="/notificacoes" element={
          <ProtectedRoute isAuth={isAuth}>
            <NotificationsPage />
          </ProtectedRoute>
        } />
        <Route path="/excluir" element={
          <ProtectedRoute isAuth={isAuth}>
            <DeleteUserPage />
          </ProtectedRoute>
        } />
        <Route path="/fale/:theme" element={
          <AutoAuthenticationRoute isAuth={isAuth}>
            <RecordingPage />
          </AutoAuthenticationRoute>
        } />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
