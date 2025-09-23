import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const initialState = [];

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    setBlogs: (state, action) => {
      return action.payload
    },
    addBlog: (state, action) => {
      state.push(action.payload)
    }
  },
});

export const { setBlogs, addBlog } = blogSlice.actions;

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
    dispatch(setBlogs(sortedBlogs))
  }
}

export const createBlog = (blogObject) => {
  return async dispatch => {
    const newBlog = await blogService.create(blogObject)
    dispatch(addBlog(newBlog))
  }
}

export default blogSlice.reducer;
