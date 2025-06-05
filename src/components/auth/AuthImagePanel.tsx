
const AuthImagePanel = () => (
  <div className="hidden lg:flex lg:w-1/2 items-center justify-center relative overflow-hidden">
    <img 
      src="/lovable-uploads/66f72905-457b-404a-b251-f5bcaf1a998d.png" 
      alt="Fresh Ingredients" 
      className="w-full h-full object-cover object-left"
    />
    {/* Logo centered on image - 80% of image size */}
    <div className="absolute inset-0 flex items-center justify-center">
      <img 
        src="/lovable-uploads/ac47e9bb-7b3a-4ba7-8166-b1c44c4d6fbb.png" 
        alt="HospoHUB Logo" 
        className="logo-breathing w-[80%] h-auto max-w-none"
      />
    </div>
  </div>
);

export default AuthImagePanel;
