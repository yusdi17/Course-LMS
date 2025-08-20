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
import CoursePreview from '../pages/Manager/course-preview';
import ManageStudentsPage from '../pages/Manager/Students/manage-students';
import CreateStudentsPage from '../pages/Manager/Students/create-students';
import StudentPage from '../pages/student/Student-Overview';


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
      },
      {
        path: "/manager/courses/:id/preview",
        element: <CoursePreview />
      },
      {
        path: "/manager/students",
        element: <ManageStudentsPage />
      },
      {
        path: "/manager/students/create",
        element: <CreateStudentsPage />
      }
    ]
  },
  {
    path: "/student",
    element: <LayoutDashboard isAdmin={false}/>,
    children: [
      {
        index: true,
        element: <StudentPage />
      },
      {
        path : "/student/detail-course/:id",
        element : <CoursePreview />
      }
    ]
  }
])

export default router;