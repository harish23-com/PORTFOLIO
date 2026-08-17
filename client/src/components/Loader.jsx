import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogoEmblem } from './Logo';
import api from '../api/axios';

const parseName = (rawName) => {
  if (!rawName) return { firstInitial: 'H', secondInitial: 'K', firstName: 'HARISH', lastName: 'KUMAR' };

  const cleaned = rawName
    .replace(/[|•–—].*$/, '')
    .replace(/portfolio/gi, '')
    .trim();

  const words = cleaned.split(/\s+/).filter(Boolean);

  if (words.length >= 2) {
    const firstWord = words[0].toUpperCase();
    const secondWord = words[words.length - 1].toUpperCase();
    return {
      firstInitial: firstWord[0] || 'H',
      secondInitial: secondWord[0] || 'K',
      firstName: firstWord,
      lastName: words.slice(1).join(' ').toUpperCase(),
    };
  }

  if (words.length === 1) {
    const word = words[0].toUpperCase();
    return {
      firstInitial: word[0] || 'H',
      secondInitial: word[1] || 'K',
      firstName: word,
      lastName: '',
    };
  }

  return { firstInitial: 'H', secondInitial: 'K', firstName: 'HARISH', lastName: 'KUMAR' };
};

const Loader = ({ show, name: propName }) => {
  const [siteName, setSiteName] = useState(propName || 'Harish Kumar');

  useEffect(() => {
    if (!propName) {
      api.get('/settings')
        .then((res) => {
          if (res.data.data?.siteName) {
            setSiteName(res.data.data.siteName);
          }
        })
        .catch(() => {});
    }
  }, [propName]);

  const { firstInitial, secondInitial, firstName, lastName } = useMemo(
    () => parseName(siteName),
    [siteName]
  );

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden select-none"
          style={{ background: 'var(--color-base)' }}
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.05,
            filter: 'blur(10px)',
          }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
            <motion.div
              className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full blur-[100px] opacity-30"
              style={{ background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)' }}
              animate={{
                scale: [1, 1.25, 1],
                opacity: [0.25, 0.45, 0.25],
              }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute w-60 h-60 sm:w-80 sm:h-80 rounded-full blur-[90px] opacity-25"
              style={{ background: 'radial-gradient(circle, var(--accent2) 0%, transparent 70%)' }}
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
            />
          </div>

          <div className="relative z-10 flex flex-col items-center gap-6 sm:gap-7">
            <div className="relative flex items-center justify-center">
              <motion.div
                className="absolute -inset-4 sm:-inset-5 rounded-full border border-dashed"
                style={{ borderColor: 'rgba(var(--accent-rgb), 0.35)' }}
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
              />

              <motion.div
                className="absolute -inset-2 rounded-full border-2"
                style={{
                  borderColor: 'transparent',
                  borderTopColor: 'var(--accent)',
                  borderRightColor: 'var(--accent2)',
                }}
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1.6, ease: 'linear' }}
              />

              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="relative p-3 rounded-full glass shadow-2xl"
                style={{
                  boxShadow: '0 0 40px rgba(var(--accent-rgb), 0.35)',
                  borderColor: 'rgba(var(--accent-rgb), 0.4)',
                }}
              >
                <LogoEmblem firstInitial={firstInitial} secondInitial={secondInitial} size={56} />
              </motion.div>
            </div>

            <div className="flex flex-col items-center text-center gap-1.5 px-4">
              <motion.h2
                className="font-display font-bold text-base sm:text-lg tracking-[0.2em] uppercase"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <span style={{ color: 'var(--color-text)' }}>{firstName}</span>{' '}
                <span className="gradient-text">{lastName}</span>
              </motion.h2>

              <motion.p
                className="text-[10px] sm:text-xs font-semibold tracking-[0.35em] uppercase opacity-75"
                style={{ color: 'var(--accent2)' }}
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
              >
                PORTFOLIO • INITIALIZING
              </motion.p>
            </div>

            <div className="w-44 sm:w-56 h-1 rounded-full bg-white/10 overflow-hidden relative border border-white/5">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: 'linear-gradient(90deg, var(--accent), var(--accent2), #ffffff)',
                  boxShadow: '0 0 12px var(--accent)',
                }}
                initial={{ width: '0%' }}
                animate={{ width: ['0%', '70%', '100%'] }}
                transition={{
                  duration: 1.4,
                  ease: [0.65, 0, 0.35, 1],
                  repeat: Infinity,
                }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
