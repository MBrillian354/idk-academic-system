import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ScoreHistoryPage from './pages/ScoreHistoryPage';
import UploadScorePage from './pages/UploadScorePage';
import { useDispatch } from 'react-redux';
import { logout } from './store/slices/authSlice';

const App = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <nav>
        <Link to="/">Dashboard</Link> |{' '}
        <Link to="/scores">Scores</Link> |{' '}
        <Link to="/upload">Upload</Link> |{' '}
        <button onClick={() => dispatch(logout())}>Logout</button>
      </nav>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/scores"
          element={
            <PrivateRoute>
              <ScoreHistoryPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/upload"
          element={
            <PrivateRoute>
              <UploadScorePage />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;