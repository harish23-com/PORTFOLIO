import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import Logo from './Logo';

const links = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'Certificates', href: '#certificates' },
  { label: 'Contact', href: '#contact' },
];

const Navbar = ({ siteName }) => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('#home');
  const { mode, toggleMode } = useTheme();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = links.map((l) => document.querySelector(l.href));
      const pos = window.scrollY + 120;
      sections.forEach((sec, i) => {
        if (sec && sec.offsetTop <= pos && sec.offsetTop + sec.offsetHeight > pos) {
          setActive(links[i].href);
        }
      });
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const handleMobileNavClick = (e, href) => {
    e.preventDefault();
    setOpen(false);
    setTimeout(() => {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 150);
  };

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass py-3' : 'py-4 sm:py-6 bg-transparent'
      }`}
    >
      <div className="section-container flex items-center justify-between gap-4">
        <a href="#home" className="flex-shrink-0 flex items-center">
          <Logo siteName={siteName} size={36} />
        </a>

        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{ color: active === link.href ? 'var(--color-text)' : 'var(--color-muted)' }}
              className="text-sm font-medium transition-colors duration-300 relative hover:text-[var(--color-text)]"
            >
              {link.label}
              {active === link.href && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute -bottom-1.5 left-0 right-0 h-[2px] rounded-full"
                  style={{ background: 'linear-gradient(90deg, var(--accent), var(--accent2))' }}
                />
              )}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <motion.button
            onClick={toggleMode}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle theme"
            className="w-9 h-9 rounded-full glass flex items-center justify-center transition-all"
            style={{ color: 'var(--color-text)' }}
          >
            <AnimatePresence mode="wait">
              {mode === 'dark' ? (
                <motion.span key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Sun size={16} />
                </motion.span>
              ) : (
                <motion.span key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Moon size={16} />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          <button
            className="lg:hidden w-9 h-9 rounded-full glass flex items-center justify-center"
            style={{ color: 'var(--color-text)' }}
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              {open ? (
                <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <X size={18} />
                </motion.span>
              ) : (
                <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <Menu size={18} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            key="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden glass mt-3 mx-4 rounded-2xl overflow-hidden"
          >
            <div className="flex flex-col p-3 gap-1">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleMobileNavClick(e, link.href)}
                  className="py-3 px-4 rounded-xl text-sm font-medium transition-all cursor-pointer"
                  style={{
                    color: active === link.href ? 'var(--accent)' : 'var(--color-muted)',
                    background: active === link.href ? 'rgba(var(--accent-rgb),0.08)' : 'transparent',
                  }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
