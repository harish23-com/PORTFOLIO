import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, Award, Globe, Heart, MapPin, Mail, Phone } from 'lucide-react';
import { fadeUp, viewportOnce } from '../hooks/useScrollReveal';

const typeIcon = { education: GraduationCap, experience: Briefcase, achievement: Award };

const Hover3D = ({ children, className = '' }) => (
  <motion.div
    className={className}
    whileHover={{
      scale: 1.03,
      y: -6,
      rotateX: 3,
      boxShadow: '0 20px 50px rgba(var(--accent-rgb),0.16), 0 6px 20px rgba(0,0,0,0.1)',
    }}
    transition={{ type: 'spring', stiffness: 280, damping: 18 }}
    style={{ borderRadius: '1rem' }}
  >
    {children}
  </motion.div>
);

const About = ({ about }) => {
  if (!about) return null;

  return (
    <section id="about" className="py-20 sm:py-28 relative" style={{ borderTop: '1px solid var(--color-border)' }}>
      <div className="section-container">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce} className="text-center mb-12 sm:mb-16">
          <p className="section-heading-badge">Get to know me</p>
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold"
            style={{ color: 'var(--color-text)' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            About <span className="gradient-text">Me</span>
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 sm:gap-12 mb-14 sm:mb-20">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce} className="lg:col-span-3">
            <p className="leading-relaxed text-base sm:text-lg mb-6 sm:mb-8" style={{ color: 'var(--color-muted)' }}>
              {about.bio}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {about.personalInfo?.location && (
                <motion.div className="flex items-center gap-3 text-sm" whileHover={{ x: 4 }} transition={{ type: 'spring', stiffness: 300 }}>
                  <MapPin size={16} style={{ color: 'var(--accent)' }} />
                  <span style={{ color: 'var(--color-muted)' }}>{about.personalInfo.location}</span>
                </motion.div>
              )}
              {about.personalInfo?.email && (
                <motion.div className="flex items-center gap-3 text-sm" whileHover={{ x: 4 }} transition={{ type: 'spring', stiffness: 300 }}>
                  <Mail size={16} style={{ color: 'var(--accent)' }} />
                  <span style={{ color: 'var(--color-muted)' }} className="break-all">{about.personalInfo.email}</span>
                </motion.div>
              )}
              {about.personalInfo?.phone && (
                <motion.div className="flex items-center gap-3 text-sm" whileHover={{ x: 4 }} transition={{ type: 'spring', stiffness: 300 }}>
                  <Phone size={16} style={{ color: 'var(--accent)' }} />
                  <span style={{ color: 'var(--color-muted)' }}>{about.personalInfo.phone}</span>
                </motion.div>
              )}
              {about.personalInfo?.nationality && (
                <motion.div className="flex items-center gap-3 text-sm" whileHover={{ x: 4 }} transition={{ type: 'spring', stiffness: 300 }}>
                  <Globe size={16} style={{ color: 'var(--accent)' }} />
                  <span style={{ color: 'var(--color-muted)' }}>{about.personalInfo.nationality}</span>
                </motion.div>
              )}
            </div>

            {about.languages?.length > 0 && (
              <div className="mt-6 sm:mt-8">
                <p className="text-sm font-medium mb-3" style={{ color: 'var(--color-text)' }}>Languages</p>
                <div className="flex flex-wrap gap-2">
                  {about.languages.map((lang) => (
                    <motion.span
                      key={lang.name}
                      className="glass px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs"
                      style={{ color: 'var(--color-text)' }}
                      whileHover={{ scale: 1.08, y: -2 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      {lang.name} <span style={{ color: 'var(--color-muted)' }}>· {lang.level}</span>
                    </motion.span>
                  ))}
                </div>
              </div>
            )}

            {about.interests?.length > 0 && (
              <div className="mt-5 sm:mt-6">
                <p className="text-sm font-medium mb-3 flex items-center gap-2" style={{ color: 'var(--color-text)' }}>
                  <Heart size={14} style={{ color: 'var(--accent)' }} /> Strengths
                </p>
                <div className="flex flex-wrap gap-2">
                  {about.interests.map((interest, i) => (
                    <motion.span
                      key={interest}
                      className="px-3 py-1.5 rounded-full text-xs"
                      style={{ background: 'var(--glass-bg)', color: 'var(--color-muted)', border: '1px solid var(--color-border)' }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={viewportOnce}
                      transition={{ delay: i * 0.05, type: 'spring', stiffness: 300 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                    >
                      {interest}
                    </motion.span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}
            className="lg:col-span-2"
            style={{ perspective: 900 }}
          >
            <motion.div
              className="glass rounded-3xl p-6 sm:p-8 h-full"
              whileHover={{ rotateY: -4, rotateX: 2, scale: 1.01, boxShadow: '0 16px 45px rgba(var(--accent-rgb),0.15)' }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              style={{ borderRadius: '1.5rem' }}
            >
              <p className="text-sm font-medium mb-5 sm:mb-6" style={{ color: 'var(--color-text)' }}>Career Timeline</p>
              <div className="space-y-5 sm:space-y-6">
                {(about.timeline || []).map((item, i) => {
                  const Icon = typeIcon[item.type] || Briefcase;
                  return (
                    <motion.div
                      key={i}
                      className="flex gap-3 sm:gap-4"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={viewportOnce}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                    >
                      <motion.div
                        className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent2))' }}
                        whileHover={{ scale: 1.2, rotateZ: 10 }}
                        transition={{ type: 'spring', stiffness: 400 }}
                      >
                        <Icon size={14} className="text-white" />
                      </motion.div>
                      <div>
                        <p className="text-xs font-medium" style={{ color: 'var(--accent2)' }}>{item.year}</p>
                        <p className="font-medium text-sm mt-0.5" style={{ color: 'var(--color-text)' }}>{item.title}</p>
                        <p className="text-xs mt-1 leading-relaxed" style={{ color: 'var(--color-muted)' }}>{item.description}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {about.achievements?.length > 0 && (
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
            <p className="text-sm font-medium mb-4 flex items-center gap-2" style={{ color: 'var(--color-text)' }}>
              <Award size={16} style={{ color: 'var(--accent)' }} /> Achievements
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {about.achievements.map((a, i) => (
                <Hover3D key={i}>
                  <div className="glass rounded-2xl p-4 sm:p-5">
                    <p className="font-medium text-sm" style={{ color: 'var(--color-text)' }}>{a.title}</p>
                    <p className="text-xs mt-1" style={{ color: 'var(--color-muted)' }}>{a.description}</p>
                  </div>
                </Hover3D>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default About;
