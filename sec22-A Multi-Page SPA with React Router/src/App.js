import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/Home';
import ProductsPage from './pages/Products';
import RootLayout from './pages/Root';
import ErrorPage from './pages/Error';
import ProductDetailPage from './pages/ProductDetail';

const router = createBrowserRouter([
  {
    path: '/', 
    element: <RootLayout />, //root layout wud be in every page u go to. it acts as a wrapper for the children components below. RootLayout will be in the HomePage, ProductsPage etc.
    errorElement: <ErrorPage />,
    children: [
      {path: '/', element: <HomePage />},  
      {path: '/products', element: <ProductsPage />},
      {path: '/products/:productId', element: <ProductDetailPage />}  // u can extract this dynamic productId value inside ProductDetailPage component using useParams
    ]
  },
  
])


function App() {
  return <RouterProvider router={router} />;
}

export default App;
