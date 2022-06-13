import { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar/Navbar';
import Spinner from './components/Spinner/Spinner';
import routes from './routes';

const App = () => {
  const appRoutes = useRoutes(routes);
  return (
    <Suspense fallback={<Spinner />}>
      {appRoutes}
      <Navbar />
      <ToastContainer />
    </Suspense>
  );
};

export default App;
