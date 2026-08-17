import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';
import { fadeUp, viewportOnce } from '../hooks/useScrollReveal';

const Education = ({ education }) => (
  <section
    id="education"
    className="py-20 sm:py-28 relative overflow-hidden"
    style={{
      background: 'var(--color-surface2)',
      borderTop: '1px solid var(--color-border)',
      borderBottom: '1px solid var(--color-border)',
    }}
  >
    <div className="section-container">
      <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce} className="text-center mb-12 sm:mb-16">
        <p className="section-heading-badge">Academic background</p>
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold"
          style={{ color: 'var(--color-text)' }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="gradient-text">Education</span>
        </motion.h2>
      </motion.div>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto"
        style={{ perspective: 1000 }}
      >
        {(education || []).map((edu, i) => (
          <motion.div
            key={edu._id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ delay: i * 0.12, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{
              scale: 1.04,
              y: -8,
              rotateY: i % 2 === 0 ? 5 : -5,
              boxShadow: '0 20px 50px rgba(var(--accent-rgb),0.2), 0 8px 24px rgba(0,0,0,0.14)',
              transition: { type: 'spring', stiffness: 250, damping: 18 },
            }}
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
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center mb-3 sm:mb-4"
                style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent2))' }}
                whileHover={{ rotate: 8, scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <GraduationCap size={18} className="text-white" />
              </motion.div>
              <p className="text-xs font-medium mb-1" style={{ color: 'var(--accent2)' }}>
                {edu.startYear} — {edu.endYear}
              </p>
              <h3 className="font-semibold text-sm sm:text-base mb-1" style={{ color: 'var(--color-text)' }}>
                {edu.degree}
              </h3>
              <p className="text-xs sm:text-sm" style={{ color: 'var(--color-muted)' }}>{edu.institution}</p>
              {edu.description && (
                <p className="text-xs mt-2 leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                  {edu.description}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Education;
