import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Save, Palette, Check, Sun, Moon } from 'lucide-react';
import api from '../api/axios';
import { Card, Input, TextArea, Button, LoadingCard } from './ui';
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
  const { mode, toggleMode, colorTheme, setColorTheme } = useTheme();

  useEffect(() => {
    api.get('/settings').then((res) => setForm(res.data.data));
  }, []);

  if (!form) {
    return <LoadingCard text="Loading Site & SEO Settings..." />;
  }

  const handleSave = async (e) => {
    e?.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...form,
        colorTheme,
      };
      const { data } = await api.put('/settings', payload);
      setForm(data.data);
      toast.success('Settings updated successfully');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update settings');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="mb-5 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-bold" style={{ color: 'var(--color-text)' }}>Site & SEO Settings</h1>
        <p className="text-xs sm:text-sm mt-0.5" style={{ color: 'var(--color-muted)' }}>Customize themes, branding, search metadata, and contact details</p>
      </div>

      <Card title="Appearance & Themes">
        <div className="mb-6">
          <p className="text-xs mb-3 font-medium" style={{ color: 'var(--color-muted)' }}>Default Mode</p>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => mode !== 'dark' && toggleMode()}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm transition-all ${
                mode === 'dark' ? 'border-accent text-white' : 'border-white/10 text-muted'
              }`}
              style={{
                borderColor: mode === 'dark' ? 'var(--accent)' : 'var(--color-border)',
                background: mode === 'dark' ? 'rgba(var(--accent-rgb), 0.12)' : 'var(--glass-bg)',
                color: mode === 'dark' ? 'var(--color-text)' : 'var(--color-muted)',
              }}
            >
              <Moon size={15} /> Dark Mode
            </button>
            <button
              type="button"
              onClick={() => mode !== 'light' && toggleMode()}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm transition-all ${
                mode === 'light' ? 'border-accent' : 'border-white/10'
              }`}
              style={{
                borderColor: mode === 'light' ? 'var(--accent)' : 'var(--color-border)',
                background: mode === 'light' ? 'rgba(var(--accent-rgb), 0.12)' : 'var(--glass-bg)',
                color: mode === 'light' ? 'var(--color-text)' : 'var(--color-muted)',
              }}
            >
              <Sun size={15} /> Light Mode
            </button>
          </div>
        </div>

        <div>
          <p className="text-xs mb-3 flex items-center gap-1.5 font-medium" style={{ color: 'var(--color-muted)' }}>
            <Palette size={13} /> Color Palette Preset
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 sm:gap-3">
            {COLOR_THEMES.map((theme) => (
              <button
                key={theme.id}
                type="button"
                onClick={() => setColorTheme(theme.id)}
                className="relative flex flex-col items-center gap-2 p-3 sm:p-4 rounded-2xl border transition-all"
                style={{
                  borderColor: colorTheme === theme.id ? theme.accent : 'var(--color-border)',
                  background: colorTheme === theme.id ? `rgba(${hexToRgb(theme.accent)}, 0.12)` : 'var(--glass-bg)',
                }}
              >
                <div className="flex gap-1.5">
                  <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full shadow-sm" style={{ background: theme.accent }} />
                  <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full shadow-sm" style={{ background: theme.accent2 }} />
                </div>
                <p className="text-xs font-medium truncate w-full text-center" style={{ color: 'var(--color-text)' }}>
                  {theme.name}
                </p>
                <div
                  className="w-full h-1 rounded-full"
                  style={{ background: `linear-gradient(90deg, ${theme.accent}, ${theme.accent2})` }}
                />
                {colorTheme === theme.id && (
                  <span
                    className="absolute top-2 right-2 w-4 h-4 rounded-full flex items-center justify-center shadow"
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

        {/* Live Logo Preview Box - Responsive & Centered */}
        <div
          className="my-4 p-4 sm:p-6 rounded-2xl glass flex flex-col items-center justify-center gap-3 text-center border"
          style={{ borderColor: 'var(--color-border)' }}
        >
          <span className="text-[11px] font-bold tracking-widest uppercase" style={{ color: 'var(--accent2)' }}>
            Live Dynamic Logo Preview
          </span>
          <div className="w-full flex items-center justify-center py-6 px-4 rounded-xl border border-white/5 bg-black/10">
            <Logo siteName={form.siteName} variant="badge" size={80} />
          </div>
          <p className="text-[11px]" style={{ color: 'var(--color-muted)' }}>
            The initials and styling update automatically in real-time based on the name above.
          </p>
        </div>

        <TextArea label="Footer Text" rows={2} value={form.footerText} onChange={(e) => setForm({ ...form, footerText: e.target.value })} />
      </Card>

      <Card title="SEO & Metadata">
        <Input label="Meta Title" value={form.seo?.metaTitle || ''} onChange={(e) => setForm({ ...form, seo: { ...form.seo, metaTitle: e.target.value } })} />
        <TextArea label="Meta Description" rows={3} value={form.seo?.metaDescription || ''} onChange={(e) => setForm({ ...form, seo: { ...form.seo, metaDescription: e.target.value } })} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <Input label="Keywords (comma separated)" value={form.seo?.keywords || ''} onChange={(e) => setForm({ ...form, seo: { ...form.seo, keywords: e.target.value } })} />
          <Input label="Robots" value={form.seo?.robots || ''} onChange={(e) => setForm({ ...form, seo: { ...form.seo, robots: e.target.value } })} />
          <Input label="Canonical URL" value={form.seo?.canonicalUrl || ''} onChange={(e) => setForm({ ...form, seo: { ...form.seo, canonicalUrl: e.target.value } })} />
          <Input label="Twitter Handle" value={form.seo?.twitterHandle || ''} onChange={(e) => setForm({ ...form, seo: { ...form.seo, twitterHandle: e.target.value } })} />
        </div>
      </Card>

      <div className="mt-6">
        <Button onClick={handleSave} disabled={saving} className="w-full sm:w-auto">
          <Save size={16} /> {saving ? 'Saving...' : 'Save All Settings'}
        </Button>
      </div>
    </div>
  );
};

export default SettingsEditor;
