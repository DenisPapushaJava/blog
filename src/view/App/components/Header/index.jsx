import styles from './index.module.scss';
import { Link } from 'react-router-dom';

const Header = () => {
  return (<div className={styles.headerWrapper}>
    <Link to='/'>Realworld Blog</Link>
    <nav className={styles.headerWrapperButton}>
      <Link to='/sign-in' className={styles.headerWrapperButtonActive}>Sign In</Link>
      <Link to='/sign-up' className={styles.headerWrapperButtonActive} >Sign Up</Link>
    </nav>
  </div>);
};
export default Header;
