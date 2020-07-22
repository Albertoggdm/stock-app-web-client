import React, { createContext, useReducer } from 'react'
import jwtDecode from 'jwt-decode'

const ACTIONS = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
}

export const JWT_TOKEN_ITEM = 'stockappTokenJWT'

let localstorageUser = null

if (localStorage.getItem(JWT_TOKEN_ITEM)) {
  const decodedToken = jwtDecode(localStorage.getItem(JWT_TOKEN_ITEM))

  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem(JWT_TOKEN_ITEM)
  } else {
    localstorageUser = decodedToken
  }
}

const initialState = {
  user: localstorageUser,
}

const AuthContext = createContext({
  user: null,
  login: (userData) => {},
  logout: () => {},
})

const authReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.LOGIN:
      return {
        ...state,
        user: action.payload,
      }
    case ACTIONS.LOGOUT:
      return {
        ...state,
        user: null,
      }
    default:
      return state
  }
}

const AuthProvider = (props) => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  const login = (userData) => {
    localStorage.setItem(JWT_TOKEN_ITEM, userData.token)
    dispatch({
      type: ACTIONS.LOGIN,
      payload: userData,
    })
  }

  const logout = () => {
    localStorage.removeItem(JWT_TOKEN_ITEM)
    dispatch({
      type: ACTIONS.LOGOUT,
    })
  }

  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout }}
      {...props}
    />
  )
}

export { AuthContext, AuthProvider }
