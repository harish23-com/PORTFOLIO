import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Save } from 'lucide-react';
import api from '../api/axios';
import { Card, Input, TextArea, Button } from './ui';

const AboutEditor = () => {
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.get('/about').then((res) => setForm(res.data.data));
  }, []);

  if (!form) return <p className="text-muted">Loading...</p>;

  const handleSave = async () => {
    setSaving(true);
    try {
      const { data } = await api.put('/about', form);
      setForm(data.data);
      toast.success('About section updated');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">About</h1>
      <Card title="Bio">
        <TextArea rows={5} value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} />
      </Card>

      <Card title="Personal Information">
        <div className="grid sm:grid-cols-2 gap-4">
          <Input label="Nationality" value={form.personalInfo?.nationality || ''} onChange={(e) => setForm({ ...form, personalInfo: { ...form.personalInfo, nationality: e.target.value } })} />
          <Input label="Location" value={form.personalInfo?.location || ''} onChange={(e) => setForm({ ...form, personalInfo: { ...form.personalInfo, location: e.target.value } })} />
          <Input label="Email" value={form.personalInfo?.email || ''} onChange={(e) => setForm({ ...form, personalInfo: { ...form.personalInfo, email: e.target.value } })} />
          <Input label="Phone" value={form.personalInfo?.phone || ''} onChange={(e) => setForm({ ...form, personalInfo: { ...form.personalInfo, phone: e.target.value } })} />
        </div>
      </Card>

      <div className="mt-2">
        <Button onClick={handleSave} disabled={saving}>
          <Save size={16} /> {saving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
      <p className="text-xs text-muted mt-4">
        Timeline, languages, interests and achievements can be edited by updating the raw fields via the API — a full repeater UI for these follows the same Hero-editor pattern above and can be extended the same way.
      </p>
    </div>
  );
};

export default AboutEditor;
