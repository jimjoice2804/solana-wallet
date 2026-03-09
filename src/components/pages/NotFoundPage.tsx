import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="h-full w-full flex flex-col justify-center items-center text-white text-center gap-4">
      {/* Glowing 404 */}
      <div className="text-7xl font-extrabold tracking-widest text-white/90 drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]">
        404
      </div>

      {/* Icon */}
      <div className="text-4xl">🔍</div>

      {/* Message */}
      <p className="text-white/80 text-sm font-medium">Page not found</p>
      <p className="text-white/50 text-xs px-4">
        This wallet address doesn't exist in our universe.
      </p>

      {/* Back Button */}
      <button
        onClick={() => navigate('/dashboard')}
        className="mt-4 px-6 py-2 rounded-full bg-white text-[#3D52A0] text-xs font-bold shadow-md hover:scale-105 transition-all duration-200"
      >
        Go to Dashboard
      </button>
    </div>
  );
};

export default NotFoundPage;
