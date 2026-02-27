import './App.css';
import { Routes, Route } from 'react-router-dom';
import {
  Welcome,
  CreateWallet,
  Dashboard,
  Send,
  Receive,
  ImportWallet,
  Buy,
} from '@/components/pages/index';
import { ProtectedRoute } from '@components/Auth/ProtectedRoute';
import { HasKey } from '@components/Auth/HasKey';

function App() {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="h-[85%] w-[30%] rounded-3xl overflow-hidden bg-[linear-gradient(to_bottom,#3D52A0,#7091E6,#8697C4)] text-white p-5">
        <div className="h-full w-full">
          <Routes>
            <Route
              path="/"
              element={
                <HasKey>
                  <Welcome />
                </HasKey>
              }
            />
            <Route path="/create" element={<CreateWallet />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/send"
              element={
                <ProtectedRoute>
                  <Send />
                </ProtectedRoute>
              }
            />
            <Route
              path="/receive"
              element={
                <ProtectedRoute>
                  <Receive />
                </ProtectedRoute>
              }
            />
            <Route
              path="/import"
              element={
                <HasKey>
                  <ImportWallet />
                </HasKey>
              }
            />
            <Route
              path="/buy"
              element={
                <ProtectedRoute>
                  <Buy />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
