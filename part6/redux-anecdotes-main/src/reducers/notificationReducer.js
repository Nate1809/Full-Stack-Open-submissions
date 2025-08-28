import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '', // what should the state hold? maybe text and can it be null?
  reducers: {
    setNotification: (state, action) => {
      return action.payload
    },
    clearNotification: (state, action) => {
      return ''
    }
  }
})

export const { setNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer