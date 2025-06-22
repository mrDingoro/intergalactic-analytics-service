import { useState, useRef, type DragEvent, type ChangeEvent } from 'react';
import styles from './UploaderDragAndDrop.module.css';

interface FileUploadProps {
  accept?: string;
  onFileChange?: (file: File | null) => void;
}

export const UploaderDragAndDrop: React.FC<FileUploadProps> = ({ accept = '', onFileChange }) => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const validateFile = (newFile: File) => {
    if (accept) {
      const mimeTypes = accept.split(',').map((t) => t.trim());

      const isValid = mimeTypes.some((type) => {
        if (type.endsWith('/*')) {
          return newFile.type.startsWith(type.replace('/*', ''));
        }

        return newFile.type === type;
      });

      if (!isValid) {
        alert(`Файл ${newFile.name} имеет неподдерживаемый тип.`);

        return null;
      }
    }

    return newFile;
  };

  const addFile = (newFile: File) => {
    const validatedFile = validateFile(newFile);

    if (validatedFile) {
      setFile(validatedFile);
      onFileChange?.(validatedFile);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      addFile(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (!isDragging) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      addFile(e.target.files[0]);
      e.target.value = ''; // сброс input для повторного выбора того же файла
    }
  };

  const removeFile = () => {
    setFile(null);
    onFileChange?.(null);
  };

  return (
    <div
      className={`${styles['upload-container']} ${isDragging ? styles.dragging : ''}`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        style={{ display: 'none' }}
        onChange={handleFileSelect}
      />

      {!file && (
        <div>
          <button
            type="button"
            className={styles['upload-button']}
            onClick={() => inputRef.current?.click()}
          >
            Выберите файл
          </button>
          <div>или перетащите сюда</div>
        </div>
      )}

      {file && (
        <div className={styles['file-info']}>
          <span className={styles['file-name']} title={file.name}>
            {file.name}
          </span>
          <button
            type="button"
            className={styles['remove-button"']}
            onClick={(e) => {
              e.stopPropagation();
              removeFile();
            }}
            aria-label="Удалить файл"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
};
