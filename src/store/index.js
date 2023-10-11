import {configureStore} from '@reduxjs/toolkit';
import articlesReducer from './articles-slice.js';
import userReducer from './user-slice.js';

export default configureStore({
  reducer:{
    articles: articlesReducer,
    user: userReducer,
  },
});
