const AuthImagePanel = () => (
  <div className="hidden lg:flex lg:w-1/2 items-center justify-center relative overflow-hidden">
    <div 
      className="w-full h-full bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('hospohub2/public/Images/AuthPageImage.png')`
      }}
    />
    {/* Logo centered on image - larger and positioned properly */}
    <div className="absolute inset-20 flex items-center justify-start pl-15">
      <img 
        src="hospohub2/public/Images/Logo-HospoHub4.png" 
        alt="HospoHUB Logo" 
        className="logo-breathing h-100 w-auto drop-shadow-2xl"
      />
    </div>
  </div>
);

export default AuthImagePanel;
