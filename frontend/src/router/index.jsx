import { createBrowserRouter } from 'react-router-dom';
import ManagerHome from '../pages/Manager/Home';
import SignInPage from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Pricing from '../pages/SignUp/pricing';
import SuccessCheckout from '../pages/SuccessCheckout';
import LayoutDashboard from '../components/layout';
import ManageCoursePage from '../pages/Manager/Courses';
import ManagerHomePage from '../pages/Manager/Home';
import CreateCoursePage from '../pages/Manager/Create-Course';
import CourseDetail from '../pages/Manager/Course-Detail';
import AddContentCourse from '../pages/Manager/course-content-create';


const router = createBrowserRouter([
  {
    path: "/",
    element: <ManagerHome />,
  },
  {
    path: "/manager/sign-in",
    element: <SignInPage />,
  },
  {
    path: "/manager/sign-up",
    element: <SignUp />,
  },
  {
    path: "/pricing",
    element: <Pricing />,
  },
  {
    path: "/success-checkout",
    element: <SuccessCheckout />,
  },
  {
    path: "/manager",
    element: <LayoutDashboard />,
    children: [
      {
        index: true,
        element: <ManagerHomePage />
      },
      {
        path : "/manager/courses",
        element : <ManageCoursePage />
      },
      {
        path : "/manager/courses/create",
        element : <CreateCoursePage />
      },
      {
        path : "/manager/courses/:id",
        element : <CourseDetail />
      },
      {
        path: "/manager/courses/:id/add-content",
        element: <AddContentCourse />
      }
    ]
  }
])

export default router;