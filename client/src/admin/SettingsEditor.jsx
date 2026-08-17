import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Save, Check, Sun, Moon, Shield, Eye, EyeOff } from 'lucide-react';
import api from '../api/axios';
import { Card, Input, TextArea, Button, LoadingCard } from './ui';
import { useTheme, COLOR_THEMES } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
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
  const { user, updateProfile } = useAuth();

  // Admin Account & Password State
  const [adminName, setAdminName] = useState(user?.name || '');
  const [adminEmail, setAdminEmail] = useState(user?.email || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [savingAccount, setSavingAccount] = useState(false);

  useEffect(() => {
    api.get('/settings').then((res) => setForm(res.data.data));
  }, []);

  useEffect(() => {
    if (user) {
      setAdminName(user.name || '');
      setAdminEmail(user.email || '');
    }
  }, [user]);

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
      toast.success('Site & SEO Settings updated successfully');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update settings');
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateAccount = async (e) => {
    e?.preventDefault();
    if (!adminName.trim()) return toast.error('Admin name cannot be empty');
    if (!adminEmail.trim()) return toast.error('Admin email cannot be empty');

    if (newPassword) {
      if (!currentPassword) return toast.error('Please enter your current password to set a new password');
      if (newPassword.length < 8) return toast.error('New password must be at least 8 characters');
      if (newPassword !== confirmPassword) return toast.error('New passwords do not match');
    }

    setSavingAccount(true);
    try {
      await updateProfile({
        name: adminName,
        email: adminEmail,
        currentPassword: currentPassword || undefined,
        newPassword: newPassword || undefined,
      });
      toast.success('Admin account credentials updated successfully');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update admin account credentials');
    } finally {
      setSavingAccount(false);
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold" style={{ color: 'var(--color-text)' }}>Site & SEO Settings</h1>
        <p className="text-xs sm:text-sm mt-0.5" style={{ color: 'var(--color-muted)' }}>Configure site identity, theme colors, SEO meta tags, and admin credentials</p>
      </div>

      {/* Live Color Theme Customizer */}
      <Card title="Live Color Theme">
        <p className="text-xs sm:text-sm mb-4" style={{ color: 'var(--color-muted)' }}>
          Select the primary accent color palette for your entire portfolio and admin panel.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3 mb-6">
          {COLOR_THEMES.map((theme) => {
            const isSelected = colorTheme === theme.id;
            return (
              <button
                key={theme.id}
                type="button"
                onClick={() => setColorTheme(theme.id)}
                className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all text-center relative ${
                  isSelected ? 'ring-2 scale-[1.02]' : 'hover:border-white/20'
                }`}
                style={{
                  borderColor: isSelected ? theme.accent : 'var(--color-border)',
                  background: isSelected ? `rgba(${hexToRgb(theme.accent)}, 0.1)` : 'transparent',
                  ringColor: theme.accent,
                }}
              >
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-full shadow-md" style={{ background: theme.accent }} />
                  <div className="w-4 h-4 rounded-full shadow-md -ml-2" style={{ background: theme.accent2 }} />
                </div>
                <span className="text-xs font-medium" style={{ color: 'var(--color-text)' }}>{theme.name}</span>
                {isSelected && (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full flex items-center justify-center text-white" style={{ background: theme.accent }}>
                    <Check size={10} />
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: 'var(--color-border)' }}>
          <div>
            <p className="text-xs sm:text-sm font-semibold" style={{ color: 'var(--color-text)' }}>Default Color Mode</p>
            <p className="text-xs" style={{ color: 'var(--color-muted)' }}>Currently viewing in {mode} mode</p>
          </div>
          <button
            type="button"
            onClick={toggleMode}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl glass border text-xs sm:text-sm font-medium"
            style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
          >
            {mode === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
            <span>Switch to {mode === 'dark' ? 'Light' : 'Dark'}</span>
          </button>
        </div>
      </Card>

      {/* General Brand Settings */}
      <Card title="Brand & Identity">
        <Input
          label="Site Name / Brand Display Name"
          placeholder="e.g. Harish Kumar | Portfolio"
          value={form.siteName}
          onChange={(e) => setForm({ ...form, siteName: e.target.value })}
        />

        {/* Live Logo Preview Box */}
        <div className="space-y-2 p-3 sm:p-4 rounded-xl border" style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface-2)' }}>
          <span className="text-xs font-semibold uppercase tracking-wider block" style={{ color: 'var(--accent2)' }}>
            Live Monogram Emblem Preview
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

      {/* SEO & Metadata */}
      <Card title="SEO & Metadata">
        <Input label="Meta Title" value={form.seo?.metaTitle || ''} onChange={(e) => setForm({ ...form, seo: { ...form.seo, metaTitle: e.target.value } })} />
        <TextArea label="Meta Description" rows={3} value={form.seo?.metaDescription || ''} onChange={(e) => setForm({ ...form, seo: { ...form.seo, metaDescription: e.target.value } })} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <Input label="Keywords (comma separated)" value={form.seo?.keywords || ''} onChange={(e) => setForm({ ...form, seo: { ...form.seo, keywords: e.target.value } })} />
          <Input label="Robots" value={form.seo?.robots || ''} onChange={(e) => setForm({ ...form, seo: { ...form.seo, robots: e.target.value } })} />
          <Input label="Canonical URL" value={form.seo?.canonicalUrl || ''} onChange={(e) => setForm({ ...form, seo: { ...form.seo, canonicalUrl: e.target.value } })} />
          <Input label="Twitter Handle" value={form.seo?.twitterHandle || ''} onChange={(e) => setForm({ ...form, seo: { ...form.seo, twitterHandle: e.target.value } })} />
        </div>

        <div className="mt-5">
          <Button onClick={handleSave} disabled={saving} className="w-full sm:w-auto">
            <Save size={16} /> {saving ? 'Saving...' : 'Save Site & SEO Settings'}
          </Button>
        </div>
      </Card>

      {/* Admin Account & Security Section at the Bottom */}
      <Card title="Admin Account & Credentials">
        <div className="flex items-center gap-3 p-3.5 rounded-xl border mb-4" style={{ borderColor: 'rgba(var(--accent-rgb), 0.25)', background: 'rgba(var(--accent-rgb), 0.05)' }}>
          <Shield className="text-[var(--accent)] flex-shrink-0" size={20} />
          <p className="text-xs" style={{ color: 'var(--color-muted)' }}>
            Update your admin login username/email, display name, and password dynamically in MongoDB.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
          <Input
            label="Admin Full Name"
            placeholder="e.g. Harish Kumar"
            value={adminName}
            onChange={(e) => setAdminName(e.target.value)}
          />
          <Input
            label="Admin Email (Login Username)"
            type="email"
            placeholder="admin@example.com"
            value={adminEmail}
            onChange={(e) => setAdminEmail(e.target.value)}
          />
        </div>

        <div className="pt-3 border-t space-y-3 sm:space-y-4" style={{ borderColor: 'var(--color-border)' }}>
          <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--accent2)' }}>
            Change Password (Optional)
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            {/* Current Password with Eye toggle */}
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--color-muted)' }}>Current Password</label>
              <div className="relative">
                <input
                  type={showCurrentPass ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="w-full rounded-xl px-3.5 py-2.5 pr-10 text-xs sm:text-sm border outline-none transition-colors"
                  style={{
                    background: 'var(--input-bg)',
                    borderColor: 'var(--input-border)',
                    color: 'var(--color-text)',
                  }}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPass(!showCurrentPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded transition-colors"
                  style={{ color: 'var(--color-muted)' }}
                  aria-label={showCurrentPass ? 'Hide password' : 'Show password'}
                >
                  {showCurrentPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* New Password with Eye toggle */}
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--color-muted)' }}>New Password</label>
              <div className="relative">
                <input
                  type={showNewPass ? 'text' : 'password'}
                  placeholder="Min. 8 chars"
                  className="w-full rounded-xl px-3.5 py-2.5 pr-10 text-xs sm:text-sm border outline-none transition-colors"
                  style={{
                    background: 'var(--input-bg)',
                    borderColor: 'var(--input-border)',
                    color: 'var(--color-text)',
                  }}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPass(!showNewPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded transition-colors"
                  style={{ color: 'var(--color-muted)' }}
                  aria-label={showNewPass ? 'Hide password' : 'Show password'}
                >
                  {showNewPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Confirm New Password with Eye toggle */}
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--color-muted)' }}>Confirm New Password</label>
              <div className="relative">
                <input
                  type={showConfirmPass ? 'text' : 'password'}
                  placeholder="Confirm new password"
                  className="w-full rounded-xl px-3.5 py-2.5 pr-10 text-xs sm:text-sm border outline-none transition-colors"
                  style={{
                    background: 'var(--input-bg)',
                    borderColor: 'var(--input-border)',
                    color: 'var(--color-text)',
                  }}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPass(!showConfirmPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded transition-colors"
                  style={{ color: 'var(--color-muted)' }}
                  aria-label={showConfirmPass ? 'Hide password' : 'Show password'}
                >
                  {showConfirmPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <Button onClick={handleUpdateAccount} disabled={savingAccount} className="w-full sm:w-auto">
            <Shield size={16} /> {savingAccount ? 'Updating Credentials...' : 'Save Admin Credentials'}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default SettingsEditor;
