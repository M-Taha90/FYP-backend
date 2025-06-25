import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Footer from "./Components/footer";
import Header from "./Components/header";
import Home from "./Components/home";
import Donation from "./Components/donation";
import { verifyToken } from "./services/authService";
import About from "./Components/about";
import Meetups from "./Components/Meetups";
import { UserProvider } from "./context/UserContext";
import {jwtDecode} from "jwt-decode";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  

  
  useEffect(() => {

    const params = new URLSearchParams(window.location.search);
    const tokenFromURL = params.get("token");

    if (tokenFromURL) {
      // Step 2: Store token in localStorage
      localStorage.setItem("token", tokenFromURL);

      // Step 3: Remove token from the URL
      window.history.replaceState({}, document.title, "/");
    }

    const token = localStorage.getItem("token");
    console.log(token);
    

    if (token) {
      try {
        console.log("Inside");
        
        // Decode token to check expiry proactively

        const { exp } = jwtDecode(token);
        const isExpired = Date.now() >= exp * 1000;

        if (isExpired) {
          console.log("Token has expired");
          localStorage.removeItem("token");
          localStorage.removeItem("usertype");
          setIsLoggedIn(false);
          return;
        }
      } catch (error) {
        console.error("Failed to decode token:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("usertype");
        setIsLoggedIn(false);
        return;
      }

      verifyToken(token)
        .then((data) => {
          console.log("Verify Token Response:", data);
          setUser(data);
          setIsLoggedIn(true);
          console.log("token is valid");
        })
        .catch((err) => {
          console.log("Invalid token or error:", err);
          setIsLoggedIn(false); // Optionally, you can log out the user
          localStorage.removeItem("usertype");
          localStorage.removeItem("token");
        });
    }
  }, []);

  const ProtectedRoute = ({ user, children }) => {
    const [shouldRedirect, setShouldRedirect] = useState(false);
  
    useEffect(() => {
      if (!user || !user.id) {
        toast.warning("Please login or sign up to view this page!", {
          position: "top-center",
          autoClose: 3000, // Display for 3 seconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          toastId: "login-warning",
        });
  
        // Set redirection after the toast is displayed
        const redirectTimer = setTimeout(() => {
          setShouldRedirect(true);
        }, 3500); // Wait for 3.5 seconds (toast duration)
  
        return () => clearTimeout(redirectTimer);
      }
    }, [user]);
  
    if (shouldRedirect) {
      return <Navigate to="/" />;
    }
  
    if (!user || !user.id) {
      // Prevent rendering the protected page
      return null;
    }
  
    return children;
  };
  

  return (
    <UserProvider>
      <Router>
        <Header
          user={user}
          setUser={setUser}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
        />

        <main className="bg-white dark:bg-black">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/donation" element={<Donation user={user}
          setUser={setUser}
            />} />
            <Route path="/about" element={<About />} />
            <Route path="/meetups" element={<ProtectedRoute user={user}> <Meetups user={user}
          setUser={setUser}/> </ProtectedRoute>} />
          </Routes>
        </main>

        <Footer />
      </Router>
      <ToastContainer /> 
    </UserProvider>
  );
}

export default App;
