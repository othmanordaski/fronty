import React, { createContext, useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import { loginUserApi } from '@services/userService'; 
import Cookies from 'js-cookie';

const UserContext = createContext();

const isTokenExpired = (decodedToken) => {
  const currentTime = Date.now() / 1000;
  return decodedToken.exp < currentTime;
};

const UserProvider = ({ children  } ) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(true);

  useEffect(() => {
    const storedToken = Cookies.get("tokenAuth");
    if (storedToken) {
      handleToken(storedToken);
    } else {
      setIsReady(true);
    }
  }, []);

  const handleToken = (token) => {
    try {
      const decodedToken = jwtDecode(token);
      if (isTokenExpired(decodedToken)) {
        logout();
        return;
      }
      setUser(decodedToken);
      setToken(token);
      setIsLoggedIn(true);
      console.log('decodedToken:', decodedToken);
      if (decodedToken.role === 'Admin') {
        navigate('/admin/dashboard/home');
      } else if (decodedToken.role === 'Client') {
        navigate('/user/dashboard');
      } else {
        navigate('/login');
      }
    } catch (error) {
      console.error('Invalid token:', error);
      logout();
    } finally {
      setIsReady(true);
    }
  };

  const login = async (email, password) => {
    const endpoints = ['admin', 'client', 'restaurant', 'delivery'];
    for (const endpoint of endpoints) {
      try {
        const res = await loginUserApi(email, password, endpoint);
        const newToken = res.data.token;
        if (newToken) {
          Cookies.set("tokenAuth", newToken);
          handleToken(newToken);
          return; // Exit the loop and function on successful login
        } else {
          console.error('Received empty token from endpoint:', endpoint);
        }
      } catch (error) {
        if (error.response && error.response.status === 500) {
          console.log(`Endpoint ${endpoint} returned a 500 error. Trying next endpoint.`);
        } else {
          console.error(`Error logging in with endpoint ${endpoint}:`, error.message);
          throw error; // If the error is not 500, throw it
        }
      }
    }
    console.error('All endpoints failed');
  };


  const logout = () => {
    Cookies.remove("tokenAuth");
    setToken(null);
    setUser(null);
    setIsLoggedIn(false);
    navigate('/login'); 
  };
  const value = useMemo(() => ({ login, user, token, logout, isLoggedIn , isLoginModalOpen,setIsLoginModalOpen}), [user, token, isLoggedIn,isLoginModalOpen]);


  return (
    <UserContext.Provider value={value}>
      {isReady ? children : <div>Loading...</div>}
    </UserContext.Provider>
  );
};

export const useAuth = () => React.useContext(UserContext);

export default UserProvider;