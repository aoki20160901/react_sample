import React, { createContext, useCallback, useEffect, useState } from "react";
import { rest } from "../../data/rest";
import { User, LoginCredentials, AuthUser } from "./Interfaces";

const defaultState = {
  user: {
    id: '',
    name: '',
    company: '',
    tel: '',
  } as User,
  isLoggedIn: false,
  authenticate: (authUser: AuthUser) => { },
  logout: () => { },
  login: (credential: LoginCredentials) => {},
}

const checkToken = (token: string) => {
  let valid = false;
  if (token) {
    let ary = token.trim().split(".");
    let json = JSON.parse(window.atob(ary[1]));
    let now = new Date();
    if (Math.floor(now.getTime() / 1000) <= json.exp) {
      valid = true;
    }
  }
  return valid;
}

export const AuthContext = createContext(defaultState);

export const AuthProvider: React.FC = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User>(defaultState.user);

  const authenticate = useCallback(
    (authUser: AuthUser) => {
      const { token, ...user } = authUser;
      localStorage.setItem('token', token);
      setIsLoggedIn(true);
      setUser(user);
    },
    [],
  )

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      const authUser = await rest.post<AuthUser>('auth/login', credentials)
        .then(({ data }) => data)
        .catch(err => {
        alert('login error !');
        console.log(err);
      });
      authUser && authenticate(authUser);
    },
    [authenticate]
  )

  const logout = useCallback(
    () => {
      localStorage.removeItem('token');
      setIsLoggedIn(false);
      setUser(defaultState.user);
    }, 
    []
  )

  useEffect(() => {
    const token = localStorage.getItem('token') || '';
    const valid = checkToken(token);
    setIsLoggedIn(valid);
    // todo: get user info from api
    // setUser(user);
  }, [])

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, authenticate, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}