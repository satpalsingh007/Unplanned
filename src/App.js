import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import LoginPage from "./components/LoginPage";
import SignUp from "./components/SingUpPage";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

const App = () => {
    return (
        <div>
            <Header />
            <Outlet />
        </div>
    );
};
const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/login",
                element: <LoginPage />,
            },
            {
                path: "/signup",
                element: <SignUp />,
            },
        ],
    },
]);

const root = ReactDOM.createRoot(document.getElementById("main"));
root.render(<RouterProvider router={appRouter} />);
