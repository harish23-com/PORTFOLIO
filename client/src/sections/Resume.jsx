import { motion } from 'framer-motion';
import { Download, FileText, ExternalLink } from 'lucide-react';
import { fadeUp, viewportOnce } from '../hooks/useScrollReveal';
import { getResumeDownloadUrl, getResumeViewUrl } from '../utils/resume';

const Resume = ({ hero }) => {
  if (!hero?.resumeFile) return null;

  return (
    <section id="resume" className="py-16 sm:py-24">
      <div className="section-container">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="glass rounded-3xl p-8 sm:p-10 md:p-14 text-center max-w-3xl mx-auto"
        >
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-accent2 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-purple-500/20">
            <FileText size={28} className="text-white" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: 'var(--color-text)' }}>
            My <span className="gradient-text">Resume</span>
          </h2>
          <p className="mb-6 sm:mb-8 text-sm sm:text-base max-w-lg mx-auto" style={{ color: 'var(--color-muted)' }}>
            Get a complete overview of my experience, projects, skills and educational background.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3.5">
            <a
              href={getResumeDownloadUrl()}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="btn-primary inline-flex items-center gap-2"
            >
              <Download size={16} /> Download Resume
            </a>
            <a
              href={getResumeViewUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline inline-flex items-center gap-2"
            >
              <ExternalLink size={16} /> View in Browser
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Resume;
