import UploaderDragAndDrop from '../UploaderDragAndDrop/UploaderDragAndDrop';
import styles from './Uploader.module.css';

export const Uploader: React.FC = function Uploader() {
  const handleFilesChange = (files: File[]) => {
    console.log('Выбранные файлы:', files);
  };

  return (
    <div className={styles.uploader}>
      <div>
        Загрузите <span className={styles.bold}>csv</span> файл и получите
        <span className={styles.bold}>полную информацию</span> о нём за сверхнизкое время
      </div>
      <div className={styles.uploader__body}>
        <UploaderDragAndDrop
          accept=".csv"
          multiple={true}
          maxFiles={1}
          onFilesChange={handleFilesChange}
        />
      </div>
    </div>
  );
};
