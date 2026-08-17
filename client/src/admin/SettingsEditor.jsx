import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Save, Palette, Check } from 'lucide-react';
import api from '../api/axios';
import { Card, Input, TextArea, Button } from './ui';
import { useTheme, COLOR_THEMES } from '../context/ThemeContext';
import Logo from '../components/Logo';

const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : '124, 92, 255';
};

const SettingsEditor = () => {
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);
  const { colorTheme, setColorTheme, mode, toggleMode } = useTheme();

  useEffect(() => {
    api.get('/settings').then((res) => setForm(res.data.data));
  }, []);

  if (!form) return <p style={{ color: 'var(--color-muted)' }}>Loading...</p>;

  const handleSave = async () => {
    setSaving(true);
    try {
      const { data } = await api.put('/settings', form);
      setForm(data.data);
      toast.success('Settings updated');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6" style={{ color: 'var(--color-text)' }}>
        Site & SEO Settings
      </h1>

      <Card title="Theme & Appearance">
        <div className="mb-6">
          <p className="text-xs mb-3" style={{ color: 'var(--color-muted)' }}>Display Mode</p>
          <div className="flex items-center gap-3">
            <button
              onClick={() => mode !== 'dark' && toggleMode()}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium border transition-all ${
                mode === 'dark' ? 'text-white' : 'text-[var(--color-muted)] hover:text-[var(--color-text)]'
              }`}
              style={
                mode === 'dark'
                  ? { background: 'linear-gradient(135deg, rgba(var(--accent-rgb),0.25), rgba(var(--accent2-rgb),0.15))', borderColor: 'rgba(var(--accent-rgb),0.4)' }
                  : { background: 'var(--glass-bg)', borderColor: 'var(--color-border)' }
              }
            >
              <span>🌙</span> Dark Mode
              {mode === 'dark' && <Check size={14} className="ml-1" />}
            </button>
            <button
              onClick={() => mode !== 'light' && toggleMode()}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium border transition-all ${
                mode === 'light' ? 'text-[var(--color-text)]' : 'text-[var(--color-muted)] hover:text-[var(--color-text)]'
              }`}
              style={
                mode === 'light'
                  ? { background: 'linear-gradient(135deg, rgba(var(--accent-rgb),0.15), rgba(var(--accent2-rgb),0.1))', borderColor: 'rgba(var(--accent-rgb),0.4)' }
                  : { background: 'var(--glass-bg)', borderColor: 'var(--color-border)' }
              }
            >
              <span>☀️</span> Light Mode
              {mode === 'light' && <Check size={14} className="ml-1" />}
            </button>
          </div>
        </div>

        <div>
          <p className="text-xs mb-3 flex items-center gap-1.5" style={{ color: 'var(--color-muted)' }}>
            <Palette size={13} /> Color Theme
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {COLOR_THEMES.map((theme) => (
              <button
                key={theme.id}
                onClick={() => setColorTheme(theme.id)}
                className="relative flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all"
                style={{
                  borderColor: colorTheme === theme.id ? theme.accent : 'var(--color-border)',
                  background: colorTheme === theme.id ? `rgba(${hexToRgb(theme.accent)}, 0.1)` : 'var(--glass-bg)',
                }}
              >
                <div className="flex gap-1.5">
                  <span className="w-5 h-5 rounded-full" style={{ background: theme.accent }} />
                  <span className="w-5 h-5 rounded-full" style={{ background: theme.accent2 }} />
                </div>
                <p className="text-xs font-medium" style={{ color: 'var(--color-text)' }}>{theme.name}</p>
                <div
                  className="w-full h-1 rounded-full"
                  style={{ background: `linear-gradient(90deg, ${theme.accent}, ${theme.accent2})` }}
                />
                {colorTheme === theme.id && (
                  <span
                    className="absolute top-2 right-2 w-4 h-4 rounded-full flex items-center justify-center"
                    style={{ background: theme.accent }}
                  >
                    <Check size={10} color="#fff" />
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </Card>

      <Card title="General & Branding">
        <Input label="Site Name / Brand Name" value={form.siteName} onChange={(e) => setForm({ ...form, siteName: e.target.value })} />

        <div className="my-4 p-5 rounded-2xl glass flex flex-col items-center justify-center gap-4 text-center" style={{ borderColor: 'var(--color-border)' }}>
          <p className="text-xs font-semibold tracking-wider uppercase text-[var(--accent2)]">
            Live Dynamic Logo Preview
          </p>
          <div className="p-4 rounded-xl border border-white/5 bg-black/20">
            <Logo siteName={form.siteName} variant="badge" size={44} />
          </div>
          <p className="text-xs" style={{ color: 'var(--color-muted)' }}>
            The initials and text update automatically based on the Site Name entered above.
          </p>
        </div>

        <TextArea label="Footer Text" rows={2} value={form.footerText} onChange={(e) => setForm({ ...form, footerText: e.target.value })} />
      </Card>

      <Card title="SEO">
        <Input label="Meta Title" value={form.seo?.metaTitle || ''} onChange={(e) => setForm({ ...form, seo: { ...form.seo, metaTitle: e.target.value } })} />
        <TextArea label="Meta Description" rows={3} value={form.seo?.metaDescription || ''} onChange={(e) => setForm({ ...form, seo: { ...form.seo, metaDescription: e.target.value } })} />
        <Input label="Keywords (comma separated)" value={form.seo?.keywords || ''} onChange={(e) => setForm({ ...form, seo: { ...form.seo, keywords: e.target.value } })} />
        <Input label="Robots" value={form.seo?.robots || ''} onChange={(e) => setForm({ ...form, seo: { ...form.seo, robots: e.target.value } })} />
        <Input label="Canonical URL" value={form.seo?.canonicalUrl || ''} onChange={(e) => setForm({ ...form, seo: { ...form.seo, canonicalUrl: e.target.value } })} />
        <Input label="Twitter Handle" value={form.seo?.twitterHandle || ''} onChange={(e) => setForm({ ...form, seo: { ...form.seo, twitterHandle: e.target.value } })} />
      </Card>

      <Button onClick={handleSave} disabled={saving}>
        <Save size={16} /> {saving ? 'Saving...' : 'Save Settings'}
      </Button>
    </div>
  );
};

export default SettingsEditor;
