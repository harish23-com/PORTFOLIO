import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Mail, Loader2, Sun, Moon, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { mode, toggleMode } = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form.email, form.password);
      toast.success('Welcome back!');
      navigate('/admin/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%',
    background: 'var(--input-bg)',
    border: '1px solid var(--input-border)',
    borderRadius: '0.75rem',
    paddingLeft: '2.75rem',
    paddingRight: '2.75rem',
    paddingTop: '0.75rem',
    paddingBottom: '0.75rem',
    fontSize: '0.875rem',
    outline: 'none',
    color: 'var(--color-text)',
    transition: 'border-color 0.2s ease',
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 relative"
      style={{
        background: 'var(--color-base)',
        backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(var(--accent-rgb),0.12), transparent 40%), radial-gradient(circle at 80% 60%, rgba(var(--accent2-rgb),0.10), transparent 40%)',
      }}
    >
      <button
        onClick={toggleMode}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 w-9 h-9 glass rounded-full flex items-center justify-center transition-all"
        style={{ color: 'var(--color-text)' }}
        aria-label="Toggle theme"
      >
        {mode === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
      </button>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="glass rounded-3xl p-8 sm:p-10 w-full max-w-md"
        style={{ background: 'var(--color-surface)' }}
      >
        <div
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center mb-5 sm:mb-6 mx-auto"
          style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent2))' }}
        >
          <Lock size={20} className="text-white" />
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-center mb-2" style={{ color: 'var(--color-text)' }}>
          Admin Login
        </h1>
        <p className="text-sm text-center mb-6 sm:mb-8" style={{ color: 'var(--color-muted)' }}>
          Sign in to manage your portfolio
        </p>

        <div className="space-y-4">
          <div className="relative">
            <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-muted)' }} />
            <input
              type="email"
              required
              placeholder="Email / Username"
              style={inputStyle}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              onFocus={(e) => { e.target.style.borderColor = 'rgba(var(--accent-rgb),0.6)'; }}
              onBlur={(e) => { e.target.style.borderColor = 'var(--input-border)'; }}
            />
          </div>
          <div className="relative">
            <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-muted)' }} />
            <input
              type={showPassword ? 'text' : 'password'}
              required
              placeholder="Password"
              style={inputStyle}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              onFocus={(e) => { e.target.style.borderColor = 'rgba(var(--accent-rgb),0.6)'; }}
              onBlur={(e) => { e.target.style.borderColor = 'var(--input-border)'; }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded-md transition-colors"
              style={{ color: 'var(--color-muted)' }}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <button type="submit" disabled={loading} className="btn-primary w-full justify-center mt-6 sm:mt-8 disabled:opacity-60">
          {loading ? <Loader2 size={16} className="animate-spin" /> : <Lock size={16} />}
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </motion.form>
    </div>
  );
};

export default Login;
