import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '', // what should the state hold? maybe text and can it be null?
  reducers: {
    modifyNotification: (state, action) => {
      return action.payload
    }
  }
})

export const { modifyNotification } = notificationSlice.actions
export default notificationSlice.reducer