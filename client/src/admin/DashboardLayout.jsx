import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, User, Sparkles, Briefcase, GraduationCap, FolderKanban,
  Award, FileText, Inbox, Mail, Settings, Share2, LogOut, ExternalLink,
  Menu, X, Sun, Moon, Database,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { AnimatePresence, motion } from 'framer-motion';
import Logo from '../components/Logo';

const navItems = [
  { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { to: '/admin/dashboard/hero', icon: Sparkles, label: 'Hero Section' },
  { to: '/admin/dashboard/about', icon: User, label: 'About' },
  { to: '/admin/dashboard/skills', icon: Sparkles, label: 'Skills' },
  { to: '/admin/dashboard/experience', icon: Briefcase, label: 'Experience' },
  { to: '/admin/dashboard/education', icon: GraduationCap, label: 'Education' },
  { to: '/admin/dashboard/projects', icon: FolderKanban, label: 'Projects' },
  { to: '/admin/dashboard/certificates', icon: Award, label: 'Certificates' },
  { to: '/admin/dashboard/resume', icon: FileText, label: 'Resume' },
  { to: '/admin/dashboard/messages', icon: Inbox, label: 'Contact Messages' },
  { to: '/admin/dashboard/smtp', icon: Mail, label: 'SMTP Config' },
  { to: '/admin/dashboard/social', icon: Share2, label: 'Social Links' },
  { to: '/admin/dashboard/settings', icon: Settings, label: 'Site & SEO Settings' },
  { to: '/admin/dashboard/backup', icon: Database, label: 'Backup & Restore' },
];

const SidebarContent = ({ user, handleLogout, onNavClick }) => {
  const { mode, toggleMode } = useTheme();
  return (
    <div className="flex flex-col h-full">
      <div className="p-5 border-b flex items-center justify-between" style={{ borderColor: 'var(--color-border)' }}>
        <div>
          <Logo siteName={user?.name || 'Admin Panel'} subtitle="ADMIN" size={28} />
        </div>
        <button
          onClick={toggleMode}
          aria-label="Toggle theme"
          className="w-8 h-8 rounded-full glass flex items-center justify-center transition-all"
          style={{ color: 'var(--color-text)' }}
        >
          {mode === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
        </button>
      </div>

      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={onNavClick}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-colors ${
                isActive
                  ? 'text-white border'
                  : 'hover:text-[var(--color-text)] hover:bg-white/5'
              }`
            }
            style={({ isActive }) =>
              isActive
                ? {
                    background: 'linear-gradient(135deg, rgba(var(--accent-rgb),0.2), rgba(var(--accent2-rgb),0.1))',
                    borderColor: 'rgba(var(--accent-rgb),0.3)',
                    color: 'var(--color-text)',
                  }
                : { color: 'var(--color-muted)' }
            }
          >
            <item.icon size={16} /> {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="p-3 border-t space-y-1" style={{ borderColor: 'var(--color-border)' }}>
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm hover:bg-white/5 transition-colors"
          style={{ color: 'var(--color-muted)' }}
        >
          <ExternalLink size={16} /> View Site
        </a>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-red-400 hover:bg-red-500/10 transition-colors"
        >
          <LogOut size={16} /> Logout
        </button>
      </div>
    </div>
  );
};

const DashboardLayout = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--color-base)', color: 'var(--color-text)' }}>
      <aside
        className="w-64 border-r flex-col hidden lg:flex fixed h-screen overflow-y-auto"
        style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
      >
        <SidebarContent user={user} handleLogout={handleLogout} />
      </aside>

      <div
        className="lg:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 py-3 border-b"
        style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
      >
        <p className="font-display font-bold gradient-text">Admin Panel</p>
        <button
          onClick={() => setSidebarOpen(true)}
          className="w-9 h-9 glass rounded-xl flex items-center justify-center"
          style={{ color: 'var(--color-text)' }}
          aria-label="Open sidebar"
        >
          <Menu size={18} />
        </button>
      </div>

      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              key="drawer"
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 w-72 z-50 overflow-y-auto"
              style={{ background: 'var(--color-surface)', borderRight: '1px solid var(--color-border)' }}
            >
              <div className="absolute top-3 right-3">
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="w-8 h-8 glass rounded-full flex items-center justify-center"
                  style={{ color: 'var(--color-muted)' }}
                >
                  <X size={16} />
                </button>
              </div>
              <SidebarContent user={user} handleLogout={handleLogout} onNavClick={() => setSidebarOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <main className="flex-1 lg:ml-64 pt-16 lg:pt-0 p-4 sm:p-6 md:p-10 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
