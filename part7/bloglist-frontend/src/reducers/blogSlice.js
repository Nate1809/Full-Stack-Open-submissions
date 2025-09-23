import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const initialState = [];

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    setBlogs: (state, action) => {
      return action.payload;
    },
    addBlog: (state, action) => {
      state.push(action.payload);
    },
    updateBlog: (state, action) => {
      const updatedBlog = action.payload
      return state.map(blog =>
        blog.id === updatedBlog.id ? updatedBlog : blog
      )
    },
    removeBlog: (state, action) => {
      const blogId = action.payload
      return state.filter(blog => blog.id !== blogId)
    },
  },
});

export const { setBlogs, addBlog, updateBlog, removeBlog } = blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);
    dispatch(setBlogs(sortedBlogs));
  };
};

export const createBlog = (blogObject) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blogObject);
    dispatch(addBlog(newBlog));
  };
};

export const likeBlog = (blog) => {
  return async dispatch => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    const updatedBlogFromServer = await blogService.update(
      updatedBlog,
      blog.id
    )
    dispatch(updateBlog(updatedBlogFromServer))
  }
}

export const deleteBlog = (blogId) => {
  return async dispatch => {
    await blogService.remove(blogId)
    dispatch(removeBlog(blogId))
  }
}

export default blogSlice.reducer;
