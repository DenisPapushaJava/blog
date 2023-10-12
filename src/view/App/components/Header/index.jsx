import styles from './index.module.scss';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import baseAvatar from '../../../../assets/avatarDefolt.png';

const Header = () => {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.user.isLogin);
  const userName = useSelector((state) => state.user.username);
  const avatarUrl = useSelector((state) => state.user.image);
  const path = avatarUrl ? avatarUrl : baseAvatar;
  const statusUser = useSelector((state) => state.user.status);
  const statusArticle = useSelector((state) => state.articles.status);

  return (<div className={styles.headerWrapper}>
    <Link to={statusUser === 'loading' || statusArticle === 'loading' ? '#' : '/'}>Realworld Blog</Link>
    <nav className={styles.headerWrapperButton}>
      <Link to='/sign-in' className={styles.headerWrapperButtonActive}>Sign In</Link>
      <Link to='/sign-up' className={styles.headerWrapperButtonActive}>Sign Up</Link>
    </nav>
  </div>);
};
export default Header;
