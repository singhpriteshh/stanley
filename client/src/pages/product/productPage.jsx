import { useNavigate } from 'react-router-dom';

function ProductPage() {
  const navigate = useNavigate();

  // Single handler for all buttons
  function handleNavigation(route) {
    navigate(route);
  }

  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  
  return (
    <div
      className="relative flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: 'url(./home.png)', // Full-screen background image
      }}
    >
      {/* Overlay Content */}
      <div className="absolute right-20 flex flex-col items-center space-y-8 bg-gray-200 backdrop-blur-md bg-opacity-10 p-20 rounded-lg transition duration-300 hover:bg-opacity-20 shadow-md hover:shadow-xl">

        {/* Product Selection */}
        <p className="text-black text-center font-bold text-3xl mb-4">Hello <strong className='uppercase italic flex justify-center'>{user?.first_name}</strong> Please Select Product Segment</p>
        <div className="space-y-8">
          <button
            onClick={() => handleNavigation('/protected/home')}
            className="block w-48 h-16 text-xl font-bold text-white rounded hover:opacity-90 backdrop-blur-md bg-opacity-10 transition duration-300 hover:bg-opacity-20 shadow-md hover:shadow-xl"
            style={{
              backgroundImage: 'url(./tucker.png)', // Background image for Tucker button
              backgroundSize: '100% 100%', // Fill the button
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          >
            {/* TUCKER */}
          </button>
          <button
            onClick={() => handleNavigation('/protected/home')}
            className="mt-2 mb-2 block w-48 h-16 text-xl font-bold text-white rounded hover:opacity-90 backdrop-blur-md bg-opacity-10 transition duration-300 hover:bg-opacity-20 shadow-md hover:shadow-xl"
            style={{
              backgroundImage: 'url(./nelson.png)', // Background image for Nelson button
              backgroundSize: '100% 100%', // Fill the button
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          >
            {/* NELSON */}
          </button>
          <button
            onClick={() => handleNavigation('/protected/home')}
            className="block w-48 h-16 text-xl font-bold text-white rounded hover:opacity-90 backdrop-blur-md bg-opacity-10 transition duration-300 hover:bg-opacity-20 shadow-md hover:shadow-xl"
            style={{
              backgroundImage: 'url(./stanley.png)', // Background image for Stanley button
              backgroundSize: '100% 100%', // Fill the button
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          >
            {/* STANLEY */}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
