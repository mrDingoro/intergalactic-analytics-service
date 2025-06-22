import styles from './HighlightsList.module.css';

export const HighlightsList = function HighlightsList(results: string) {
  return (
    <div className={styles.container}>
      <div className={styles.info}>Здесь появятся хайлайты</div>
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Результаты анализа</h3>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-auto">
          {JSON.stringify(results, null, 2)}
        </pre>
      </div>
    </div>
  );
};
