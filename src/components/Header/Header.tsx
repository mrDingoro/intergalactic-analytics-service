import { Link } from 'react-router-dom';
import { Menu } from '../Menu/Menu';
import styles from './Header.module.css';
import summerSchools from '/summer-schools.svg';

export const Header: React.FC = function Header() {
  return (
    <header className={styles.header}>
      <Link to="/">
        <img src={summerSchools} className="logo" alt="Летние школы" />
      </Link>
      <div className={styles.title}>
        <span>Mежгалактическая аналитика</span>
      </div>
      <Menu />
    </header>
  );
};
