import { motion } from 'framer-motion';

const PremiumBackground = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
    <motion.div
      className="absolute rounded-full blur-[130px]"
      style={{
        width: 700,
        height: 700,
        top: '-15%',
        left: '-10%',
        background: 'radial-gradient(circle, rgba(124,92,255,0.28) 0%, rgba(124,92,255,0.08) 50%, transparent 70%)',
        animation: 'aurora-move-1 18s ease-in-out infinite',
      }}
    />

    <motion.div
      className="absolute rounded-full blur-[150px]"
      style={{
        width: 600,
        height: 600,
        top: '-5%',
        right: '-8%',
        background: 'radial-gradient(circle, rgba(0,217,192,0.22) 0%, rgba(0,217,192,0.06) 50%, transparent 70%)',
        animation: 'aurora-move-2 22s ease-in-out infinite',
      }}
    />

    <motion.div
      className="absolute rounded-full blur-[200px]"
      style={{
        width: 500,
        height: 500,
        top: '35%',
        left: '30%',
        background: 'radial-gradient(circle, rgba(124,92,255,0.12) 0%, transparent 65%)',
        animation: 'aurora-move-3 28s ease-in-out infinite',
      }}
    />

    <motion.div
      className="absolute rounded-full blur-[140px]"
      style={{
        width: 550,
        height: 550,
        bottom: '-10%',
        left: '-5%',
        background: 'radial-gradient(circle, rgba(255,107,157,0.15) 0%, rgba(124,92,255,0.08) 40%, transparent 70%)',
        animation: 'aurora-move-2 25s ease-in-out infinite reverse',
      }}
    />

    <motion.div
      className="absolute rounded-full blur-[160px]"
      style={{
        width: 500,
        height: 500,
        bottom: '-8%',
        right: '-5%',
        background: 'radial-gradient(circle, rgba(0,217,192,0.18) 0%, transparent 65%)',
        animation: 'aurora-move-1 20s ease-in-out infinite reverse',
      }}
    />

    <div
      className="absolute inset-0"
      style={{
        background: 'radial-gradient(ellipse 85% 85% at 50% 50%, transparent 50%, var(--color-base) 100%)',
        pointerEvents: 'none',
      }}
    />

    <motion.div
      className="absolute left-0 right-0 h-px opacity-[0.04]"
      style={{ background: 'linear-gradient(90deg, transparent, var(--accent), transparent)' }}
      animate={{ top: ['10%', '90%', '10%'] }}
      transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
    />
  </div>
);

export default PremiumBackground;
