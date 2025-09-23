import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";
import blogService from "../services/blogs";

const initialState = null;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      return action.payload
    },
    clearUser: (state) => {
      return null
    }
  },
});

export const { setUser, clearUser } = userSlice.actions;

export const loginUser = (credentials) => {
  return async dispatch => {
    const user = await loginService.login(credentials)
    window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
    blogService.setToken(user.token)
    dispatch(setUser(user))
  }
}

export const logoutUser = () => {
  return dispatch => {
    window.localStorage.removeItem('loggedBloglistUser')
    blogService.setToken(null)
    dispatch(clearUser())
  }
}

export const initializeUser = () => {
  return dispatch => {
    const userJSON = window.localStorage.getItem('loggedBloglistUser')
    if (userJSON) {
      const user = JSON.parse(userJSON)
      blogService.setToken(user.token)
      dispatch(setUser(user))
    }
  }
}

export default userSlice.reducer;
