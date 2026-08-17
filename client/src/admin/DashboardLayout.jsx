import { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, User, Sparkles, Briefcase, GraduationCap, FolderKanban,
  Award, FileText, Inbox, Mail, Settings, Share2, LogOut, ExternalLink,
  Menu, X, Sun, Moon, Database,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { AnimatePresence, motion } from 'framer-motion';
import { LogoEmblem } from '../components/Logo';

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
      {/* Clean, perfectly-aligned Sidebar Header */}
      <div className="p-4 border-b" style={{ borderColor: 'var(--color-border)' }}>
        <div className="flex items-center justify-between gap-2.5">
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            <LogoEmblem size={28} />
            <div className="min-w-0 flex-1">
              <p className="font-bold text-xs sm:text-sm gradient-text tracking-wide truncate">
                Admin Panel
              </p>
              <p className="text-[10px] uppercase tracking-wider font-semibold opacity-70 truncate" style={{ color: 'var(--color-muted)' }}>
                {user?.name ? user.name.split(' ').slice(0, 2).join(' ') : 'Dashboard'}
              </p>
            </div>
          </div>
          <button
            onClick={toggleMode}
            aria-label="Toggle theme"
            className="w-8 h-8 rounded-xl glass flex items-center justify-center flex-shrink-0 transition-transform active:scale-95"
            style={{ color: 'var(--color-text)' }}
          >
            {mode === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
          </button>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={onNavClick}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors ${
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
            <item.icon size={16} className="flex-shrink-0" />
            <span className="truncate">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-3 border-t space-y-1" style={{ borderColor: 'var(--color-border)' }}>
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm hover:bg-white/5 transition-colors"
          style={{ color: 'var(--color-muted)' }}
        >
          <ExternalLink size={15} className="flex-shrink-0" />
          <span>View Live Site</span>
        </a>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm text-red-400 hover:bg-red-500/10 transition-colors text-left"
        >
          <LogOut size={15} className="flex-shrink-0" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

const DashboardLayout = () => {
  const { logout, user } = useAuth();
  const { mode, toggleMode } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Dynamically find active page title from current URL path
  const activeNav = navItems.find((item) =>
    item.end ? location.pathname === item.to : location.pathname.startsWith(item.to)
  );
  const activePageTitle = activeNav ? activeNav.label : 'Admin';

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setSidebarOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row" style={{ background: 'var(--color-base)', color: 'var(--color-text)' }}>
      {/* Desktop Fixed Sidebar */}
      <aside
        className="w-64 border-r flex-col hidden lg:flex fixed top-0 bottom-0 left-0 z-30 overflow-y-auto"
        style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
      >
        <SidebarContent user={user} handleLogout={handleLogout} />
      </aside>

      {/* Dynamic Mobile Top Navbar Header */}
      <header
        className="lg:hidden fixed top-0 left-0 right-0 h-16 z-40 flex items-center justify-between px-3.5 sm:px-4 border-b glass"
        style={{ borderColor: 'var(--color-border)' }}
      >
        <div className="flex items-center gap-2.5 min-w-0 pr-2">
          <LogoEmblem size={28} />
          <div className="flex flex-col min-w-0">
            <span className="font-bold text-sm sm:text-base gradient-text tracking-wide truncate">
              {activePageTitle}
            </span>
            <span className="text-[10px] uppercase tracking-wider font-semibold opacity-70" style={{ color: 'var(--color-muted)' }}>
              Admin Panel
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <button
            onClick={toggleMode}
            aria-label="Toggle theme"
            className="w-8 h-8 rounded-xl glass flex items-center justify-center"
            style={{ color: 'var(--color-text)' }}
          >
            {mode === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
          </button>
          <button
            onClick={() => setSidebarOpen(true)}
            className="w-8 h-8 glass rounded-xl flex items-center justify-center"
            style={{ color: 'var(--color-text)' }}
            aria-label="Open sidebar menu"
          >
            <Menu size={16} />
          </button>
        </div>
      </header>

      {/* Mobile Sidebar Drawer */}
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
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 w-72 sm:w-80 max-w-[85vw] z-50 overflow-y-auto"
              style={{ background: 'var(--color-surface)', borderRight: '1px solid var(--color-border)' }}
            >
              <div className="absolute top-3.5 right-3.5 z-10">
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="w-8 h-8 glass rounded-full flex items-center justify-center"
                  style={{ color: 'var(--color-muted)' }}
                  aria-label="Close sidebar"
                >
                  <X size={16} />
                </button>
              </div>
              <SidebarContent user={user} handleLogout={handleLogout} onNavClick={() => setSidebarOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 lg:ml-64 pt-20 sm:pt-24 lg:pt-8 p-3.5 sm:p-6 md:p-8 lg:p-10 min-h-screen max-w-full overflow-x-hidden">
        <div className="max-w-6xl mx-auto w-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
