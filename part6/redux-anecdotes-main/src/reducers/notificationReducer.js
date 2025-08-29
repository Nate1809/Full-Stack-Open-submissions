import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from "../services/anecdotes.js";
import {appendAnecdote} from "./anecdoteReducer.js";

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '', // what should the state hold? maybe text and can it be null?
  reducers: {
    // setNotification: (state, action) => {
    //   return action.payload
    // },
    displayNotification: (state, action) => {
      return action.payload
    },
    clearNotification: (state, action) => {
      return ''
    },
  }
})

export const { displayNotification, clearNotification } = notificationSlice.actions

export const setNotification = (message, durationSeconds) => {
  return async dispatch => {
    dispatch(displayNotification(message))
    setTimeout(() => {
      dispatch(clearNotification())
    }, durationSeconds * 1000)
  }
}

export default notificationSlice.reducer