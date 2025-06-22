import styles from './MenuItem.module.css';
import { NavLink } from 'react-router-dom';

interface MenuItemProps {
  text: string;
  icon: string;
  to: string;
}

export const MenuItem: React.FC<MenuItemProps> = function MenuItem({ text, icon, to }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive ? `${styles['menu-item']} ${styles.active}` : styles['menu-item']
      }
    >
      <img src={icon} className={styles.icon} alt={text} />
      {text}
    </NavLink>
  );
};
