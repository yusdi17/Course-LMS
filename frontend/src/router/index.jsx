import { createBrowserRouter } from 'react-router-dom';
import ManagerHome from '../pages/ManagerHome';
import SignInPage from '../pages/SignIn';
import SignUp from '../pages/SignUp';


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
  }
])

export default router;