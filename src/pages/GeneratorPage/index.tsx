import { useState } from 'react';
import styles from './GeneratorPage.module.css';
import mainService from '../../lib/services';
import { Button } from '../../components/Button';
import { Loader } from '../../components/Loader';

type GeneratorStatus = 'idle' | 'loading' | 'success' | 'error';

export const GeneratorPage = function GeneratorPage() {
  const [status, setStatus] = useState<GeneratorStatus>('idle');
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');

  const handleGenerate = async () => {
    setStatus('loading');
    setDownloadUrl(null);
    setFileName('');

    try {
      const response = await mainService.report(0.01, true, 1000);

      if (!response.ok) {
        throw new Error('Generation failed');
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      let fileName = 'file-uploaded.csv';
      const contentDisposition = response.headers.get('Content-Disposition');

      if (contentDisposition) {
        const fileNameMatch = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);

        if (fileNameMatch && fileNameMatch[1]) {
          fileName = fileNameMatch[1].replace(/['"]/g, '');
        }
      }

      setDownloadUrl(url);
      setFileName(fileName);
      setStatus('success');

      triggerDownload(url, fileName);
    } catch (error) {
      console.error('Generation failed:', error);
      setStatus('error');
    }
  };

  const triggerDownload = (url: string, fileName: string) => {
    const link = document.createElement('a');

    link.href = url;
    link.download = fileName;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleReset = () => {
    setStatus('idle');
    setDownloadUrl(null);
    setFileName('');

    if (downloadUrl) {
      URL.revokeObjectURL(downloadUrl);
    }
  };

  return (
    <div className={styles.container}>
      <p>Сгенерируйте готовый csv-файл нажатием одной кнопки</p>
      {status === 'idle' && <Button onClick={handleGenerate}>Начать генерацию</Button>}
      {status === 'loading' && (
        <>
          <Button purple className={styles.loaderButton}>
            <Loader />
          </Button>
          <span>идёт процесс генерации</span>
        </>
      )}
      {status === 'success' && (
        <>
          <div className={styles.clearableButtonContainer}>
            <Button completed>Done!</Button>
            <Button clear showIcon onClick={handleReset} />
          </div>
          <span>файл сгенерирован!</span>
        </>
      )}
      {status === 'error' && (
        <>
          <div className={styles.clearableButtonContainer}>
            <Button error>Ошибка</Button>
            <Button clear showIcon onClick={handleReset} />
          </div>
          <span className={styles.errorText}>упс, не то...</span>
        </>
      )}
    </div>
  );
};
