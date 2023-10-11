import Header from './components/Header';
import Article from './components/Article';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getCurrentUser } from '../../store/user-slice.js';

import SignIn from './pages/sign-in.jsx';
import SignUp from './pages/sign-up.jsx';

const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);
  console.log(dispatch(getCurrentUser()));

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Article />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='*' element={<Article />} />
      </Routes>


    </>

  );
};
export default App;
