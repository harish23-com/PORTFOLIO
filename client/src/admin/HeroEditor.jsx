import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Save, Plus, Trash2 } from 'lucide-react';
import api from '../api/axios';
import { Card, Input, TextArea, Button } from './ui';

const HeroEditor = () => {
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.get('/hero').then((res) => setForm(res.data.data));
  }, []);

  if (!form) return <p className="text-muted">Loading...</p>;

  const handleSave = async () => {
    setSaving(true);
    try {
      const { data } = await api.put('/hero', form);
      setForm(data.data);
      toast.success('Hero section updated');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update');
    } finally {
      setSaving(false);
    }
  };

  const updateRole = (i, value) => {
    const roles = [...form.roles];
    roles[i] = value;
    setForm({ ...form, roles });
  };

  const updateStat = (i, field, value) => {
    const stats = [...form.stats];
    stats[i] = { ...stats[i], [field]: value };
    setForm({ ...form, stats });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Hero Section</h1>
      <Card>
        <Input label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <TextArea label="Summary" rows={4} value={form.summary} onChange={(e) => setForm({ ...form, summary: e.target.value })} />

        <label className="block text-xs text-muted mb-1.5">Rotating Roles</label>
        {(form.roles || []).map((role, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <input
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-accent/60"
              value={role}
              onChange={(e) => updateRole(i, e.target.value)}
            />
            <Button variant="danger" onClick={() => setForm({ ...form, roles: form.roles.filter((_, idx) => idx !== i) })}>
              <Trash2 size={14} />
            </Button>
          </div>
        ))}
        <Button variant="secondary" onClick={() => setForm({ ...form, roles: [...(form.roles || []), ''] })}>
          <Plus size={14} /> Add Role
        </Button>

        <label className="block text-xs text-muted mb-1.5 mt-6">Statistics</label>
        {(form.stats || []).map((stat, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <input
              placeholder="Value (e.g. 5+)"
              className="w-32 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-accent/60"
              value={stat.value}
              onChange={(e) => updateStat(i, 'value', e.target.value)}
            />
            <input
              placeholder="Label"
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-accent/60"
              value={stat.label}
              onChange={(e) => updateStat(i, 'label', e.target.value)}
            />
            <Button variant="danger" onClick={() => setForm({ ...form, stats: form.stats.filter((_, idx) => idx !== i) })}>
              <Trash2 size={14} />
            </Button>
          </div>
        ))}
        <Button variant="secondary" onClick={() => setForm({ ...form, stats: [...(form.stats || []), { label: '', value: '' }] })}>
          <Plus size={14} /> Add Stat
        </Button>

        <div className="mt-6">
          <Button onClick={handleSave} disabled={saving}>
            <Save size={16} /> {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default HeroEditor;
