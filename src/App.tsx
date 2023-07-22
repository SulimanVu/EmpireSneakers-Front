import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Main from "./pages/Main/Main";
import About from "./pages/About/About";
import ProductList from "./components/ProductList/ProductList";
import SignIn from "./components/SignIn/SignIn";

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
    },
    {
      path: "/about",
      element: <About />,
    },
    {
      path: "/products",
      element: <ProductList />,
    },
    {
      path: "/signIn",
      element: <SignIn />,
    },
  ]);

  return <RouterProvider router={routes} />;
}

export default App;
