import { createContext, useContext, useReducer } from "react";
import { FAKE_USER } from "../utils/functions.js";
import PropTypes from "prop-types";

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  error: "false",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "logout":
      return { ...state, user: null, isAuthenticated: false };
    case "error":
      return { ...state, error: action.payload, isAuthenticated: false };
  }
};

export default function AuthProvider({ children }) {
  const [{ user, isAuthenticated, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const login = ({ email, password }) => {
    if (email == FAKE_USER.email && password == FAKE_USER.password)
      dispatch({ type: "login", payload: { email, password } });
    else dispatch({ type: "error", payload: "There is somthing wrong" });
  };

  const logout = () => {
    dispatch({ type: "logout" });
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, error, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export function useAuth() {
  const context = useContext(AuthContext);

  if (context == undefined)
    throw new Error("You are using the context out of the provider");

  return context;
}
