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

function App() {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="h-[85%] w-[30%] rounded-3xl overflow-hidden bg-[linear-gradient(to_bottom,#3D52A0,#7091E6,#8697C4)] text-white p-5">
        <div className="h-full w-full">
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/create" element={<CreateWallet />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/send" element={<Send />} />
            <Route path="/receive" element={<Receive />} />
            <Route path="/import" element={<ImportWallet />} />
            <Route path="/buy" element={<Buy />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
