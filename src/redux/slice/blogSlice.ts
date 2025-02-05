import { blogs } from "@/assets/data/blogs";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type BlogType = (typeof blogs)[0];

interface ProductState {
  blogs: BlogType[];
  filterBlogs: BlogType[];
  loading: boolean;
}

const initialState: ProductState = {
  blogs: [],
  filterBlogs: [],
  loading: false
};

export const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setBlogs: (state, action: PayloadAction<BlogType[]>) => {
      state.blogs = action.payload;
      state.filterBlogs = action.payload;
    },
    setFilterBlogs: (state, action: PayloadAction<BlogType[]>) => {
      state.filterBlogs = action.payload;
    }
  }
});

export const { setBlogs, setFilterBlogs, setLoading } = blogSlice.actions;

export default blogSlice.reducer;
