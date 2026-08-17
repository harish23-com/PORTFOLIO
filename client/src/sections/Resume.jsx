import { motion } from 'framer-motion';
import { Download, FileText } from 'lucide-react';
import api from '../api/axios';
import { fadeUp, viewportOnce } from '../hooks/useScrollReveal';

const Resume = ({ hero }) => {
  if (!hero?.resumeFile) return null;

  const handleDownload = async () => {
    try {
      await api.post('/resume/track-download');
    } catch {}
    window.open(hero.resumeFile, '_blank');
  };

  return (
    <section id="resume" className="py-16 sm:py-24">
      <div className="section-container">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce} className="glass rounded-3xl p-8 sm:p-10 md:p-14 text-center max-w-3xl mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-accent2 flex items-center justify-center mx-auto mb-6">
            <FileText size={26} className="text-white" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: 'var(--color-text)' }}>My <span className="gradient-text">Resume</span></h2>
          <p className="mb-6 sm:mb-8 text-sm sm:text-base" style={{ color: 'var(--color-muted)' }}>Get a complete overview of my experience, skills and education.</p>
          <button onClick={handleDownload} className="btn-primary mx-auto">
            <Download size={16} /> Download Resume
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Resume;
