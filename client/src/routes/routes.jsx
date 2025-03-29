import AuthLayout from "@/components/auth/layout";
import ProtectedRoute from "@/components/common/protectedroute";
import HomeLayout from "@/components/home/layout";
import AuthLogin from "@/pages/auth/login";
import AuthRegister from "@/pages/auth/register";
import EmailVerification from "@/pages/auth/verification-email";
import AddData from "@/pages/home/adddata";
import DisplayData from "@/pages/home/displayData";
import NotFound from "@/pages/not-found";
import ProductPage from "@/pages/product/productPage";
import { Navigate } from "react-router-dom";

const routesConfig = [
    {
        path: "/",
        element: <Navigate to="auth/login" />,
    },
    {
        path: "/auth",
        element: <AuthLayout />,
        children: [
            { path: "login", element: <AuthLogin /> },
            { path: "register", element: <AuthRegister /> },
            { path: "mail-verification", element: <EmailVerification /> }
        ]
    },
    {
        path: '/productpage',
        element: <ProductPage/>
    },
    {
        path: "/protected",
        element: <ProtectedRoute />,
        children: [
            {
                path: "home",
                element: <HomeLayout/>,
                children: [
                    {path: "adddata", element: <AddData/>}
                ]
            },
            {
                path: "displaydata",
                element: <DisplayData/>
            }
        ]
    },
    {
        path: "*",
        element: <NotFound/>
    }
];

export default routesConfig;