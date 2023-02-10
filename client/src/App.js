import './App.css'
import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from 'react-router-dom';
import Home from './pages/Home/Home';
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Print from './pages/Print/Print';
import CreatePost from './pages/CreatePost/CreatePost';
import SinglePostPage from './pages/SinglePostPage/SinglePostPage';
import Support from './pages/Support/Support';
import SearchResults from './pages/Search/SearchResult';
import { useRef } from 'react';
import Notification, { NotificationContext } from './components/CustomNotification/CustomNotification';
import OrderSuccess from './pages/OrderSuccess/OrderSuccess';
import ErrorPage from './pages/Error/ErrorPage';

const Layout = () => {
  const topRef = useRef(null)
  const { notification } = React.useContext(NotificationContext);

  return (
    <div ref={topRef} className="app">
      <Notification notification={notification} />
      <Navbar />
      <Outlet />
      <Footer topRef={topRef} />
    </div>
  )
}




const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/print',
        element: <Print />
      },
      {
        path: '/createPost',
        element: <CreatePost />
      },
      {
        path: '/support',
        element: <Support />
      },
      {
        path: '/post/:id',
        element: <SinglePostPage />
      },
      {
        path: '/search',
        element: <SearchResults />
      },
      {
        path: '/order',
        element: <OrderSuccess />
      }
      

      // {
      //   path: '/event/:event_name',
      //   element: <Event />
      // },

    ]
  },

])




function App() {
  return (

    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
