import Category from './components/Category/Category';
import Contact from './components/Contact/Contact';
import CreateListing from './components/CreateListing/CreateListing';
import Listing from './components/Listing/Listing';
import Explore from './pages/Explore/Explore';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import Offers from './pages/Offers/Offers';
import Signin from './pages/Signin/Signin';
import Signup from './pages/Signup/Signup';

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
