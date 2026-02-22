import './App.css';
import { Routes, Route } from 'react-router-dom';
import {
  Welcome,
  CreateWallet,
  Dashboard,
  Send,
  Receive,
  ImportWallet,
} from '@components/index';

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/create" element={<CreateWallet />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/send" element={<Send />} />
          <Route path="/receive" element={<Receive />} />
          <Route path="/import" element={<ImportWallet />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
