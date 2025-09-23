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
    setComments: (state, action) => {
      const { blogId, comments } = action.payload
      const blog = state.find(b => b.id === blogId)
      if (blog) {
        blog.comments = comments
      }
    },
    addComment: (state, action) => {
      const { blogId, comment } = action.payload
      const blog = state.find(b => b.id === blogId)
      if (blog) {
        if (!blog.comments) {
          blog.comments = []
        }
        blog.comments.push(comment)
      }
    },
  },
});

export const { setBlogs, addBlog, updateBlog, removeBlog, setComments, addComment } = blogSlice.actions;

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

export const loadComments = (blogId) => {
  return async dispatch => {
    const comments = await blogService.getComments(blogId)
    dispatch(setComments({ blogId, comments }))
  }
}

export const createComment = (blogId, commentText) => {
  return async dispatch => {
    const comment = await blogService.addComment(blogId, commentText)
    dispatch(addComment({ blogId, comment }))
  }
}

export default blogSlice.reducer;
