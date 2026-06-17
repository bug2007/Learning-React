import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// import BlogPage, { loader as postsLoader } from './pages/Blog';  // going to lazy load this BlogPage and loader: load code only when it's needed
import HomePage from './pages/Home';
// import PostPage, { loader as postLoader } from './pages/Post';  // going to lazy load these 2 as well
import RootLayout from './pages/Root';

const BlogPage = lazy(() => import('./pages/Blog')); // lazy loading BlogPage component
const PostPage = lazy(() => import('./pages/Post'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'posts',
        children: [
          // { index: true, element: <BlogPage />, loader: postsLoader },
          { index: true, element: (<Suspense fallback={<p>Loading...</p>}><BlogPage /></Suspense>), loader: () => import('./pages/Blog').then(module => module.loader())}, // lazy loading the loader and then executing it right away after getting it
          // { path: ':id', element: <PostPage />, loader: postLoader },
          { path: ':id', element: <Suspense fallback={<p>Loading...</p>}><PostPage /></Suspense>, loader: (meta) => import('./pages/Post').then(module => module.loader(meta))},
        ],
      },
    ],
  }, 
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
