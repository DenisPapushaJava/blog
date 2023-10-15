import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';


const Authentication = ({ children }) => {
  const location = useLocation();
  const isLogin = useSelector((state) => state.user.isLogin);

  if (!isLogin) {
    return <Navigate to={'/sign-in'} state={{ from: location }} />;

  }
  return children;
};
export { Authentication };
