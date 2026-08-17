import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, Lock, Twitter, Youtube, Globe } from 'lucide-react';
import Logo from './Logo';

const iconMap = {
  GitHub: Github,
  LinkedIn: Linkedin,
  Email: Mail,
  Twitter: Twitter,
  Youtube: Youtube,
  Website: Globe,
};

const Footer = ({ settings, socialLinks }) => (
  <footer
    className="relative pt-16 sm:pt-20 pb-8 sm:pb-12 mt-20 sm:mt-28 overflow-hidden"
    style={{
      background: 'var(--color-surface)',
      borderTop: '1px solid var(--color-border)',
      boxShadow: '0 -10px 40px rgba(0, 0, 0, 0.03)',
    }}
  >
    <div
      className="absolute top-0 left-0 right-0 h-[2px]"
      style={{ background: 'linear-gradient(90deg, transparent, var(--accent), var(--accent2), transparent)' }}
    />

    <div
      className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 rounded-full blur-[100px] pointer-events-none opacity-20"
      style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent2))' }}
    />

    <div className="section-container relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10">
      <div className="sm:col-span-2">
        <div className="mb-4">
          <Logo siteName={settings?.siteName} size={40} />
        </div>
        <p className="text-sm max-w-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>
          Full Stack Developer building secure, production-grade web applications with modern architectures.
        </p>
      </div>

      <div>
        <p className="font-medium text-sm mb-3 sm:mb-4" style={{ color: 'var(--color-text)' }}>Quick Links</p>
        <ul className="space-y-2 text-sm" style={{ color: 'var(--color-muted)' }}>
          {['About', 'Skills', 'Projects', 'Experience', 'Contact'].map((label) => (
            <li key={label}>
              <a
                href={`#${label.toLowerCase()}`}
                className="transition-colors hover:text-[var(--accent)]"
                style={{ color: 'var(--color-muted)' }}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p className="font-medium text-sm mb-3 sm:mb-4" style={{ color: 'var(--color-text)' }}>Connect</p>
        <div className="flex flex-wrap gap-2.5">
          {(socialLinks || []).map((link) => {
            const Icon = iconMap[link.platform] || Mail;
            return (
              <a
                key={link._id}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full glass flex items-center justify-center transition-all"
                aria-label={link.platform}
                style={{ color: 'var(--color-muted)' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.borderColor = 'rgba(var(--accent-rgb),0.4)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-muted)'; e.currentTarget.style.borderColor = ''; }}
              >
                <Icon size={15} />
              </a>
            );
          })}
        </div>
      </div>
    </div>

    <div
      className="section-container relative z-10 flex flex-col sm:flex-row items-center justify-between mt-12 pt-6 text-xs gap-3"
      style={{ borderTop: '1px solid var(--color-border)', color: 'var(--color-muted)' }}
    >
      <p>{settings?.footerText || `© ${new Date().getFullYear()} All rights reserved.`}</p>
      <Link
        to="/admin/login"
        className="flex items-center gap-1.5 transition-colors hover:text-[var(--color-text)]"
        style={{ color: 'var(--color-muted)' }}
      >
        <Lock size={12} /> Admin Login
      </Link>
    </div>
  </footer>
);

export default Footer;
