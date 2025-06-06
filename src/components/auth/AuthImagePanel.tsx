
const AuthImagePanel = () => (
  <div className="hidden lg:flex lg:w-1/2 items-center justify-center relative overflow-hidden">
    <img 
      src="/Auth-Image-Panel.png" 
      alt="Fresh Ingredients" 
      className="w-full h-full object-cover"
    />
    {/* Logo centered on image - made much bigger */}
    <div className="absolute inset-0 flex items-center justify-center">
      <img 
        src="/HospoHub-Logo-4.png" 
        alt="HospoHUB Logo" 
        className="logo-breathing h-150 w-auto"
      />
    </div>
  </div>
);

export default AuthImagePanel;
