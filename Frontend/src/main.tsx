import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./global.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./routes/Home.tsx";
import CreateAndLogin from "./routes/CreateAndLogin.tsx";
import ErrorPage from "./routes/ErrorPage.tsx";

const router = createBrowserRouter([
  {
    path: "/Home",
    element: <App />,
    children: [{ path: "/Home", element: <Home /> }],
    errorElement: <ErrorPage />,
  },
  {
    path: "/",
    element: <CreateAndLogin />,
    errorElement: <ErrorPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
