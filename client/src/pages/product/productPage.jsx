import { LogOutIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function ProductPage() {
  const navigate = useNavigate();

  function handleNavigation(route) {
    navigate(route);
  }

  function handleLogout() {
    localStorage.clear();
    navigate("/auth/login");
  }

  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  
  return (
    <div
      className="relative flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: 'url(./home.png)',
      }}
    >
      <div className='right-5 xl:right-10 absolute top-5 flex items-center justify-center cursor-pointer' onClick={handleLogout}>
        <LogOutIcon/>
      </div>
      {/* Glass-morphism Container */}
      <div className="absolute right-10 xl:right-20 flex flex-col items-center space-y-8 bg-indigo-900/30 backdrop-blur-xl rounded-2xl p-8 xl:p-12 shadow-2xl hover:shadow-3xl transition-shadow duration-300 border border-indigo-200/20">
        
        {/* Header Section */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl xl:text-3xl font-bold bg-blue-500 bg-clip-text text-transparent drop-shadow-md">
            Welcome back,{" "}
            <span className="uppercase italic text-white">
              {user?.first_name}
            </span>
          </h1>
          <p className="text-lg xl:text-xl text-black font-medium">
            Select your product segment
          </p>
        </div>

        {/* Product Buttons Grid */}
        <div className="flex flex-col gap-5 items-center justify-center">
          {[
            { brand: 'tucker', color: 'from-amber-600/90 to-amber-800/90' },
            { brand: 'nelson', color: 'from-emerald-600/90 to-emerald-800/90' },
            { brand: 'stanley', color: 'from-sky-600/90 to-sky-800/90' }
          ].map(({ brand, color }) => (
            <button
              key={brand}
              onClick={() => handleNavigation('/protected/home')}
              className={`relative group w-64 h-20 rounded-xl overflow-hidden transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl active:scale-95`}
              style={{
                backgroundImage: `url(./${brand}.png)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              {/* Gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-b ${color} group-hover:opacity-80 transition-opacity duration-300`} />
              
              {/* Brand name */}
              <span className="relative z-10 text-white text-xl font-bold tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                {brand.charAt(0).toUpperCase() + brand.slice(1)}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductPage;