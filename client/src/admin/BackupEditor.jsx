import { useState, useRef } from 'react';
import { Download, Upload, Database, RefreshCw, AlertTriangle, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../api/axios';
import { Card, Button } from './ui';

const BackupEditor = () => {
  const [downloading, setDownloading] = useState(false);
  const [restoring, setRestoring] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileContent, setFileContent] = useState(null);
  const fileInputRef = useRef(null);

  const handleDownloadBackup = async () => {
    setDownloading(true);
    try {
      const response = await api.get('/backup/export', { responseType: 'blob' });
      const blob = new Blob([response.data], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `portfolio-backup-${new Date().toISOString().split('T')[0]}.json`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      toast.success('Backup file downloaded successfully');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to generate backup file');
    } finally {
      setDownloading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.json')) {
      toast.error('Please select a valid JSON (.json) backup file');
      return;
    }

    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        setFileContent(parsed);
      } catch (err) {
        toast.error('Invalid JSON file format');
        setSelectedFile(null);
        setFileContent(null);
      }
    };
    reader.readAsText(file);
  };

  const handleRestoreBackup = async () => {
    if (!fileContent) {
      toast.error('Please select a valid backup JSON file first');
      return;
    }

    const confirmed = window.confirm(
      'Are you sure you want to restore the database from this backup? This will overwrite the current content.'
    );
    if (!confirmed) return;

    setRestoring(true);
    try {
      const { data } = await api.post('/backup/restore', fileContent);
      toast.success(data.message || 'Database restored successfully');
      setSelectedFile(null);
      setFileContent(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to restore database from backup');
    } finally {
      setRestoring(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>
          Database Backup & Restore
        </h1>
        <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
          Export a complete copy of your portfolio database or restore your website from a previously saved backup file.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Export / Download Backup">
          <div className="space-y-4">
            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>
              Download a complete JSON snapshot of all your portfolio content, including Hero, About, Skills, Experience, Education, Projects, Certificates, Social Links, and Settings.
            </p>

            <div className="p-4 rounded-2xl flex items-center gap-3 glass" style={{ borderColor: 'var(--color-border)' }}>
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent2))' }}
              >
                <Database size={18} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>All Collections</p>
                <p className="text-xs" style={{ color: 'var(--color-muted)' }}>JSON Format · Full Data</p>
              </div>
            </div>

            <Button onClick={handleDownloadBackup} disabled={downloading} className="w-full justify-center">
              {downloading ? <RefreshCw size={16} className="animate-spin" /> : <Download size={16} />}
              {downloading ? 'Exporting...' : 'Download Full Backup (.json)'}
            </Button>
          </div>
        </Card>

        <Card title="Import / Restore Backup">
          <div className="space-y-4">
            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>
              Select a previously exported <code className="px-1.5 py-0.5 rounded text-xs bg-white/10">.json</code> backup file to restore all content into your database.
            </p>

            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-colors hover:border-[var(--accent)]"
              style={{ borderColor: 'var(--color-border)' }}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleFileChange}
                className="hidden"
              />
              <div className="flex flex-col items-center gap-2">
                <Upload size={24} style={{ color: 'var(--accent)' }} />
                {selectedFile ? (
                  <div className="flex items-center gap-1.5 text-sm font-medium" style={{ color: 'var(--color-text)' }}>
                    <CheckCircle2 size={16} className="text-emerald-400" />
                    <span>{selectedFile.name}</span>
                  </div>
                ) : (
                  <>
                    <p className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>
                      Click to choose backup file
                    </p>
                    <p className="text-xs" style={{ color: 'var(--color-muted)' }}>
                      Supports portfolio JSON backups
                    </p>
                  </>
                )}
              </div>
            </div>

            {fileContent && (
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs">
                <AlertTriangle size={16} className="flex-shrink-0 mt-0.5 text-amber-400" />
                <span>Restoring will replace existing database records with the records inside this backup.</span>
              </div>
            )}

            <Button
              onClick={handleRestoreBackup}
              disabled={restoring || !fileContent}
              className="w-full justify-center disabled:opacity-50"
            >
              {restoring ? <RefreshCw size={16} className="animate-spin" /> : <Upload size={16} />}
              {restoring ? 'Restoring Database...' : 'Restore Database from File'}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default BackupEditor;
