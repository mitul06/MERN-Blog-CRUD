import { Suspense, lazy } from "react";
import { useRoutes } from "react-router-dom";

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  //   const { pathname } = useLocation();

  return (
    <Suspense>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: "blogs",
      element: <Blogs />,
    },
    {
      path: "new-blog",
      element: <NewBlogPost />,
    },
    {
      path: "/",
      element: <Blogs />,
    },
    {
      path: "view-blog/:id",
      element: <ViewBlog />,
    },
    {
      path: "edit-blog/:id",
      element: <EditBlog />
    }
  ]);
}

const Blogs = Loadable(lazy(() => import("../pages/Blogs")));
const NewBlogPost = Loadable(lazy(() => import("../pages/NewBlogPost")));
const ViewBlog = Loadable(lazy(() => import("../pages/ViewBlog")));
const EditBlog = Loadable(lazy(() => import("../pages/EditBlog")))
