
interface BackButtonProps {
  onNavigate: (path: string) => void;
}

const BackButton = ({ onNavigate }: BackButtonProps) => (
  <button
    onClick={() => onNavigate('/')}
    className="back-button fixed top-5 left-5 text-3xl text-white bg-[#2c2c2c] hover:bg-[#1a1a1a] backdrop-blur-sm border border-stone-300 rounded-full w-12 h-12 flex items-center justify-center cursor-pointer z-[1001] transition-all duration-300"
  >
    <span className="leading-none">←</span>
  </button>
);

export default BackButton;
