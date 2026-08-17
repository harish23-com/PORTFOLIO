import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Upload, FileText, CheckCircle2 } from 'lucide-react';
import api from '../api/axios';
import { Card, Button, LoadingCard } from './ui';

const ResumeEditor = () => {
  const [hero, setHero] = useState(null);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/hero')
      .then((res) => setHero(res.data.data))
      .finally(() => setLoading(false));
  }, []);

  const handleUpload = async () => {
    if (!file) return toast.error('Please choose a PDF resume file');
    const formData = new FormData();
    formData.append('resume', file);
    setUploading(true);
    try {
      const { data } = await api.post('/resume', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      setHero({ ...hero, resumeFile: data.data.resumeFile });
      toast.success('Resume uploaded successfully');
      setFile(null);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to upload resume file');
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return <LoadingCard text="Loading Resume Details..." />;
  }

  return (
    <div>
      <div className="mb-5 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-bold" style={{ color: 'var(--color-text)' }}>Resume Management</h1>
        <p className="text-xs sm:text-sm mt-0.5" style={{ color: 'var(--color-muted)' }}>Upload and replace your downloadable CV / Resume PDF</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
        <Card title="Current Resume">
          {hero?.resumeFile ? (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl glass flex items-center gap-3 border" style={{ borderColor: 'var(--color-border)' }}>
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent2))' }}
                >
                  <FileText size={18} className="text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold truncate" style={{ color: 'var(--color-text)' }}>Resume PDF Active</p>
                  <p className="text-xs truncate" style={{ color: 'var(--color-muted)' }}>Available for visitors to download</p>
                </div>
              </div>

              <a
                href={hero.resumeFile}
                target="_blank"
                rel="noreferrer"
                className="btn-outline w-full justify-center text-xs sm:text-sm"
              >
                <FileText size={16} /> View Current Resume PDF
              </a>
            </div>
          ) : (
            <div className="p-6 text-center glass rounded-2xl border" style={{ borderColor: 'var(--color-border)' }}>
              <p className="text-sm" style={{ color: 'var(--color-muted)' }}>No resume uploaded yet.</p>
            </div>
          )}
        </Card>

        <Card title="Upload New Resume">
          <div className="space-y-4">
            <label
              className="border-2 border-dashed rounded-2xl p-5 sm:p-6 text-center cursor-pointer transition-colors hover:border-[var(--accent)] block"
              style={{ borderColor: 'var(--color-border)' }}
            >
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => setFile(e.target.files[0])}
                className="hidden"
              />
              <div className="flex flex-col items-center gap-2">
                <Upload size={22} style={{ color: 'var(--accent)' }} />
                {file ? (
                  <div className="flex items-center gap-1.5 text-xs sm:text-sm font-medium break-all" style={{ color: 'var(--color-text)' }}>
                    <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0" />
                    <span>{file.name}</span>
                  </div>
                ) : (
                  <>
                    <p className="text-xs sm:text-sm font-medium" style={{ color: 'var(--color-text)' }}>
                      Click to choose PDF file
                    </p>
                    <p className="text-[11px]" style={{ color: 'var(--color-muted)' }}>
                      PDF files only (Max 10MB)
                    </p>
                  </>
                )}
              </div>
            </label>

            <Button onClick={handleUpload} disabled={uploading || !file} className="w-full">
              <Upload size={16} /> {uploading ? 'Uploading...' : 'Upload & Save Resume'}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ResumeEditor;
