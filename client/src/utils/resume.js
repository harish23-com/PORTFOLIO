export const getApiBaseUrl = () => {
  return import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '/api' : 'http://localhost:5000/api');
};

export const getResumeDownloadUrl = () => {
  const base = getApiBaseUrl();
  return `${base}/resume/download`;
};

export const getResumeViewUrl = () => {
  const base = getApiBaseUrl();
  return `${base}/resume/download?view=true`;
};

export const formatFileSize = (bytes) => {
  if (!bytes || isNaN(bytes) || bytes <= 0) return '';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
};
