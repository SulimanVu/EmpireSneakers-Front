import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Main from "./pages/Main/Main";
import About from "./pages/About/About";
import ProductList from "./components/ProductList/ProductList";
import Authorization from "./pages/Authorization/Authorization";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";

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
      path: "/authorization",
      element: <Authorization />,
      children: [
        {
          path: "signIn",
          element: <SignIn />,
        },
        {
          path: "signUp",
          element: <SignUp />,
        },
      ],
    },
  ]);

  return <RouterProvider router={routes} />;
}

export default App;
