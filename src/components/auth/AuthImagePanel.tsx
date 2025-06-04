
const AuthImagePanel = () => (
  <div className="hidden lg:flex lg:w-1/2 items-center justify-center relative overflow-hidden">
    <img 
      src="/lovable-uploads/66f72905-457b-404a-b251-f5bcaf1a998d.png" 
      alt="Fresh Ingredients" 
      className="w-full h-full object-cover"
    />
    {/* Logo centered on image */}
    <div className="absolute inset-0 flex items-center justify-center">
      <img 
        src="/lovable-uploads/8611b175-f69b-4ea2-9a4e-91037d929617.png" 
        alt="HospoHUB Logo" 
        className="logo-breathing h-80 w-auto"
      />
    </div>
  </div>
);

export default AuthImagePanel;
