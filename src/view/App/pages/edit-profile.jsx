import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import EditProfileForm from '../components/user-foms/edit-profile-form.jsx';
import { ErrorMessage } from '../components/errorMessage/index.jsx';
import { isSetNotUserCreate, updateUserProfile } from '../../../store/user-slice.js';

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const status = useSelector((state) => state.user.status);
  const isUserCreate = useSelector((state) => state.user.userCreate);
  const err = useSelector((state) => state.user.error);


  useEffect(() => {
    if (status === 'resolved' && isUserCreate) {
      dispatch(isSetNotUserCreate());
      navigate('/', { replace: true });
    }
  }, [isUserCreate, status, navigate, dispatch]);

  return (
    <>
      {err && <ErrorMessage />}
      <EditProfileForm submit={(data) => dispatch(updateUserProfile(data))} user={user} />
    </>
  );
};
export { EditProfile };
