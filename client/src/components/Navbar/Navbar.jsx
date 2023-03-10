import React, { useContext, useState } from 'react'
import './Navbar.css'
import { Link, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Signup from '../Modal/Signup'
import Login from '../Modal/Login'
import { useDispatch, useSelector } from 'react-redux'
import { setUser, clearUser } from '../../redux/userSlice'
import api from '../../axios'
import { NotificationContext } from '../CustomNotification/CustomNotification'
import logo from '../../assets/logo.webp'
import UserProfile from './UserProfile'

const Navbar = () => {
  const { showNotification } = useContext(NotificationContext);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [userProfile, setUserProfile] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.user)
  const location = useLocation()




  // console.log(user)

  const SignupModal = () => {
    setIsSignupOpen(true);
  }
  const LoginModal = () => {
    setIsLoginOpen(true);
  }


  const handleBurger = () => {
    document.getElementById("burger").classList.toggle("is-active");
    document.getElementById("menu").classList.toggle("is-active");
  }

  //to handle ui
  useEffect(() => {
    window.addEventListener("scroll", () => {
      document.getElementById("header").classList.toggle("on-scroll", window.scrollY > 0);
    });

    // //?Close Navbar Menu on Click Menu Links
    document.querySelectorAll(".menu_link").forEach((link) => {
      link.addEventListener("click", () => {
        document.getElementById("burger").classList.remove("is-active");
        document.getElementById("menu").classList.remove("is-active");
      });
    });

  }, [])


  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true)
      try {
        const { data } = await api.get("/auth/user")
        dispatch(setUser(data));
        console.log(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [dispatch])

  return (

    <>
      <Signup isOpen={isSignupOpen} setIsModalOpen={setIsSignupOpen} />
      <Login isOpen={isLoginOpen} setIsModalOpen={setIsLoginOpen} />
      <UserProfile isOpen={userProfile} setIsProfileOpen={setUserProfile} />

      <header className="header " id="header">
        <nav className="navbar container d-flex-spaceb">
          {/* <Link to="/" className="brand"> qsearch </Link> */}

          <div className="left d-flex-center gap1">

            <Link to="/" className="brand d-flex-center">
              <img title='qsearch' src={logo} alt="" />
            </Link>
            <div
              title='menu'
              onClick={handleBurger}
              className="burger" id="burger">
              <span className="burger_line"></span>
              <span className="burger_line"></span>
              <span className="burger_line"></span>
            </div>

          </div>

          <div className="right d-flex-center  gap1">

            <div className="menu" id="menu">
              <ul className="menu-inner">
                <li className="menu_item"><Link to="/" className={`menu_link ${location.pathname === '/' ? 'active_link' : ''}`}>Home</Link></li>
                <li className="menu_item"><Link to="/print" className={`menu_link ${location.pathname === '/print' ? 'active_link' : ''}`}>Print</Link></li>
                {/* <li className="menu_item"><Link to="/" className="menu_link">Products</Link></li> */}
                {/* <li className="menu_item"><Link to="/" className="menu_link">Reviews</Link></li> */}
                <li className="menu_item">
                  <Link to="/support" className={`menu_link ${location.pathname === '/support' ? 'active_link' : ''}`}>Support</Link>
                </li>
              </ul>
            </div>
            <div className="login_signup">
              {
                (user?.name === undefined || null)
                  ?
                  (
                    <>
                      <button
                        title='Sign Up'
                        disabled={loading}
                        onClick={SignupModal}
                        className="menu_block login_signup_btn">Sign up
                      </button>
                      <button
                        title='Login'
                        disabled={loading}
                        onClick={LoginModal}
                        className="menu_block login_signup_btn">Login
                      </button>
                    </>
                  )
                  :
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setUserProfile(prev => !prev)
                      }}
                      title={user?.name.split(' ')[0]}
                      className=" user_found menu_block ">
                      {user?.name.split(' ')[0]}
                    </button>
                    <button
                      title='Logout'
                      onClick={() => {
                        localStorage.removeItem('token')
                        dispatch(clearUser({ user: null }))
                        showNotification('warning', 'Login Failed!', 2000, 'top', 'Logged out!');
                      }}
                      className=" user_found menu_block user_logout ">
                      Logout
                    </button>
                  </>
              }
            </div>

          </div>
        </nav>
      </header>
    </>

  )
}

export default Navbar