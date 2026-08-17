import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Upload, FileText } from 'lucide-react';
import api from '../api/axios';
import { Card, Button } from './ui';

const ResumeEditor = () => {
  const [hero, setHero] = useState(null);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    api.get('/hero').then((res) => setHero(res.data.data));
  }, []);

  const handleUpload = async () => {
    if (!file) return toast.error('Please choose a PDF file');
    const formData = new FormData();
    formData.append('resume', file);
    setUploading(true);
    try {
      const { data } = await api.post('/resume', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      setHero({ ...hero, resumeFile: data.data.resumeFile });
      toast.success('Resume uploaded successfully');
      setFile(null);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Resume</h1>
      <Card title="Current Resume">
        {hero?.resumeFile ? (
          <a href={hero.resumeFile} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-sm text-accent hover:underline">
            <FileText size={18} /> View current resume PDF
          </a>
        ) : (
          <p className="text-muted text-sm">No resume uploaded yet.</p>
        )}
      </Card>

      <Card title="Replace Resume">
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files[0])}
          className="text-sm text-muted mb-4 block"
        />
        <Button onClick={handleUpload} disabled={uploading}>
          <Upload size={16} /> {uploading ? 'Uploading...' : 'Upload New Resume'}
        </Button>
      </Card>
    </div>
  );
};

export default ResumeEditor;
