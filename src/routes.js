import { lazy } from 'react';

const Explore = lazy(() => import('./pages/Explore/Explore'));
const Offers = lazy(() => import('./pages/Offers/Offers'));
const Contact = lazy(() => import('./components/Contact/Contact'));
const Category = lazy(() => import('./components/Category/Category'));
const Listing = lazy(() => import('./components/Listing/Listing'));
const CreateListing = lazy(() =>
  import('./components/CreateListing/CreateListing')
);
const Signin = lazy(() => import('./pages/Signin/Signin'));
const Signup = lazy(() => import('./pages/Signup/Signup'));
const ForgotPassword = lazy(() =>
  import('./pages/ForgotPassword/ForgotPassword')
);
const PrivateRoute = lazy(() =>
  import('./components/PrivateRoute/PrivateRoute')
);
const Profile = lazy(() => import('./pages/Profile/Profile'));

const routes = [
  { path: '/', element: <Explore /> },
  { path: '/offers', element: <Offers /> },
  { path: '/contact/:landlordId', element: <Contact /> },
  { path: '/category/:categoryName', element: <Category /> },
  { path: '/category/:categoryName/:listingId', element: <Listing /> },
  { path: '/create-listing', element: <CreateListing /> },
  { path: '/sign-in', element: <Signin /> },
  { path: '/sign-up', element: <Signup /> },
  { path: '/forgot-password', element: <ForgotPassword /> },
  {
    path: '/profile',
    element: <PrivateRoute />,
    children: [
      {
        path: '/profile',
        element: <Profile />,
      },
    ],
  },
];

export default routes;
