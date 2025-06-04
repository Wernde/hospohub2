
interface BackButtonProps {
  onNavigate: (path: string) => void;
}

const BackButton = ({ onNavigate }: BackButtonProps) => (
  <button
    onClick={() => onNavigate('/')}
    className="back-button fixed top-5 left-5 text-3xl text-[#4a4a4a] bg-white/80 backdrop-blur-sm border border-white/20 rounded-full w-12 h-12 flex items-center justify-center cursor-pointer z-[1001] hover:bg-white/90 transition-all duration-300"
  >
    ←
  </button>
);

export default BackButton;
