import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import SignInForm from '../components/user-foms/sign-in-form.jsx';
import { ErrorMessage } from '../components/errorMessage/index.jsx';
import { isSetNotUserCreate, loginUser } from '../../../store/user-slice.js';


const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const status = useSelector((state) => state.user.status);
  const isCreateUser = useSelector((state) => state.user.userCreate);
  const err = useSelector((state) => state.user.error);

  const fromPage = location.state?.from?.pathname || '/';
  console.log('status', err);
  useEffect(() => {
    if (status === 'resolved' && isCreateUser) {
      dispatch(isSetNotUserCreate());
      navigate(fromPage, { replace: true });
    }
  }, [status, isCreateUser, navigate, fromPage, dispatch]);

  return (
    <>
      {err && <ErrorMessage />}
      <SignInForm submit={(data) => dispatch(loginUser(data))} />
    </>
  );
};
export { SignIn };
