import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import MainLayout from './pages/MainLayout'
import SettingsPage from './pages/SettingsPage'

function RequireAuth({ children }) {
  const token = localStorage.getItem('mitots_token')
  return token ? children : <Navigate to="/login" replace />
}

function RedirectIfAuth({ children }) {
  const token = localStorage.getItem('mitots_token')
  return token ? <Navigate to="/app" replace /> : children
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <RedirectIfAuth>
              <LoginPage />
            </RedirectIfAuth>
          }
        />
        <Route
          path="/app"
          element={
            <RequireAuth>
              <MainLayout />
            </RequireAuth>
          }
        />
        <Route
          path="/settings"
          element={
            <RequireAuth>
              <SettingsPage />
            </RequireAuth>
          }
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
