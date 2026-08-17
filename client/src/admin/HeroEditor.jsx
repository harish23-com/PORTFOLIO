import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Save, Plus, Trash2 } from 'lucide-react';
import api from '../api/axios';
import { Card, Input, TextArea, Button, LoadingCard } from './ui';

const HeroEditor = () => {
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.get('/hero').then((res) => setForm(res.data.data));
  }, []);

  if (!form) {
    return <LoadingCard text="Loading Hero Section..." />;
  }

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
      <div className="mb-5 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-bold" style={{ color: 'var(--color-text)' }}>Hero Section</h1>
        <p className="text-xs sm:text-sm mt-0.5" style={{ color: 'var(--color-muted)' }}>Customize your primary introduction, rotating roles, and stats</p>
      </div>

      <Card title="Main Information">
        <Input label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <TextArea label="Summary" rows={4} value={form.summary} onChange={(e) => setForm({ ...form, summary: e.target.value })} />
      </Card>

      <Card title="Rotating Headline Roles">
        <div className="space-y-2 mb-3">
          {(form.roles || []).map((role, i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                className="flex-1 rounded-xl px-3.5 sm:px-4 py-2 sm:py-2.5 text-sm outline-none transition-colors"
                style={{
                  background: 'var(--input-bg)',
                  border: '1px solid var(--input-border)',
                  color: 'var(--color-text)',
                }}
                value={role}
                onChange={(e) => updateRole(i, e.target.value)}
                placeholder="e.g. Full Stack Developer"
              />
              <Button
                variant="danger"
                onClick={() => setForm({ ...form, roles: form.roles.filter((_, idx) => idx !== i) })}
                className="px-3 py-2 sm:px-3.5 sm:py-2.5 flex-shrink-0"
                aria-label="Remove role"
              >
                <Trash2 size={14} />
              </Button>
            </div>
          ))}
        </div>
        <Button variant="secondary" onClick={() => setForm({ ...form, roles: [...(form.roles || []), ''] })} className="w-full sm:w-auto">
          <Plus size={14} /> Add Role
        </Button>
      </Card>

      <Card title="Key Statistics">
        <div className="space-y-2 mb-3">
          {(form.stats || []).map((stat, i) => (
            <div key={i} className="flex flex-col sm:flex-row gap-2 p-3 sm:p-0 rounded-xl bg-white/[0.02] sm:bg-transparent border border-white/5 sm:border-0">
              <input
                placeholder="Value (e.g. 5+)"
                className="w-full sm:w-36 rounded-xl px-3.5 sm:px-4 py-2 sm:py-2.5 text-sm outline-none transition-colors"
                style={{
                  background: 'var(--input-bg)',
                  border: '1px solid var(--input-border)',
                  color: 'var(--color-text)',
                }}
                value={stat.value}
                onChange={(e) => updateStat(i, 'value', e.target.value)}
              />
              <input
                placeholder="Label (e.g. Projects Built)"
                className="flex-1 rounded-xl px-3.5 sm:px-4 py-2 sm:py-2.5 text-sm outline-none transition-colors"
                style={{
                  background: 'var(--input-bg)',
                  border: '1px solid var(--input-border)',
                  color: 'var(--color-text)',
                }}
                value={stat.label}
                onChange={(e) => updateStat(i, 'label', e.target.value)}
              />
              <Button
                variant="danger"
                onClick={() => setForm({ ...form, stats: form.stats.filter((_, idx) => idx !== i) })}
                className="w-full sm:w-auto px-3 py-2 sm:px-3.5 sm:py-2.5 self-end sm:self-auto"
                aria-label="Remove statistic"
              >
                <Trash2 size={14} />
              </Button>
            </div>
          ))}
        </div>
        <Button
          variant="secondary"
          onClick={() => setForm({ ...form, stats: [...(form.stats || []), { label: '', value: '' }] })}
          className="w-full sm:w-auto"
        >
          <Plus size={14} /> Add Stat
        </Button>
      </Card>

      <div className="mt-6">
        <Button onClick={handleSave} disabled={saving} className="w-full sm:w-auto">
          <Save size={16} /> {saving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </div>
  );
};

export default HeroEditor;
