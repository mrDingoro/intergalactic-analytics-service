import { useState } from 'react';
import styles from './HistoryPage.module.css';
import { useNavigate } from 'react-router-dom';
import trash from '/basket.svg';
import sad from '/emoji-sad.svg';
import smile from '/emoji-smile.svg';
import file from '/icon-file.svg';
import useAppStore from '../../lib/store/appStore';
import ModalWrapper from '../../components/Modals';
import { Button } from '../../components/Button';

export const HistoryPage = function HistoryPage() {
  const uploadsHistory = useAppStore((state) => state.uploadsHistory);
  const deleteUploadHistory = useAppStore((state) => state.deleteUploadHistory);
  const clearUploadHistory = useAppStore((state) => state.clearUploadHistory);
  const navigate = useNavigate();
  const [selectedHistory, setSelectedHistory] = useState<App.UploadHistory | null>(null);

  const handleOpenModal = (history: App.UploadHistory) => {
    setSelectedHistory(history);
  };

  const handleCloseModal = () => {
    setSelectedHistory(null);
  };

  return (
    <>
      <div className={styles.container}>
        <ul className={styles.history}>
          {uploadsHistory.map((upload) => (
            <li className={styles.rowOutline} key={upload.id}>
              <div
                className={styles.row + (!upload.results ? styles.rowDisabled : '')}
                onClick={() => handleOpenModal(upload)}
              >
                <div className={styles.nameColumn}>
                  <img src={file} alt="" />
                  <p className={styles.name}>{upload.filename}</p>
                </div>

                <p>
                  {new Date(upload.id).toLocaleString('ru-RU', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  })}
                </p>

                <p className={styles.status + (upload.results ? '' : ' ' + styles.faint)}>
                  Обработан успешно <img src={smile} alt="" />
                </p>
                <p className={styles.status + (upload.results ? ' ' + styles.faint : '')}>
                  Не удалось обработать <img src={sad} alt="" />
                </p>
              </div>

              <button
                className={styles.trashWrapper}
                onClick={() => deleteUploadHistory(upload.id)}
              >
                <img src={trash} alt="" />
              </button>
            </li>
          ))}
        </ul>

        {uploadsHistory.length === 0 && <p className={styles.empty}>История операций пуста</p>}

        <div className={styles.buttons}>
          <Button onClick={() => navigate('/generate')}>Сгенерировать больше</Button>
          <Button onClick={() => clearUploadHistory()} clear>
            Очистить всё
          </Button>
        </div>
      </div>

      <ModalWrapper
        isOpen={selectedHistory !== null}
        onClose={handleCloseModal}
        title="Example Modal"
        size="medium"
      >
        <div>
          <div>{selectedHistory?.results?.big_spent_value}</div>
        </div>
      </ModalWrapper>
    </>
  );
};
