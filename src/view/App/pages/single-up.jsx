import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { isSetNotUserCreate, loginUser, singUpUser } from '../../../store/user-slice.js';
import { ErrorMessage } from '../components/errorMessage/index.jsx';
import SignUpForm from '../components/user-foms/sign-up-form.jsx';


const SignUp = () => {
  const [dataLocal, setDataLocal] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const status = useSelector((state) => state.user.status);
  const err = useSelector((state) => state.user.error);
  const isCreateUser = useSelector((state) => state.user.userCreate);

  useEffect(() => {
    if (status === 'resolved' && isCreateUser) {
      dispatch(isSetNotUserCreate());
      navigate('/', { replace: true });
      dispatch(loginUser(dataLocal));
    }
  }, [isCreateUser, status, navigate, dispatch]);


  const singUpLogin = (data) => {
    setDataLocal(data);
    dispatch(singUpUser(data));
  };

  return (
    <>
      {err && <ErrorMessage />}
      <SignUpForm submit={(data) => singUpLogin(data)} />
    </>
  );
};
export { SignUp };
