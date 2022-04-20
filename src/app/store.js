import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../features/posts/postsSlice';
import { loadState, saveState } from '../components/localstorage';
import { debounce } from '../components/debounce';

const preloadedState = loadState();
export const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
  preloadedState
});


store.subscribe(debounce(() => {
  saveState({
    posts: store.getState().posts, 
  });
 }, 100));