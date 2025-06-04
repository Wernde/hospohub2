
interface BackButtonProps {
  onNavigate: (path: string) => void;
}

const BackButton = ({ onNavigate }: BackButtonProps) => (
  <button
    onClick={() => onNavigate('/')}
    className="back-button fixed bottom-5 right-5 text-3xl text-[#4a4a4a] bg-none border-none cursor-pointer z-[1001]"
  >
    ←
  </button>
);

export default BackButton;
