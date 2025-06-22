import { useState, useRef, type DragEvent, type ChangeEvent } from 'react';
import { UploaderButton } from '../UploaderButton';
import styles from './Uploader.module.css';

interface Props {
  onUpload: (file: File) => void;
  isLoading: boolean;
}

const ERROR_TEXT = 'упс, не то...';

export const Uploader: React.FC<Props> = ({ onUpload, isLoading }) => {
  const [uploadStatus, setUploadStatus] = useState<App.UploadStatus>('idle');
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (file.type !== 'text/csv' || !file.name.toLowerCase().endsWith('.csv')) {
      setUploadStatus('error');

      return;
    }

    setUploadStatus('success');
    setUploadedFile(file);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      handleFile(file);
    }
  };

  const handleDrag = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];

    if (file) {
      handleFile(file);
    }
  };

  const handleSubmit = () => {
    if (uploadedFile) {
      onUpload(uploadedFile);
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setUploadStatus('idle');

    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  const getDropzoneClasses = () => {
    let classes = styles.dropzone;

    if (dragActive) {
      classes += ` ${styles.dragActive}`;
    }

    if (uploadStatus === 'error') {
      classes += ` ${styles.error}`;
    }

    if (uploadStatus === 'success') {
      classes += ` ${styles.success}`;
    }

    if (uploadStatus === 'idle') {
      classes += ` ${styles.idle}`;
    }

    return classes;
  };

  return (
    <div className={styles.container}>
      <div>
        Загрузите <span className={styles.bold}>csv</span> файл и получите
        <span className={styles.bold}>полную информацию</span> о нём за сверхнизкое время
      </div>

      <div className={styles.uploader__body}>
        <div
          className={`${styles['upload-container']} ${getDropzoneClasses()}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={inputRef}
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className={styles.hiddenInput}
            style={{ display: 'none' }}
            onClick={uploadStatus === 'idle' ? handleClick : undefined}
          />

          <UploaderButton
            state={isLoading ? 'loading' : uploadStatus}
            buttonText={uploadedFile ? uploadedFile.name : 'Загрузить файл'}
            onButtonClick={(e) => {
              e.stopPropagation();
              handleClick();
            }}
            onRemove={(e) => {
              e.stopPropagation();
              handleRemoveFile();
            }}
          />
        </div>
      </div>

      {uploadStatus === 'success' && (
        <div className={styles.submitSection}>
          <button onClick={handleSubmit} className={styles.submitButton} disabled={isLoading}>
            {isLoading ? 'Отправка...' : 'Отправить'}
          </button>
        </div>
      )}
    </div>
  );
};

/* <div className={styles.uploader}>
      <div>
        Загрузите <span className={styles.bold}>csv</span> файл и получите
        <span className={styles.bold}>полную информацию</span> о нём за сверхнизкое время
      </div>
      <div className={styles.uploader__body}>
        <UploaderDragAndDrop accept=".csv" onFileChange={handleFilesChange} />
      </div>
    </div> */
