import { createBrowserRouter } from 'react-router-dom';
import ManagerHome from '../pages/ManagerHome';
import SignInPage from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Pricing from '../pages/SignUp/pricing';
import SuccessCheckout from '../pages/SuccessCheckout';
import LayoutDashboard from '../components/layout';


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
  }
])

export default router;