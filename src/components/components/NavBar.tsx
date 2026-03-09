import { useNavigate, useLocation } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Profile', path: '/profile' },
  ];

  return (
    <div className="w-full bg-white/15 backdrop-blur-sm rounded-full px-5 py-2 mb-4 flex justify-between items-center shadow-inner border border-white/20">
      {/* Brand */}
      <div className="text-white font-bold text-sm tracking-wide">🔐 Web3</div>

      {/* Nav Links */}
      <div className="flex gap-2">
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`px-4 py-1 rounded-full text-xs font-semibold transition-all duration-200 hover:cursor-pointer
              ${
                location.pathname === item.path
                  ? 'bg-white text-[#3D52A0] shadow-md'
                  : 'text-white/80 hover:bg-white/20 hover:text-white'
              }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default NavBar;
