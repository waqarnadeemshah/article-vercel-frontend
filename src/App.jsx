import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Add from "./Admin/Add";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import ArticleList from "./Admin/ArticleList";
import ArticleDetail from "./pages/ArticleDetail";

function App() {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/admin/Add-article",
      element: (
        <ProtectedRoute role="admin">
          <Add />
        </ProtectedRoute>
      ),
    },
    {
      path: "/admin/list-article",
      element: (
        <ProtectedRoute role="admin">
          <ArticleList />
        </ProtectedRoute>
      ),
    },
    {
      path: "/admin/Update/:id",
      element: (
        <ProtectedRoute role="admin">
          <Add />
        </ProtectedRoute>
      ),
    },
    {
      path: "/",
      element: <Home />,
    },{
      path:"/:id",
      element:<ArticleDetail/>

    }
  ]);
  return (
    <>
      <div className="app">
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
