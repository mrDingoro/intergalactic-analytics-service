import { type MouseEventHandler } from 'react';
import styles from './UploaderButton.module.css';
import clearIcon from '/clear.svg';

type stateType = App.UploadStatus | 'loading' | 'genereting';
interface UploaderButtonProps {
  state: stateType;
  buttonText: string;
  fileName?: string;
  onButtonClick: MouseEventHandler<HTMLButtonElement>;
  onRemove?: MouseEventHandler<HTMLButtonElement>;
}

const infoTextMap: Record<stateType, string> = {
  idle: 'или перетащите сюда',
  loading: 'идёт парсинг файла',
  success: 'файл загружен!',
  error: 'упс, не то...',
  genereting: 'идёт генерация',
};

export const UploaderButton: React.FC<UploaderButtonProps> = ({
  state,
  buttonText,
  onButtonClick,
  onRemove,
}) => {
  return (
    <div className={`${styles.container} ${styles[state]}`}>
      {state}
      <div className={styles.content}>
        <button type="button" className={styles['upload-button']} onClick={onButtonClick}>
          {buttonText}
        </button>

        {state !== 'idle' && state !== 'loading' && (
          <button className={styles['remove-button']} onClick={onRemove}>
            <img src={clearIcon} alt="clear" />
          </button>
        )}
      </div>

      <div className={styles.infoText}>
        {state === 'loading' && <div className={styles.loadingBar}></div>}
        {infoTextMap[state]}
      </div>
    </div>
  );
};
