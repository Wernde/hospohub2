const AuthImagePanel = () => (
  <div className="hidden lg:flex lg:w-1/2 items-center justify-center relative overflow-hidden">
    <img 
      src="/hospohub2/Images/Auth-Image-Panel.png" 
      alt="Fresh Ingredients" 
      className="w-full h-full object-cover"
    />
    {/* Logo centered on image - enlarged */}
    <div className="absolute inset-0 flex items-center justify-center">
      <img 
        src="/hospohub2/Images/Logo-HospoHub4.png" 
        alt="HospoHUB Logo" 
        className="logo-breathing h-300 w-auto"
      />
    </div>
  </div>
);

export default AuthImagePanel;
