import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Main from "./pages/Main/Main";
import About from "./pages/About/About";
import Authorization from "./pages/Authorization/Authorization";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import GlobalCategories from "./pages/GlobalCategories/GlobalCategories";
import Profile from "./components/Profile/Profile";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import Favorites from "./components/Favorites/Favorites";
import Basket from "./components/Basket/Basket";

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
      path: "/my_accaunt",
      element: <ProfilePage />,
      children: [
        {
          path: "personal_info",
          element: <Profile />,
        },
        {
          path: "favorites",
          element: <Favorites />,
        },
        {
          path: "basket",
          element: <Basket />,
        },
      ],
    },
    {
      path: "/Gcategory/:id",
      element: <GlobalCategories />,
    },
  ]);

  return <RouterProvider router={routes} />;
}

export default App;
