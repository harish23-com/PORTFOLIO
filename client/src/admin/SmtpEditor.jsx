import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Save, ShieldCheck } from 'lucide-react';
import api from '../api/axios';
import { Card, Input, Button, LoadingCard } from './ui';

const SmtpEditor = () => {
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/smtp')
      .then((res) => setForm(res.data.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <LoadingCard text="Loading SMTP Configuration..." />;
  }

  const handleSave = async (e) => {
    e?.preventDefault();
    setSaving(true);
    try {
      const { data } = await api.put('/smtp', form);
      setForm(data.data);
      toast.success('SMTP configuration updated successfully');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update SMTP configuration');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="mb-5 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-bold" style={{ color: 'var(--color-text)' }}>SMTP Configuration</h1>
        <p className="text-xs sm:text-sm mt-0.5" style={{ color: 'var(--color-muted)' }}>Configure email delivery credentials for automated message notifications and replies</p>
      </div>

      <Card>
        <div className="flex items-center gap-2 p-3 rounded-xl glass border mb-5 text-xs" style={{ borderColor: 'var(--color-border)', color: 'var(--color-muted)' }}>
          <ShieldCheck size={16} className="text-emerald-400 flex-shrink-0" />
          <span>All SMTP passwords are encrypted using AES-256 before being stored in the database.</span>
        </div>

        <form onSubmit={handleSave}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <Input label="SMTP Host" value={form?.host || ''} onChange={(e) => setForm({ ...form, host: e.target.value })} placeholder="e.g. smtp.gmail.com" />
            <Input label="SMTP Port" type="number" value={form?.port || 587} onChange={(e) => setForm({ ...form, port: Number(e.target.value) })} placeholder="e.g. 587 or 465" />
            <Input label="Username" value={form?.username || ''} onChange={(e) => setForm({ ...form, username: e.target.value })} placeholder="e.g. your_email@gmail.com" />
            <Input label="Password" type="password" placeholder="••••••••••••" value={form?.password || ''} onChange={(e) => setForm({ ...form, password: e.target.value })} />
            <Input label="Sender Name" value={form?.senderName || ''} onChange={(e) => setForm({ ...form, senderName: e.target.value })} placeholder="e.g. Harish Kumar" />
            <Input label="Sender Email" value={form?.senderEmail || ''} onChange={(e) => setForm({ ...form, senderEmail: e.target.value })} placeholder="e.g. your_email@gmail.com" />
            <div className="sm:col-span-2">
              <Input label="Notification Email (where new visitor contact alerts are delivered)" value={form?.notifyEmail || ''} onChange={(e) => setForm({ ...form, notifyEmail: e.target.value })} placeholder="e.g. ramanadhapuramharishkumar@gmail.com" />
            </div>
          </div>

          <div className="mt-6">
            <Button type="submit" onClick={handleSave} disabled={saving} className="w-full sm:w-auto">
              <Save size={16} /> {saving ? 'Saving...' : 'Save SMTP Settings'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default SmtpEditor;
