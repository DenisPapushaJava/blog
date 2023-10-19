import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {PATH} from "../../../../constans/index.js";


const Authentication = ({ children }) => {
  const location = useLocation();
  const isLogin = useSelector((state) => state.user.isLogin);

  if (!isLogin) {
    return <Navigate to={PATH.singIn} state={{ from: location }} />;

  }
  return children;
};
export { Authentication };
