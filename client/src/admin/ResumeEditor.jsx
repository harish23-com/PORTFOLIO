import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import {
  Upload,
  FileText,
  CheckCircle2,
  Download,
  Trash2,
  Link as LinkIcon,
  RefreshCw,
  HardDrive,
  Clock,
  Eye,
  AlertCircle,
} from 'lucide-react';
import api from '../api/axios';
import { Card, Button, Input, LoadingCard } from './ui';
import { getResumeDownloadUrl, getResumeViewUrl, formatFileSize } from '../utils/resume';

const ResumeEditor = () => {
  const [hero, setHero] = useState(null);
  const [file, setFile] = useState(null);
  const [externalUrl, setExternalUrl] = useState('');
  const [urlLabel, setUrlLabel] = useState('');
  const [uploading, setUploading] = useState(false);
  const [savingUrl, setSavingUrl] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [downloadsCount, setDownloadsCount] = useState(0);

  const fetchResumeData = async () => {
    try {
      const [heroRes, settingsRes] = await Promise.all([
        api.get('/hero'),
        api.get('/settings').catch(() => ({ data: { data: {} } })),
      ]);
      setHero(heroRes.data.data);
      if (heroRes.data.data?.resumeFile?.startsWith('http')) {
        setExternalUrl(heroRes.data.data.resumeFile);
        setUrlLabel(heroRes.data.data.resumeOriginalName || '');
      }
      setDownloadsCount(settingsRes.data.data?.resumeDownloadsCount || 0);
    } catch {
      toast.error('Failed to load resume details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResumeData();
  }, []);

  const handleFileUpload = async (e) => {
    e?.preventDefault();
    if (!file) return toast.error('Please choose a PDF resume file');

    const isPdf = file.name.toLowerCase().endsWith('.pdf') || file.type.includes('pdf');
    if (!isPdf) return toast.error('Only PDF documents (.pdf) are allowed');

    if (file.size > 15 * 1024 * 1024) {
      return toast.error('File size exceeds 15MB limit. Please choose a smaller file.');
    }

    const formData = new FormData();
    formData.append('resume', file);
    setUploading(true);
    try {
      const { data } = await api.post('/resume', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setHero((prev) => ({
        ...prev,
        resumeFile: data.data.resumeFile,
        resumeOriginalName: data.data.resumeOriginalName,
        resumeFileSize: data.data.resumeFileSize,
        resumeUpdatedAt: data.data.resumeUpdatedAt,
      }));
      toast.success('Resume uploaded & updated successfully!');
      setFile(null);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to upload resume file');
    } finally {
      setUploading(false);
    }
  };

  const handleSaveExternalUrl = async (e) => {
    e?.preventDefault();
    if (!externalUrl.trim()) return toast.error('Please enter a valid URL');
    if (!/^https?:\/\//i.test(externalUrl.trim())) {
      return toast.error('URL must start with http:// or https://');
    }

    setSavingUrl(true);
    try {
      const { data } = await api.put('/resume/url', {
        url: externalUrl.trim(),
        originalName: urlLabel.trim() || 'External Resume Link',
      });
      setHero((prev) => ({
        ...prev,
        resumeFile: data.data.resumeFile,
        resumeOriginalName: data.data.resumeOriginalName,
        resumeFileSize: 0,
        resumeUpdatedAt: data.data.resumeUpdatedAt,
      }));
      toast.success('External Resume URL saved successfully!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save resume URL');
    } finally {
      setSavingUrl(false);
    }
  };

  const handleDeleteResume = async () => {
    if (!window.confirm('Are you sure you want to remove the current resume?')) return;
    setDeleting(true);
    try {
      await api.delete('/resume');
      setHero((prev) => ({
        ...prev,
        resumeFile: '',
        resumeOriginalName: '',
        resumeFileSize: 0,
        resumeUpdatedAt: null,
      }));
      setExternalUrl('');
      setUrlLabel('');
      toast.success('Resume removed successfully');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to remove resume');
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return <LoadingCard text="Loading Resume Details..." />;
  }

  const isExternal = hero?.resumeFile?.startsWith('http');
  const hasResume = Boolean(hero?.resumeFile);

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold" style={{ color: 'var(--color-text)' }}>
            Resume Management
          </h1>
          <p className="text-xs sm:text-sm mt-0.5" style={{ color: 'var(--color-muted)' }}>
            Manage, upload, or link your downloadable CV / Resume for portfolio visitors
          </p>
        </div>
        <button
          onClick={fetchResumeData}
          className="self-start sm:self-auto p-2 rounded-xl border glass text-xs font-medium inline-flex items-center gap-1.5 transition-colors"
          style={{ borderColor: 'var(--color-border)', color: 'var(--color-muted)' }}
          title="Refresh status"
        >
          <RefreshCw size={14} /> Refresh
        </button>
      </div>

      <Card title="Current Resume Status">
        {hasResume ? (
          <div className="space-y-5">
            <div
              className="p-4 sm:p-5 rounded-2xl glass border flex flex-col md:flex-row md:items-center justify-between gap-4"
              style={{ borderColor: 'var(--color-border)' }}
            >
              <div className="flex items-start sm:items-center gap-3.5 min-w-0">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md"
                  style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent2))' }}
                >
                  <FileText size={22} className="text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <p className="text-sm sm:text-base font-semibold truncate" style={{ color: 'var(--color-text)' }}>
                      {hero.resumeOriginalName || (isExternal ? 'External Resume Link' : 'Active Resume PDF')}
                    </p>
                    <span
                      className="px-2.5 py-0.5 rounded-full text-[11px] font-medium inline-flex items-center gap-1"
                      style={{
                        background: isExternal ? 'rgba(59, 130, 246, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                        color: isExternal ? '#60a5fa' : '#34d399',
                        border: `1px solid ${isExternal ? 'rgba(59, 130, 246, 0.3)' : 'rgba(16, 185, 129, 0.3)'}`,
                      }}
                    >
                      <CheckCircle2 size={11} /> {isExternal ? 'External URL' : 'Uploaded PDF File'}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 flex-wrap text-xs" style={{ color: 'var(--color-muted)' }}>
                    {hero.resumeFileSize > 0 && (
                      <span className="flex items-center gap-1">
                        <HardDrive size={12} /> {formatFileSize(hero.resumeFileSize)}
                      </span>
                    )}
                    {hero.resumeUpdatedAt && (
                      <span className="flex items-center gap-1">
                        <Clock size={12} /> Updated {new Date(hero.resumeUpdatedAt).toLocaleDateString()}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Download size={12} /> {downloadsCount} Downloads Recorded
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-wrap pt-2 md:pt-0 border-t md:border-t-0" style={{ borderColor: 'var(--color-border)' }}>
                <a
                  href={getResumeViewUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline px-3.5 py-2 text-xs inline-flex items-center gap-1.5"
                >
                  <Eye size={14} /> Preview
                </a>
                <a
                  href={getResumeDownloadUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="btn-primary px-3.5 py-2 text-xs inline-flex items-center gap-1.5"
                >
                  <Download size={14} /> Test Download
                </a>
                <Button
                  variant="danger"
                  onClick={handleDeleteResume}
                  disabled={deleting}
                  className="px-3 py-2 text-xs"
                >
                  <Trash2 size={14} /> {deleting ? 'Removing...' : 'Remove'}
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div
            className="p-8 text-center glass rounded-2xl border flex flex-col items-center justify-center gap-2"
            style={{ borderColor: 'var(--color-border)' }}
          >
            <AlertCircle size={28} style={{ color: 'var(--color-muted)' }} />
            <p className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>
              No Resume Uploaded
            </p>
            <p className="text-xs max-w-sm" style={{ color: 'var(--color-muted)' }}>
              Choose a PDF file below or provide an external link to make your resume downloadable by visitors.
            </p>
          </div>
        )}
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
        <Card title="Option 1: Upload PDF File">
          <form onSubmit={handleFileUpload} className="space-y-4">
            <label
              className="border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all hover:border-[var(--accent)] block group"
              style={{ borderColor: 'var(--color-border)', background: 'var(--input-bg)' }}
            >
              <input
                type="file"
                accept=".pdf,application/pdf"
                onChange={(e) => setFile(e.target.files[0])}
                className="hidden"
              />
              <div className="flex flex-col items-center gap-2.5">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105"
                  style={{ background: 'rgba(var(--accent-rgb), 0.1)', color: 'var(--accent)' }}
                >
                  <Upload size={24} />
                </div>
                {file ? (
                  <div className="space-y-1">
                    <div className="flex items-center justify-center gap-1.5 text-xs sm:text-sm font-semibold break-all" style={{ color: 'var(--color-text)' }}>
                      <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0" />
                      <span>{file.name}</span>
                    </div>
                    <p className="text-[11px]" style={{ color: 'var(--color-muted)' }}>
                      {formatFileSize(file.size)} &bull; Ready to save
                    </p>
                  </div>
                ) : (
                  <>
                    <p className="text-xs sm:text-sm font-semibold" style={{ color: 'var(--color-text)' }}>
                      Click or drag & drop PDF resume
                    </p>
                    <p className="text-[11px]" style={{ color: 'var(--color-muted)' }}>
                      PDF documents only &bull; Max 15MB
                    </p>
                  </>
                )}
              </div>
            </label>

            <Button type="submit" disabled={uploading || !file} className="w-full">
              <Upload size={16} /> {uploading ? 'Uploading & Saving...' : 'Upload & Save Resume PDF'}
            </Button>
          </form>
        </Card>

        <Card title="Option 2: External Resume Link">
          <form onSubmit={handleSaveExternalUrl} className="space-y-4">
            <Input
              label="Direct Link / Public Document URL"
              placeholder="https://drive.google.com/file/d/.../view or https://..."
              value={externalUrl}
              onChange={(e) => setExternalUrl(e.target.value)}
            />

            <Input
              label="Display Name / Label (Optional)"
              placeholder="e.g. Harish_Kumar_Resume_2026.pdf"
              value={urlLabel}
              onChange={(e) => setUrlLabel(e.target.value)}
            />

            <p className="text-[11px]" style={{ color: 'var(--color-muted)' }}>
              Useful if you prefer hosting your resume on Google Drive, Dropbox, Cloudinary, AWS S3, or OneDrive.
            </p>

            <Button type="submit" disabled={savingUrl || !externalUrl.trim()} className="w-full">
              <LinkIcon size={16} /> {savingUrl ? 'Saving Link...' : 'Save External Resume URL'}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default ResumeEditor;
