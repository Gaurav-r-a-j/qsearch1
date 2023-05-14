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
import OrderDetails from './pages/Orders/OrderDetails';
import Orders from './pages/Orders/Orders';
import PrivacyPolicy from './pages/FooterPages/PrivacyPolicy';
import CancellationPolicy from './pages/FooterPages/CancellationPolicy';
import ShippingPolicy from './pages/FooterPages/ShippingPolicy';
import RefundProcess from './pages/FooterPages/RefundProcess';
import TermsofUse from './pages/FooterPages/TermsOfUse';

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
        path: '/order/:orderId',
        element: <OrderSuccess />
      },
      {
        path: '/orders',
        element: <Orders />
      },
      {
        path: '/my-orders',
        element: <Orders />
      },
      {
        path: '/orders/:orderId',
        element: <OrderDetails/>
      },
      {
        path: '/privacy-policy',
        element: <PrivacyPolicy/>
      },
      {
        path: '/shipping-returns',
        element: <ShippingPolicy/>
      },
      {
        path: '/cancellation-policy',
        element: <CancellationPolicy/>
      },
      {
        path: '/terms-of-use',
        element: <TermsofUse/>
      },
      {
        path: '/refund-process',
        element: <RefundProcess/>
      },


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
