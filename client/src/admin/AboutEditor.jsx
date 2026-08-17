import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Save } from 'lucide-react';
import api from '../api/axios';
import { Card, Input, TextArea, Button, LoadingCard } from './ui';

const AboutEditor = () => {
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.get('/about').then((res) => setForm(res.data.data));
  }, []);

  if (!form) {
    return <LoadingCard text="Loading About Section..." />;
  }

  const handleSave = async (e) => {
    e?.preventDefault();
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
      <div className="mb-5 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-bold" style={{ color: 'var(--color-text)' }}>About Section</h1>
        <p className="text-xs sm:text-sm mt-0.5" style={{ color: 'var(--color-muted)' }}>Manage your personal biography and contact information</p>
      </div>

      <Card title="Biography">
        <TextArea
          rows={5}
          value={form.bio}
          onChange={(e) => setForm({ ...form, bio: e.target.value })}
          placeholder="Write your professional bio and journey..."
        />
      </Card>

      <Card title="Personal Information">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <Input
            label="Nationality"
            value={form.personalInfo?.nationality || ''}
            onChange={(e) => setForm({ ...form, personalInfo: { ...form.personalInfo, nationality: e.target.value } })}
          />
          <Input
            label="Location"
            value={form.personalInfo?.location || ''}
            onChange={(e) => setForm({ ...form, personalInfo: { ...form.personalInfo, location: e.target.value } })}
          />
          <Input
            label="Email"
            value={form.personalInfo?.email || ''}
            onChange={(e) => setForm({ ...form, personalInfo: { ...form.personalInfo, email: e.target.value } })}
          />
          <Input
            label="Phone"
            value={form.personalInfo?.phone || ''}
            onChange={(e) => setForm({ ...form, personalInfo: { ...form.personalInfo, phone: e.target.value } })}
          />
        </div>
      </Card>

      <div className="mt-6">
        <Button onClick={handleSave} disabled={saving} className="w-full sm:w-auto">
          <Save size={16} /> {saving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </div>
  );
};

export default AboutEditor;
