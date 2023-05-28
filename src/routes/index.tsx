import { Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';
import SignInPage from '../pages/SignInPage/SignInPage';
import ProfilePage from '../pages/ProfilePage/ProfilePage';
import HomePage from '../pages/HomePage/HomePage';
import UsersPage from '../pages/UsersPage/UsersPage';

const useRoutes = (isAuthenticated: boolean) => {
  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/signin" element={<SignInPage />} />
        <Route path="*" element={<Navigate to="/signin" replace />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/users" element={<UsersPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default useRoutes;
