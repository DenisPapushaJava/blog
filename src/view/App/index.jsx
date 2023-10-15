import Header from './components/Header';

import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getCurrentUser } from '../../store/user-slice.js';
import { SignIn } from './pages/sign-in.jsx';
import { CreateNewArticle } from './pages/create-new-article.jsx';
import { EditProfile } from './pages/edit-profile.jsx';
import { Authentication } from './components/hoc/authentication.jsx';
import { ArticleList } from './pages/article-list.jsx';
import { SinglArticle } from './pages/singl-article.jsx';
import { EditArticle } from './pages/edit-article.jsx';
import { SignUp } from './pages/single-up.jsx';


const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);


  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<ArticleList />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/articles/:slug' element={<SinglArticle />} />
        <Route path='/articles/:slug/edit' element={
          <Authentication>
            <EditArticle />
          </Authentication>
        } />
        <Route path='/profile' element={
          <Authentication>
            <EditProfile />
          </Authentication>
        } />
        <Route path='/new-article' element={
          <Authentication>
            <CreateNewArticle />
          </Authentication>
        } />
        />
      </Routes>


    </>

  );
};
export default App;
