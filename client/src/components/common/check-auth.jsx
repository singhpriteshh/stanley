/* eslint-disable react/prop-types */
import { Navigate, useLocation } from 'react-router-dom';

function CheckAuth({ isAuthenticated, user, children }) {
    const location = useLocation();

    // Handle case where state is still undefined or loading
    if (isAuthenticated === undefined || user === undefined) {
        return null; // Optionally, you can render a loading spinner here
    }

    // Handle redirection based on path
    const isAuthPage = location.pathname.includes('/login') || location.pathname.includes('/register');
    // eslint-disable-next-line no-unused-vars
    const isHomePage = location.pathname.includes('/productpage');

    // Redirect non-authenticated users from non-login/register pages
    if (!isAuthenticated && !isAuthPage) {
        return <Navigate to="/auth/login" />;
    }

    // Redirect authenticated users away from login/register pages
    if (isAuthenticated && isAuthPage) {
        if (user?.role === "user") {
            return <Navigate to="/productpage" />;
        }
    }

    // Handle protected routes (like `/productpage/adddata` or `/productpage/displaydata`)
    if (!isAuthenticated && (location.pathname === '/productpage/adddata' || location.pathname === '/displaydata' || location.pathname === '/productpage/home')) {
        return <Navigate to="/auth/login" />;
    }

    return <>{children}</>;
}

export default CheckAuth;
