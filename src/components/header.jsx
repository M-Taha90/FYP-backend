import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../context/UserContext';

const Header = ({ user, setUser, isLoggedIn, setIsLoggedIn }) => {
  console.log("setIsLoggedIn", isLoggedIn);
  

  const location = useLocation();
  const {usertype, setUsertype } = useUser();

  useEffect(() => {
    // Update usertype when user data is set (received from backend)
    if (user && user.usertype) {
      setUsertype(user.usertype); // Update usertype globally
    }
  }, [user, setUsertype]);

  //useEffect(() => {
    //console.log("Global context usertype updated:", usertype);
    //alert(`Global context usertype updated: ${usertype}`); // This will show the correct updated value
  //}, [usertype]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true); // true for login, false for signup
  const [formData, setFormData] = useState({email:"", username:"", password:"", confirmPassword:""});

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");

    if (token) {
      localStorage.setItem("token", token); // Store token in localStorage
      // Fetch user info or update state based on token
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // Now you can make authenticated requests
    }
  }, [location]);

  // Function to toggle between login and signup forms
  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value});
  };

  //Google Authentication
  const handleGoogleAuth = () => {
    window.location.href = "http://localhost:4000/auth/google";
  };

   // Signup function
   const handleSignup = async (e) => {
    e.preventDefault();
    alert("Handle Sign Up body");
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    alert("Password rechecked");
    try {
      alert("sending request");
      const response = await axios.post("http://localhost:4000/signup", {
        email: formData.email,
        username: formData.username,
        password: formData.password, 
      });
      alert("post request send");
      if (response.data.success) {
        const token = response.data.token;
        localStorage.setItem("token", token); // Store the token in localStorage
        setUser({ id: response.data.user.user_id, username: response.data.user.username, email: response.data.user.email, usertype: response.data.user.usertype_id });
        setIsLoggedIn(true);
        localStorage.setItem("usertype", response.data.user.usertype_id);
        setIsModalOpen(false); // Close the modal
        window.location.reload();
        alert("successful creation");
      }
    } catch (err) {
      console.error(err);
      alert("Signup failed");
    }
  };

  // Login function
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:4000/login", {
        email: formData.email,
        password: formData.password,
      });

      if (response.data.success) {
        const token = response.data.token;
        localStorage.setItem("token", token); // Store the token in localStorage
        setUser({ id: response.data.user.user_id, username: response.data.user.username, email: response.data.user.email, usertype: response.data.user.usertype_id }); // Update the user state with the email or any other user info
        setIsLoggedIn(true);
        //alert(user.usertype);
        //setUsertype(response.data.user.usertype_id);
        localStorage.setItem("usertype", response.data.user.usertype_id); 
        setIsModalOpen(false); // Close the modal
        window.location.reload();
        alert("Login Successfull");
      }
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };

  const handleLogout = () => {
    // Remove token from localStorage and reset state
    localStorage.removeItem('token');
    setUser(null);
    setUsertype(1);
    localStorage.removeItem("usertype");
    setIsLoggedIn(false);
    window.location.href = "http://localhost:5173/";
  };
  
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [modalType, setModalType] = useState(""); // Tracks which modal to show
  const [orgDetails, setOrgDetails] = useState(null);
  const [expertDetails, setExpertDetails] = useState(null);

  const handleOrganizationSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const organizationName = formData.get("organizationName");
    const contactEmail = formData.get("contactEmail");
    const websiteURL = formData.get("websiteURL");
    const purpose = formData.get("purpose");
    // Validate URL
    if (!websiteURL.startsWith("http") || !websiteURL.includes(".")) {
      alert("Please enter a valid website URL.");
      return;
    }
    console.log("User ID being sent:", user.id);

    try {
      const response = await axios.post("http://localhost:4000/join-as-organization", {
        user_id: user.id, // Assume user.id is stored globally or via context
        org_name: organizationName,
        contact_email: contactEmail,
        web_url: websiteURL,
        purpose,
      });
      if (response.data.success) {
        setUsertype(2); // Update user type globally
        alert(usertype);
        alert("Organization registered successfully!");
        setIsModalOpen2(false);
      } else {
        alert("Failed to register organization.");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred.");
    }
  };

  const handleExpertSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const qualifications = formData.get("qualifications");
    const linkedinProfile = formData.get("linkedinProfile");
  
    // Validate LinkedIn URL
    if (!linkedinProfile.startsWith("https://www.linkedin.com/")) {
      alert("Please enter a valid LinkedIn profile URL.");
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:4000/join-as-expert", {
        user_id: user.id, // Assume user.id is stored globally or via context
        degree_year: qualifications,
        linkedin_url: linkedinProfile,
      });
  
      if (response.data.success) {
        setUsertype(3); // Update user type globally
        alert(usertype);
        alert("Expert registered successfully!");
        setIsModalOpen2(false);
      } else {
        alert("Failed to register expert.");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred.");
    }
  };
  

  return (

    <>

    <header className="sticky top-0 z-50 bg-white dark:bg-black">

    <div className="navbar" >
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            <li><Link to="/" className="font-open-sans text-lg">
                  Home
                </Link>
            </li>
            <li><Link to="/meetups">Meet Ups</Link></li>
            <li><Link to="/donation">Donations</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
        </div>
        <a className="btn btn-ghost font-raleway text-3xl font-bold text-gray-800 dark:text-white">Sairaab</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><Link to="/" className='hover:underline'>Home</Link></li>
          <li><Link to="/meetups" className='hover:underline'>Meet Ups</Link></li>
          <li><Link to="/donation" className='hover:underline'>Donations</Link></li>
          <li><Link to="/about" className='hover:underline'>About</Link></li>
        </ul>
      </div>
      <div className="navbar-end">
      <label className="swap swap-rotate justify-center">
          {/* this hidden checkbox controls the state */}
          <input type="checkbox" className="theme-controller" value="synthwave" />

          {/* sun icon */}
          <svg
            className="swap-off h-6 w-6 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24">
            <path
              d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
          </svg>

          {/* moon icon */}
          <svg
            className="swap-on h-6 w-6 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24">
            <path
              d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
          </svg>
        </label>

        {!isLoggedIn ? (
          <>
                <a className="btn ml-3 mr-2"
                onClick={() => {
                  setIsLogin(true); // Set to login form by default
                  setIsModalOpen(true);
                  setModalType("login");
                }}
                >Login
                </a>
        
                <a className="btn" 
                onClick={() => {
                  setIsLogin(false); // Set to signup form by default
                  setIsModalOpen(true);
                  setModalType("signup");
                }}
                >
                  Sign-Up
                </a>
          </>
        ) : (
            <details className="dropdown">
              <summary className="btn m-1">Welcome {user?.username  || user?.email || "User" }{" "}{usertype===2 && "🌐"} {usertype===3 && "✔️"}</summary>
              <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                {usertype===1 && (
                  <>
                    <li>
                      <a
                        onClick={() => {
                          setModalType("organization");
                          setIsModalOpen2(true);
                        }}  
                      >Join as Organization
                      </a>
                    </li>
                    <li>
                    <a
                      onClick={() => {
                        setModalType("expert");
                        setIsModalOpen2(true);
                      }}
                    >
                      Join as Environmental Expert
                    </a>
                  </li>
                </>
              )}
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </details>      

        )
      }
      </div>
    </div>
    </header>


{/* Modal */}
{isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 md:p-8 rounded-lg shadow-lg max-w-md w-full overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-900  dark:text-black">
                {isLogin ? 'Sign in to our platform' : 'Create your account'}
              </h3>
              <button
                type="button"
                className="text-gray-400 hover:bg-gray-200 rounded-lg text-sm w-8 h-8 flex items-center justify-center"
                onClick={() => setIsModalOpen(false)}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal body */}
            <form onSubmit={isLogin ? handleLogin : handleSignup} className="space-y-2 md:space-y-4">
              <div className='space-y-2'>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                  placeholder="name@company.com"
                  required
                />
              </div>

              {isLogin ? (
                // Login form specific fields
                <>
                  <div className='space-y-2'>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                      Your password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                  <div className="flex justify-between space-y-2">
                    <div className="flex items-center">
                      <input
                        id="remember"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                      />
                      <label htmlFor="remember" className="ml-2 text-sm text-gray-900 dark:text-gray-500">
                        Remember me
                      </label>
                    </div>
                    <a href="#" className="text-sm text-blue-700 hover:underline">
                      Lost Password?
                    </a>
                  </div>
                  <button
                    type="submit"
                    className="w-full space-y-2 text-white bg-blue-700 hover:bg-blue-800 rounded-lg px-5 py-2.5"
                  >
                    Login to your account
                  </button>
                  <div className="text-sm text-center space-y-2 text-gray-500">
                    Not registered?{' '}
                    <button
                      type="button"
                      onClick={toggleForm}
                      className="text-blue-700 hover:underline"
                    >
                      Create account
                    </button>
                  </div>
                </>
              ) : (
                // Signup form specific fields
                <>
                  <div>
                    <label htmlFor='text' className='block mb-2 text-sm font-medium text-gray-900 dark:text-black'>
                      Username
                    </label>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                      placeholder="Username"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                      Confirm password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      id="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 rounded-lg px-5 py-2.5"
                  >
                    Sign up
                  </button>
                  <div className="text-sm text-center text-gray-500">
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={toggleForm}
                      className="text-blue-700 hover:underline"
                    >
                      Sign in
                    </button>
                  </div>

                  <div className="flex items-center justify-center my-4">
                    <div className="w-full border-t border-gray-300"></div>
                    <span className="mx-3 text-gray-500">OR</span>
                    <div className="w-full border-t border-gray-300"></div>
                  </div>

                  {/* Google SignUp Button */}
                  <button
                    type="button"
                    className="w-full bg-white text-gray-700 border border-gray-300 hover:bg-gray-100 rounded-lg px-5 py-2.5 flex items-center justify-center space-x-2"
                    onClick={handleGoogleAuth}
                  >
                    <img
                      src="/src/assets/images/GooglePNG.png"
                      alt="Google logo"
                      className="w-5 h-5"
                    />
                    <span>Sign up with Google</span>
                  </button>

                  {/* Terms of Use & Privacy Policy */}
                  <p className="text-xs text-gray-500 mt-4">
                    By signing up to create an account, I accept the organization's{' '}
                    <a href="#" className="text-blue-600 hover:underline">
                      Terms of Use
                    </a>{' '}
                    and{' '}
                    <a href="/blank" className="text-blue-600 hover:underline">
                      Privacy Policy
                    </a>.
                  </p>
                </>
              )}
              
            </form>
          </div>
        </div>
      )}
{isModalOpen2 && (
  <div className="modal modal-open">
    <div className="modal-box">
    {modalType === "organization" && (
        <form onSubmit={handleOrganizationSubmit}>
          <h3 className="font-bold text-lg">Join as Organization</h3>
          <input
            type="text"
            name="organizationName"
            placeholder="Organization Name"
            className="input input-bordered w-full mt-2"
            required
          />
          <input
            type="email"
            name="contactEmail"
            placeholder="Contact Email"
            className="input input-bordered w-full mt-2"
            required
          />
          <input
            type="url"
            name="websiteURL"
            placeholder="Website URL"
            className="input input-bordered w-full mt-2"
            required
          />
          <textarea
            name="purpose"
            placeholder="Purpose of Joining"
            className="textarea textarea-bordered w-full mt-2"
            required
          ></textarea>
          <div className="modal-action">
            <button type="submit" className="btn">Join</button>
            <button
              type="button"
              onClick={() => setIsModalOpen2(false)}
              className="btn btn-ghost"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {modalType === "expert" && (
        <form onSubmit={handleExpertSubmit}>
          <h3 className="font-bold text-lg">Join as Environmental Expert</h3>
          <input
            type="text"
            name="qualifications"
            placeholder="Qualifications (e.g., BSc Environmental Science, 2020)"
            className="input input-bordered w-full mt-2"
            required
          />
          <input
            type="url"
            name="linkedinProfile"
            placeholder="LinkedIn Profile URL"
            className="input input-bordered w-full mt-2"
            required
          />
          <div className="modal-action">
            <button type="submit" className="btn">Join</button>
            <button
              type="button"
              onClick={() => setIsModalOpen2(false)}
              className="btn btn-ghost"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
    </div>
)}
    </>
  );
};

export default Header;