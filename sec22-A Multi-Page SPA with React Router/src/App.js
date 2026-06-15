import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/Home';
import ProductsPage from './pages/Products';
import RootLayout from './pages/Root';
import ErrorPage from './pages/Error';

const router = createBrowserRouter([
  {
    path: '/', 
    element: <RootLayout />, //root layout wud be in every page u go to. it acts as a wrapper for the children components below. RootLayout will be in both the HomePage and ProductsPage
    errorElement: <ErrorPage />,
    children: [
      {path: '/', element: <HomePage />},  
      {path: '/products', element: <ProductsPage />}
    ]
  },
  
])


function App() {
  return <RouterProvider router={router} />;
}

export default App;
