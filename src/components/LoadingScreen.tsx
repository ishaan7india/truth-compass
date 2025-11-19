import logo from "@/assets/truth-compass-logo.png";

export const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="relative">
        {/* Rotating circle animation */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-32 h-32 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
        </div>
        
        {/* Logo */}
        <div className="relative z-10 flex items-center justify-center w-32 h-32">
          <img 
            src={logo} 
            alt="Truth Compass" 
            className="w-20 h-20 object-contain animate-pulse"
          />
        </div>
      </div>
    </div>
  );
};
