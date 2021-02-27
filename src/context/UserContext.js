import React from "react";
import APIContext from "../context/APIContext";
const axios = require('axios');

var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();

function userReducer(state, action) {

  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, isAuthenticated: true };
    case "SIGN_OUT_SUCCESS":
      return { ...state, isAuthenticated: false };
    case "LOGIN_FAILURE":
      return {
        ...state,
        error: true,
        userMsg: action.message,
        isAuthenticated: false
      };
    case "REGISTER_SUCCESS":
      return {
        ...state,
        error: true,
        userMsg: action.message,
        isAuthenticated: false
      };
    case "REGISTER_FAILURE":
      return {
        ...state,
        error: true,
        userMsg: action.message,
        isAuthenticated: false
      };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({ children }) {
  var [state, dispatch] = React.useReducer(userReducer, {
    isAuthenticated: !!localStorage.getItem("token"),
  });

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  var context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
}

function useUserDispatch() {
  var context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
}

export { UserProvider, useUserState, useUserDispatch, loginUser, registerUser, signOut, UserStateContext };

function loginUser(dispatch, login, password, history, setIsLoading, setError) {
  setError(false);
  setIsLoading(true);

  if (!!login && !!password) {

    let loginRequestBody = {
      email: login,
      password: password
    };

    const loginOptions = {
      method: "POST",
      data: loginRequestBody,
      baseURL: APIContext.login.url
    };

    axios(loginOptions)
      .then(function (response) {
        if (!response.data.error && response.status === 200) {
          setError(null)
          setIsLoading(false)
          localStorage.setItem('email', login)
          localStorage.setItem('user', response.data.user)
          localStorage.setItem('token', response.headers.token)
          dispatch({ type: 'LOGIN_SUCCESS' })
          history.push('/app/dashboard')
        }
        else if (response.data.error) {
          setError(response.data.message);
          setIsLoading(false)
          dispatch({ type: "LOGIN_FAILURE", message: response.data.message});
        }
      })
      .catch(function (error) {
        setError(true);
        setIsLoading(false)
        dispatch({ type: "LOGIN_FAILURE", message: error.response.data.message });
      })
      .finally(function () {
      });
  } else {
    dispatch({ type: "LOGIN_FAILURE" });
    setError(true);
    setIsLoading(false);
  }
}

function registerUser(dispatch, name, login, password, history, setIsLoading, setError) {
  setError(false);
  setIsLoading(true);
  if (!!name && !!login && !!password) {

    let registerRequestBody = {
      name: name,
      email: login,
      password: password
    };

    const registerOptions = {
      method: "POST",
      data: registerRequestBody,
      baseURL: APIContext.register.url
    };

    axios(registerOptions)
      .then(function (response) {
        if (!response.data.error && response.status === 200) {
          setError(response.data.message);
          setIsLoading(false)
          dispatch({ type: 'REGISTER_SUCCESS', message: "Success! Pls signin to continue" })
        }
        else if (response.data.error) {
          setError(response.data.message);
          setIsLoading(false)
          dispatch({ type: "REGISTER_FAILURE", message: response.message });
        }
      })
      .catch(function (error) {
        setError(true);
        setIsLoading(false)
        dispatch({ type: "REGISTER_FAILURE", message: error.response.data.message });
      })
      .finally(function () {
      });
  } else {
    dispatch({ type: "REGISTER_FAILURE" });
    setError(true);
    setIsLoading(false);
  }

}

function signOut(dispatch, history) {
  localStorage.removeItem("token");
  dispatch({ type: "SIGN_OUT_SUCCESS" });
  history.push("/login");
}
