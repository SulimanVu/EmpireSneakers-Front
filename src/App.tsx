import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Main from "./pages/Main/Main";
import About from "./pages/About/About";
import Authorization from "./pages/Authorization/Authorization";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import GlobalCategories from "./pages/GlobalCategories/GlobalCategories";
import Profile from "./components/Profile/Profile";

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
    {
      path: "/Gcategory/:id",
      element: <GlobalCategories />,
    },
    {
      path: "/Profile",
      element: <Profile />,
    },
  ]);

  return <RouterProvider router={routes} />;
}

export default App;
