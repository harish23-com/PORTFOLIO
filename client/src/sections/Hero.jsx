import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Download, Send, ArrowDown } from 'lucide-react';
import api from '../api/axios';

const Hero = ({ hero }) => {
  if (!hero) return null;

  const handleDownload = async () => {
    try {
      await api.post('/resume/track-download');
    } catch { }
    if (hero.resumeFile) {
      window.open(hero.resumeFile, '_blank');
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-24 sm:pt-28 pb-16 sm:pb-20 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 20% 20%, rgba(var(--accent-rgb),0.15), transparent 40%), radial-gradient(circle at 80% 60%, rgba(var(--accent2-rgb),0.12), transparent 40%)',
        }}
      />
      <motion.div
        className="absolute top-1/3 left-1/4 w-48 sm:w-72 h-48 sm:h-72 rounded-full blur-[100px]"
        style={{ background: 'rgba(var(--accent-rgb),0.2)' }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ repeat: Infinity, duration: 6 }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-48 sm:w-72 h-48 sm:h-72 rounded-full blur-[100px]"
        style={{ background: 'rgba(var(--accent2-rgb),0.2)' }}
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
        transition={{ repeat: Infinity, duration: 7 }}
      />

      <div className="section-container relative z-10 text-center w-full">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-sm font-medium tracking-[0.3em] uppercase mb-4 sm:mb-6"
          style={{ color: 'var(--accent2)' }}
        >
          Welcome to my portfolio
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7 }}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight"
          style={{ color: 'var(--color-text)' }}
        >
          Hi, I'm <span className="gradient-text">{hero.name}</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-lg sm:text-xl md:text-2xl font-medium mb-6 sm:mb-8 h-8 sm:h-10"
          style={{ color: 'var(--color-muted)' }}
        >
          <TypeAnimation
            sequence={(hero.roles || []).flatMap((r) => [r, 2000])}
            wrapper="span"
            speed={50}
            repeat={Infinity}
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.6 }}
          className="max-w-xl sm:max-w-2xl mx-auto leading-relaxed mb-8 sm:mb-10 text-sm sm:text-base px-2"
          style={{ color: 'var(--color-muted)' }}
        >
          {hero.summary}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-12 sm:mb-16"
        >
          <button onClick={handleDownload} className="btn-primary text-sm sm:text-base">
            <Download size={16} /> Download Resume
          </button>
          <a href="#contact" className="btn-outline text-sm sm:text-base">
            <Send size={16} /> Hire Me
          </a>
        </motion.div>

        {hero.stats?.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95, duration: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-8 sm:gap-10 md:gap-16"
          >
            {hero.stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl sm:text-3xl md:text-4xl font-bold gradient-text">{stat.value}</p>
                <p className="text-[10px] sm:text-xs text-muted mt-1 uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        )}
      </div>

      <motion.a
        href="#about"
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2"
        style={{ color: 'var(--color-muted)' }}
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.8 }}
        aria-label="Scroll down"
      >
        <ArrowDown size={20} />
      </motion.a>
    </section>
  );
};

export default Hero;
