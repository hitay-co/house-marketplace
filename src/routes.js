import Category from './components/Category';
import Contact from './components/Contact';
import CreateListing from './components/CreateListing';
import Listing from './components/Listing';
import Explore from './pages/Explore';
import ForgotPassword from './pages/ForgotPassword';
import Offers from './pages/Offers';
import Signin from './pages/Signin';
import Signup from './pages/Signup';

const routes = [
  { path: '/', element: Explore },
  { path: '/offers', element: Offers },
  { path: '/contact/:landlordId', element: Contact },
  { path: '/category/:categoryName', element: Category },
  { path: '/category/:categoryName/:listingId', element: Listing },
  { path: '/create-listing', element: CreateListing },
  { path: '/sign-in', element: Signin },
  { path: '/sign-up', element: Signup },
  { path: '/forgot-password', element: ForgotPassword },
];

export default routes;
