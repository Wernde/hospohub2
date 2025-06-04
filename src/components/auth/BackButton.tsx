
interface BackButtonProps {
  onNavigate: (path: string) => void;
}

const BackButton = ({ onNavigate }: BackButtonProps) => (
  <button
    onClick={() => onNavigate('/')}
    className="back-button fixed top-4 left-4 text-2xl text-white bg-black/60 backdrop-blur-sm border border-white/30 rounded-full w-12 h-12 flex items-center justify-center cursor-pointer z-[1001] hover:bg-black/80 transition-all duration-300 shadow-lg"
  >
    ←
  </button>
);

export default BackButton;
