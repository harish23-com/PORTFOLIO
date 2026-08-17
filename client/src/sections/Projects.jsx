import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ExternalLink, Github, ArrowRight, X } from 'lucide-react';
import { useState, useRef } from 'react';
import { fadeUp, staggerContainer, viewportOnce } from '../hooks/useScrollReveal';

const TiltCard = ({ children }) => {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spring = { damping: 20, stiffness: 200 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), spring);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), spring);

  const onMouseMove = (e) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - r.left) / r.width - 0.5);
    mouseY.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onMouseLeave = () => {
    setHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onMouseLeave}
      style={{ perspective: 900, borderRadius: '1.5rem' }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          borderRadius: '1.5rem',
          boxShadow: hovered
            ? '0 24px 60px rgba(var(--accent-rgb),0.22), 0 8px 28px rgba(0,0,0,0.18)'
            : '0 2px 12px rgba(0,0,0,0.08)',
        }}
        animate={{ scale: hovered ? 1.03 : 1 }}
        transition={{ scale: { type: 'spring', stiffness: 300, damping: 20 } }}
      >
        {children}
      </motion.div>
    </div>
  );
};

const ProjectCard = ({ project, onOpen }) => {
  const [hovered, setHovered] = useState(false);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const ref = useRef(null);

  const onMouseMove = (e) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - r.left) / r.width);
    mouseY.set((e.clientY - r.top) / r.height);
  };

  return (
    <motion.div variants={fadeUp}>
      <TiltCard>
        <div
          ref={ref}
          className="rounded-3xl overflow-hidden group cursor-pointer glass"
          onClick={() => onOpen(project)}
          onMouseMove={onMouseMove}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => { setHovered(false); mouseX.set(0.5); mouseY.set(0.5); }}
          style={{
            border: '1px solid var(--color-border)',
            position: 'relative',
            borderColor: hovered ? 'rgba(var(--accent-rgb),0.45)' : 'var(--color-border)',
            transition: 'border-color 0.3s ease',
          }}
        >
          <motion.div
            style={{
              position: 'absolute', inset: 0, zIndex: 20, pointerEvents: 'none',
              background: `radial-gradient(circle at ${useTransform(mouseX, [0, 1], ['20%', '80%']).get()} ${useTransform(mouseY, [0, 1], ['20%', '80%']).get()}, rgba(255,255,255,0.10) 0%, transparent 55%)`,
              opacity: hovered ? 1 : 0,
              transition: 'opacity 0.3s ease',
            }}
          />

          <div
            className="h-40 sm:h-44 flex items-center justify-center relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, rgba(var(--accent-rgb),0.3), rgba(var(--accent2-rgb),0.2))' }}
          >
            <p
              className="font-display font-bold text-xl sm:text-2xl select-none group-hover:scale-110 transition-transform duration-500"
              style={{ color: 'rgba(255,255,255,0.2)' }}
            >
              {project.title.split(' ').slice(0, 2).join(' ')}
            </p>
            <motion.div
              className="absolute w-20 h-20 rounded-full blur-2xl pointer-events-none"
              style={{ background: 'rgba(var(--accent-rgb),0.5)' }}
              animate={{ x: ['-40%', '90%', '-40%'], y: ['-20%', '70%', '-20%'], scale: [1, 1.4, 1] }}
              transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
            />
            {project.featured && (
              <span
                className="absolute top-3 right-3 text-[10px] uppercase tracking-wider px-2 py-1 rounded-full text-white z-10"
                style={{ background: 'rgba(var(--accent-rgb),0.9)' }}
              >
                Featured
              </span>
            )}
          </div>

          <div className="p-5 sm:p-6">
            <h3 className="font-semibold text-base sm:text-lg mb-2" style={{ color: 'var(--color-text)' }}>
              {project.title}
            </h3>
            <p className="text-xs sm:text-sm leading-relaxed line-clamp-2 mb-3 sm:mb-4" style={{ color: 'var(--color-muted)' }}>
              {project.description}
            </p>
            <div className="flex flex-wrap gap-1.5 mb-3 sm:mb-4">
              {(project.technologies || []).slice(0, 4).map((t) => (
                <span key={t} className="text-[11px] px-2 py-0.5 rounded-full"
                  style={{ background: 'var(--glass-bg)', border: '1px solid var(--color-border)', color: 'var(--accent2)' }}>
                  {t}
                </span>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex gap-3">
                {project.liveDemo && (
                  <a href={project.liveDemo} target="_blank" rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="transition-colors"
                    style={{ color: 'var(--color-muted)' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-muted)'}>
                    <ExternalLink size={15} />
                  </a>
                )}
                {project.github && (
                  <a href={project.github} target="_blank" rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="transition-colors"
                    style={{ color: 'var(--color-muted)' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-muted)'}>
                    <Github size={15} />
                  </a>
                )}
              </div>
              <motion.span
                className="text-xs flex items-center gap-1"
                style={{ color: 'var(--accent)' }}
                whileHover={{ x: 3 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                Details <ArrowRight size={12} />
              </motion.span>
            </div>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
};

const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 60, scale: 0.92 }}
          transition={{ type: 'spring', damping: 22, stiffness: 220 }}
          onClick={(e) => e.stopPropagation()}
          className="glass rounded-t-3xl sm:rounded-3xl w-full sm:max-w-2xl max-h-[90vh] sm:max-h-[85vh] overflow-y-auto p-6 sm:p-8 relative"
          style={{ background: 'var(--color-surface)' }}
        >
          <button onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 glass rounded-full flex items-center justify-center"
            style={{ color: 'var(--color-muted)' }}>
            <X size={16} />
          </button>
          <h3 className="text-xl sm:text-2xl font-bold mb-2 pr-10" style={{ color: 'var(--color-text)' }}>{project.title}</h3>
          <div className="flex flex-wrap gap-1.5 mb-4 sm:mb-5">
            {(project.technologies || []).map((t) => (
              <span key={t} className="text-xs px-2.5 py-1 rounded-full"
                style={{ background: 'var(--glass-bg)', border: '1px solid var(--color-border)', color: 'var(--accent2)' }}>{t}</span>
            ))}
          </div>
          <p className="leading-relaxed mb-4 sm:mb-5 text-sm sm:text-base" style={{ color: 'var(--color-muted)' }}>{project.description}</p>
          {project.features?.length > 0 && (
            <div className="mb-4 sm:mb-5">
              <p className="font-medium text-sm mb-2" style={{ color: 'var(--color-text)' }}>Key Features</p>
              <ul className="space-y-1.5">
                {project.features.map((f, i) => (
                  <li key={i} className="text-sm flex gap-2" style={{ color: 'var(--color-muted)' }}>
                    <span style={{ color: 'var(--accent)' }}>•</span> {f}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {project.challenges && (
            <div className="mb-4 sm:mb-5">
              <p className="font-medium text-sm mb-2" style={{ color: 'var(--color-text)' }}>Challenges</p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>{project.challenges}</p>
            </div>
          )}
          {project.learnings && (
            <div className="mb-5 sm:mb-6">
              <p className="font-medium text-sm mb-2" style={{ color: 'var(--color-text)' }}>Learnings</p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>{project.learnings}</p>
            </div>
          )}
          <div className="flex gap-3 flex-wrap">
            {project.liveDemo && (
              <a href={project.liveDemo} target="_blank" rel="noreferrer" className="btn-primary text-xs sm:text-sm">
                <ExternalLink size={14} /> Live Demo
              </a>
            )}
            {project.github && (
              <a href={project.github} target="_blank" rel="noreferrer" className="btn-outline text-xs sm:text-sm">
                <Github size={14} /> GitHub
              </a>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const Projects = ({ projects }) => {
  const [selected, setSelected] = useState(null);

  return (
    <section
      id="projects"
      className="py-20 sm:py-28 relative overflow-hidden"
      style={{
        background: 'var(--color-surface2)',
        borderTop: '1px solid var(--color-border)',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      <div className="section-container">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce} className="text-center mb-10 sm:mb-14">
          <p className="section-heading-badge">Selected work</p>
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold"
            style={{ color: 'var(--color-text)' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            Featured <span className="gradient-text">Projects</span>
          </motion.h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
        >
          {(projects || []).map((project) => (
            <ProjectCard key={project._id} project={project} onOpen={setSelected} />
          ))}
        </motion.div>
      </div>
      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
};

export default Projects;
