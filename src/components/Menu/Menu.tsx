import styles from './Menu.module.css';
import uploader from '/uploader.svg';
import generator from '/generator.svg';
import history from '/history.svg';
import { MenuItem } from '../MenuItem/MenuItem';

export const Menu: React.FC = function Menu() {
  return (
    <div className={styles.menu}>
      <MenuItem to="/" text="CSV Аналитик" icon={uploader} />
      <MenuItem to="/generate" text="CSV Генератор" icon={generator} />
      <MenuItem to="/history" text="История" icon={history} />
    </div>
  );
};
