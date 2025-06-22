declare namespace App {
  type UploadStatus = 'idle' | 'success' | 'error';

  type Civ = 'humans' | 'monsters' | 'blobs';

  type AnalyticsResult = {
    total_spend_galactic: number;
    rows_affected: number;
    less_spent_at: number;
    big_spent_at: number;
    less_spent_value: number;
    big_spent_value: number;
    average_spend_galactic: number;
    big_spent_civ: Civ;
    less_spent_civ: Civ;
  };

  type UploadHistory = {
    id: number;
    filename: string;
    results: App.AnalyticsResult | null;
  };
}
