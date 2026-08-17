import { motion, AnimatePresence } from 'framer-motion';

const Loader = ({ show }) => (
  <AnimatePresence>
    {show && (
      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center"
        style={{ background: 'var(--color-base)' }}
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      >
        <div className="flex flex-col items-center gap-4">
          <motion.div
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2"
            style={{ borderColor: 'rgba(var(--accent-rgb),0.3)', borderTopColor: 'var(--accent)' }}
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
          />
          <motion.p
            className="text-xs sm:text-sm tracking-[0.3em] uppercase"
            style={{ color: 'var(--color-muted)' }}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            Loading
          </motion.p>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default Loader;
