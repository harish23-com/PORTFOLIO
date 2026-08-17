import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { fadeUp, viewportOnce } from '../hooks/useScrollReveal';

const categories = ['Frontend', 'Backend', 'Database', 'Programming Languages', 'Authentication', 'API Development', 'Version Control', 'Tools'];

const SkillBar = ({ skill, index }) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setInView(true),
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ perspective: 700, borderRadius: '1rem' }}
    >
      <motion.div
        className="glass rounded-2xl p-4 relative overflow-hidden"
        animate={{
          scale: hovered ? 1.04 : 1,
          rotateY: hovered ? 4 : 0,
          boxShadow: hovered
            ? '0 14px 40px rgba(var(--accent-rgb),0.18), 0 4px 16px rgba(0,0,0,0.12)'
            : '0 2px 8px rgba(0,0,0,0.05)',
        }}
        transition={{ type: 'spring', stiffness: 280, damping: 18 }}
        style={{ borderRadius: '1rem' }}
      >
        <motion.div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)',
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.3s ease',
          }}
        />

        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>{skill.name}</p>
          <motion.p
            className="text-xs font-bold"
            style={{ color: 'var(--accent2)' }}
            animate={{ scale: hovered ? 1.15 : 1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            {skill.level}%
          </motion.p>
        </div>

        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--color-border)' }}>
          <motion.div
            className="h-full rounded-full"
            style={{ background: 'linear-gradient(90deg, var(--accent), var(--accent2))' }}
            initial={{ width: 0 }}
            animate={{ width: inView ? `${skill.level}%` : 0 }}
            transition={{ duration: 1.2, ease: 'easeOut', delay: index * 0.05 }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

const Skills = ({ skills }) => {
  const [active, setActive] = useState('Frontend');

  const grouped = categories.reduce((acc, cat) => {
    acc[cat] = (skills || []).filter((s) => s.category === cat);
    return acc;
  }, {});
  const visible = categories.filter((c) => grouped[c]?.length > 0);

  useEffect(() => {
    if (visible.length > 0 && !visible.includes(active)) {
      setActive(visible[0]);
    }
  }, [skills]);

  return (
    <section id="skills" className="py-16 sm:py-24">
      <div className="section-container">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce} className="text-center mb-10 sm:mb-14">
          <p className="section-heading-badge">What I work with</p>
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold"
            style={{ color: 'var(--color-text)' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            My <span className="gradient-text">Skills</span>
          </motion.h2>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="flex gap-2 mb-8 sm:mb-12 overflow-x-auto pb-2 sm:flex-wrap sm:justify-center scrollbar-hide"
        >
          {visible.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setActive(cat)}
              className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap flex-shrink-0"
              style={
                active === cat
                  ? { background: 'linear-gradient(135deg, var(--accent), var(--accent2))', color: '#ffffff' }
                  : { background: 'var(--glass-bg)', border: '1px solid var(--color-border)', color: 'var(--color-muted)' }
              }
              whileHover={{ scale: 1.07, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, rotateY: -20, scale: 0.96 }}
            animate={{ opacity: 1, rotateY: 0, scale: 1 }}
            exit={{ opacity: 0, rotateY: 20, scale: 0.96 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"
            style={{ perspective: 900 }}
          >
            {(grouped[active] || []).map((skill, i) => (
              <SkillBar key={skill._id} skill={skill} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Skills;
