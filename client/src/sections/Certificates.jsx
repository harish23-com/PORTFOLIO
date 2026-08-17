import { motion } from 'framer-motion';
import { Award, ExternalLink } from 'lucide-react';
import { fadeUp, staggerContainer, viewportOnce } from '../hooks/useScrollReveal';

const Certificates = ({ certificates }) => {
  if (!certificates || certificates.length === 0) return null;

  return (
    <section id="certificates" className="py-16 sm:py-24">
      <div className="section-container">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce} className="text-center mb-10 sm:mb-14">
          <p className="section-heading-badge">Recognitions</p>
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold"
            style={{ color: 'var(--color-text)' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="gradient-text">Certificates</span>
          </motion.h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          style={{ perspective: 1100 }}
        >
          {certificates.map((cert, i) => (
            <motion.div
              key={cert._id}
              variants={fadeUp}
              whileHover={{
                scale: 1.05,
                y: -10,
                rotateY: (i % 3 === 0 ? 5 : i % 3 === 1 ? 0 : -5),
                boxShadow: '0 24px 60px rgba(var(--accent-rgb),0.2), 0 8px 28px rgba(0,0,0,0.14)',
              }}
              transition={{ type: 'spring', stiffness: 250, damping: 16 }}
              style={{ borderRadius: '1rem' }}
            >
              <div
                className="glass rounded-2xl p-5 sm:p-6 h-full overflow-hidden relative"
                style={{ border: '1px solid var(--color-border)' }}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-0.5"
                  style={{ background: 'linear-gradient(90deg, var(--accent), var(--accent2))' }}
                />

                <motion.div
                  className="absolute -top-8 -right-8 w-28 h-28 rounded-full blur-3xl pointer-events-none"
                  style={{ background: 'rgba(var(--accent-rgb),0.12)' }}
                  animate={{ scale: [1, 1.35, 1], opacity: [0.5, 0.8, 0.5] }}
                  transition={{ repeat: Infinity, duration: 4 + i * 0.4, ease: 'easeInOut' }}
                />

                <div className="flex items-start justify-between mb-3 sm:mb-4 relative z-10">
                  <motion.div
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent2))' }}
                    whileHover={{ rotate: 12, scale: 1.12 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    <Award size={18} className="text-white" />
                  </motion.div>
                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="transition-colors"
                      style={{ color: 'var(--color-muted)' }}
                      onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent)'}
                      onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-muted)'}
                      aria-label="View credential"
                    >
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>

                <div className="relative z-10">
                  <h3 className="font-semibold text-sm sm:text-base mb-1" style={{ color: 'var(--color-text)' }}>
                    {cert.title}
                  </h3>
                  <p className="text-xs font-medium mb-2" style={{ color: 'var(--accent2)' }}>
                    {cert.organization} · {cert.date}
                  </p>
                  {cert.description && (
                    <p className="text-xs leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                      {cert.description}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Certificates;
