const AuthImagePanel = () => (
  <div className="hidden lg:flex lg:w-1/2 items-center justify-center relative overflow-hidden">
    <div 
      className="w-full h-full bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('/Images/AuthPageImage.png')`
      }}
    />
    {/* Logo centered on image - larger and positioned properly */}
    <div className="absolute inset-0 flex items-center justify-start pl-16">
      <img 
        src="/Images/Logo-HospoHub4.png" 
        alt="HospoHUB Logo" 
        className="logo-breathing h-40 w-auto drop-shadow-2xl"
      />
    </div>
  </div>
);

export default AuthImagePanel;
