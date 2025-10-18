import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import NotFound from "./pages/NotFound.jsx";
import { lazy, Suspense } from "react";
import AppLayout from "./components/AppLayout.jsx";
import Loader from "./components/Loader.jsx";
import "leaflet/dist/leaflet.css";
import City from "./components/City.jsx";
import Form from "./pages/Form.jsx";
import AuthProvider from "./Stores/AuthContext.jsx";
import { ProtectedRoute } from "./components/ProtectedRoute.jsx";

const HomePage = lazy(() => import("./pages/HomePage.jsx"));
const ProductsPage = lazy(() => import("./pages/ProductsPage.jsx"));
const PricingPage = lazy(() => import("./pages/PricingPage.jsx"));
const LoginPage = lazy(() => import("./pages/LoginPage.jsx"));
const AppDetails = lazy(() => import("./pages/AppDetails.jsx"));
const Cities = lazy(() => import("./pages/Cities.jsx"));
const Countries = lazy(() => import("./components/Countries.jsx"));

const browserRouter = createBrowserRouter([
  {
    element: (
      <AuthProvider>
        <AppLayout />
      </AuthProvider>
    ),
    errorElement: <NotFound />,

    children: [
      { path: "/", element: <HomePage />, index: true },
      { path: "products", element: <ProductsPage /> },
      { path: "pricing", element: <PricingPage /> },
      { path: "pricing", element: <PricingPage /> },
      { path: "login", element: <LoginPage /> },
    ],
  },
  {
    path: "app",

    element: (
      <AuthProvider>
        <ProtectedRoute>
          <AppDetails />
        </ProtectedRoute>
      </AuthProvider>
    ),
    replace: true,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Navigate to={"cities"} replace /> },
      { path: "cities", element: <Cities /> },
      { path: "cities/:id", element: <City /> },
      { path: "countries", element: <Countries /> },
      { path: "form", element: <Form /> },
    ],
  },
]);
function App() {
  return (
    <Suspense fallback={<Loader />}>
      <RouterProvider router={browserRouter} />
    </Suspense>
  );
}

export default App;
