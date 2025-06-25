import axios from "axios";
import React, { createContext, useState, useContext, useEffect } from "react";
// import Cookies from 'js-cookie'
const UserContext = createContext();

export const UserProvider = ({ children }) => {

  useEffect(() => {
    const token = localStorage.getItem("token");
    if(token){
      axios.get("http://localhost:4000/")

    }
    else{
      setUsertype(1);
    }
  }, [])

  const [usertype, setUsertype] = useState(() => {

    const storedUsertype = localStorage.getItem("usertype");
    return storedUsertype ? parseInt(storedUsertype, 10) : 1;
  }); // Default to 'Normal'


  // Sync usertype changes to localStorage
  useEffect(() => {
    localStorage.setItem("usertype", usertype);
  }, [usertype]);


  return (
    <UserContext.Provider value={{ usertype, setUsertype }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
