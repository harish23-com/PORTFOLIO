import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Save } from 'lucide-react';
import api from '../api/axios';
import { Card, Input, Button } from './ui';

const SmtpEditor = () => {
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.get('/smtp').then((res) => setForm(res.data.data));
  }, []);

  if (!form) return <p className="text-muted">Loading...</p>;

  const handleSave = async () => {
    setSaving(true);
    try {
      const { data } = await api.put('/smtp', form);
      setForm(data.data);
      toast.success('SMTP configuration updated');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">SMTP Configuration</h1>
      <Card>
        <p className="text-xs text-muted mb-5">
          Credentials are encrypted before being stored. This powers contact form notification emails and thank-you replies.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Input label="SMTP Host" value={form.host} onChange={(e) => setForm({ ...form, host: e.target.value })} />
          <Input label="SMTP Port" type="number" value={form.port} onChange={(e) => setForm({ ...form, port: Number(e.target.value) })} />
          <Input label="Username" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
          <Input label="Password" type="password" placeholder="********" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          <Input label="Sender Name" value={form.senderName} onChange={(e) => setForm({ ...form, senderName: e.target.value })} />
          <Input label="Sender Email" value={form.senderEmail} onChange={(e) => setForm({ ...form, senderEmail: e.target.value })} />
          <Input label="Notify Email (where contact alerts go)" value={form.notifyEmail} onChange={(e) => setForm({ ...form, notifyEmail: e.target.value })} />
        </div>
        <Button onClick={handleSave} disabled={saving}>
          <Save size={16} /> {saving ? 'Saving...' : 'Save SMTP Settings'}
        </Button>
      </Card>
    </div>
  );
};

export default SmtpEditor;
