import { HighlightsList } from '../../components/HighlightsList';
import { Uploader } from '../../components/Uploader';

import { useState } from 'react';

import mainService from '../../lib/services';
import useAppStore from '../../lib/store/appStore';

export const AnalyticsPage = function AnalyticsPage() {
  const [analyticsResults, setAnalyticsResults] = useState<App.AnalyticsResult | null>(null);

  const addUploadHistory = useAppStore((state) => state.addUploadHistory);

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (file: File) => {
    try {
      setIsLoading(true);

      const response = await mainService.aggregate(file);
      const data = await response.text();
      const splittedData = data.split('\n');
      const lastRow = splittedData[splittedData.length - 2];
      const parsedLastRow = JSON.parse(lastRow);

      setAnalyticsResults(parsedLastRow);

      addUploadHistory({
        id: Date.now(),
        filename: file.name,
        results: parsedLastRow,
      });
    } catch (error) {
      console.error('Error processing file:', error);

      addUploadHistory({
        filename: file.name,
        id: Date.now(),
        results: null,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Uploader onUpload={handleSubmit} isLoading={isLoading} />
      {analyticsResults && <HighlightsList results={analyticsResults} />}
    </>
  );
};
