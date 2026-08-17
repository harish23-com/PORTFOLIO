import { motion } from 'framer-motion';
import { Briefcase, MapPin } from 'lucide-react';
import { fadeUp, viewportOnce } from '../hooks/useScrollReveal';

const Experience = ({ experience }) => (
  <section id="experience" className="py-16 sm:py-24">
    <div className="section-container">
      <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce} className="text-center mb-12 sm:mb-16">
        <p className="section-heading-badge">Where I've worked</p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold" style={{ color: 'var(--color-text)' }}>
          Professional <span className="gradient-text">Experience</span>
        </h2>
      </motion.div>

      <div className="relative max-w-3xl mx-auto">
        <div
          className="absolute left-4 sm:left-5 top-2 bottom-2 w-px"
          style={{ background: 'linear-gradient(to bottom, var(--accent), var(--accent2), transparent)' }}
        />

        <div className="space-y-6 sm:space-y-10">
          {(experience || []).map((exp, i) => (
            <motion.div
              key={exp._id}
              initial={{ opacity: 0, x: -40, rotateY: -15 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={viewportOnce}
              transition={{ delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative pl-12 sm:pl-16"
              style={{ perspective: 800 }}
            >
              <div
                className="absolute left-0 top-1 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent2))' }}
              >
                <Briefcase size={14} className="text-white" />
              </div>

              <motion.div
                className="glass rounded-2xl p-4 sm:p-6 transition-all duration-300"
                whileHover={{
                  scale: 1.02,
                  y: -4,
                  rotateX: 3,
                  boxShadow: '0 16px 45px rgba(var(--accent-rgb),0.18), 0 6px 20px rgba(0,0,0,0.12)',
                }}
                transition={{ type: 'spring', stiffness: 250, damping: 18 }}
                style={{ borderRadius: '1rem' }}
              >
                <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                  <h3 className="font-semibold text-base sm:text-lg" style={{ color: 'var(--color-text)' }}>
                    {exp.role}
                  </h3>
                  <span className="text-xs font-medium" style={{ color: 'var(--accent2)' }}>
                    {exp.startDate} — {exp.endDate}
                  </span>
                </div>
                <p className="text-sm flex items-center gap-1.5 mb-3 sm:mb-4" style={{ color: 'var(--color-muted)' }}>
                  {exp.company}
                  {exp.location && (
                    <><MapPin size={12} className="ml-1" /> {exp.location}</>
                  )}
                </p>
                <ul className="space-y-1.5 sm:space-y-2">
                  {(exp.description || []).map((d, idx) => (
                    <li key={idx} className="text-xs sm:text-sm leading-relaxed flex gap-2" style={{ color: 'var(--color-muted)' }}>
                      <span style={{ color: 'var(--accent)' }} className="mt-0.5 flex-shrink-0">•</span> {d}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Experience;
