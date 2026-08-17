import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import ScrollProgress from './components/ScrollProgress';
import CustomCursor from './components/CustomCursor';
import BackToTop from './components/BackToTop';
import Loader from './components/Loader';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Login from './admin/Login';
import ProtectedRoute from './admin/ProtectedRoute';
import DashboardLayout from './admin/DashboardLayout';
import Dashboard from './admin/Dashboard';
import HeroEditor from './admin/HeroEditor';
import AboutEditor from './admin/AboutEditor';
import SkillsEditor from './admin/SkillsEditor';
import ExperienceEditor from './admin/ExperienceEditor';
import EducationEditor from './admin/EducationEditor';
import ProjectsEditor from './admin/ProjectsEditor';
import CertificatesEditor from './admin/CertificatesEditor';
import ResumeEditor from './admin/ResumeEditor';
import MessagesEditor from './admin/MessagesEditor';
import SmtpEditor from './admin/SmtpEditor';
import SocialLinksEditor from './admin/SocialLinksEditor';
import SettingsEditor from './admin/SettingsEditor';
import BackupEditor from './admin/BackupEditor';
import { updateFaviconFromSiteName } from './utils/dynamicFavicon';

const ToasterWithTheme = () => {
  const { mode } = useTheme();
  const isDark = mode === 'dark';
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: isDark ? '#241a26' : '#ffffff',
          color: isDark ? '#fff' : '#1a1a2e',
          border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.08)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
        },
      }}
    />
  );
};

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    updateFaviconFromSiteName('Harish Kumar');
    const timer = setTimeout(() => setLoading(false), 350);
    return () => clearTimeout(timer);
  }, []);

  return (
    <HelmetProvider>
      <ThemeProvider>
        <AuthProvider>
          <Loader show={loading} />
          <ScrollProgress />
          <CustomCursor />
          <ToasterWithTheme />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin/login" element={<Login />} />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="hero" element={<HeroEditor />} />
              <Route path="about" element={<AboutEditor />} />
              <Route path="skills" element={<SkillsEditor />} />
              <Route path="experience" element={<ExperienceEditor />} />
              <Route path="education" element={<EducationEditor />} />
              <Route path="projects" element={<ProjectsEditor />} />
              <Route path="certificates" element={<CertificatesEditor />} />
              <Route path="resume" element={<ResumeEditor />} />
              <Route path="messages" element={<MessagesEditor />} />
              <Route path="smtp" element={<SmtpEditor />} />
              <Route path="social" element={<SocialLinksEditor />} />
              <Route path="settings" element={<SettingsEditor />} />
              <Route path="backup" element={<BackupEditor />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>

          <BackToTop />
        </AuthProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
