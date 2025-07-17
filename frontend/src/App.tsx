import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login from './components/auth/Login';
import Signup from './components/auth/signUp';
import DashboardPage from './components/courseDashboard/dashboard';
import { ProtectedRoute } from './middleware/protected';
import { PublicRoute } from './middleware/public';

export default function App() {
  return (
    <div>
      <BrowserRouter>
        {/* <div className="flex justify-center">
          <MinimalNavbar />
        </div> */}

        <Routes>
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            }
          />
          <Route
            path="/Login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
