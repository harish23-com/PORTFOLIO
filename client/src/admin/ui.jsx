import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertTriangle } from 'lucide-react';

export const Card = ({ title, children, actions, className = '' }) => (
  <div
    className={`rounded-2xl p-4 sm:p-6 mb-5 sm:mb-6 border transition-all ${className}`}
    style={{
      background: 'var(--color-surface)',
      borderColor: 'var(--color-border)',
      boxShadow: 'var(--shadow-card)',
    }}
  >
    {(title || actions) && (
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 mb-4 sm:mb-5">
        {title && (
          <h2 className="font-semibold text-base sm:text-lg" style={{ color: 'var(--color-text)' }}>
            {title}
          </h2>
        )}
        {actions && <div className="flex items-center gap-2 flex-wrap">{actions}</div>}
      </div>
    )}
    {children}
  </div>
);

export const Input = ({ label, className = '', ...props }) => (
  <div className="mb-3.5 sm:mb-4">
    {label && (
      <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--color-muted)' }}>
        {label}
      </label>
    )}
    <input
      {...props}
      className={`w-full rounded-xl px-3.5 sm:px-4 py-2 sm:py-2.5 text-sm outline-none transition-colors ${className}`}
      style={{
        background: 'var(--input-bg)',
        border: '1px solid var(--input-border)',
        color: 'var(--color-text)',
      }}
      onFocus={(e) => { e.target.style.borderColor = 'rgba(var(--accent-rgb),0.6)'; }}
      onBlur={(e) => { e.target.style.borderColor = 'var(--input-border)'; }}
    />
  </div>
);

export const TextArea = ({ label, className = '', ...props }) => (
  <div className="mb-3.5 sm:mb-4">
    {label && (
      <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--color-muted)' }}>
        {label}
      </label>
    )}
    <textarea
      {...props}
      className={`w-full rounded-xl px-3.5 sm:px-4 py-2 sm:py-2.5 text-sm outline-none transition-colors resize-y ${className}`}
      style={{
        background: 'var(--input-bg)',
        border: '1px solid var(--input-border)',
        color: 'var(--color-text)',
      }}
      onFocus={(e) => { e.target.style.borderColor = 'rgba(var(--accent-rgb),0.6)'; }}
      onBlur={(e) => { e.target.style.borderColor = 'var(--input-border)'; }}
    />
  </div>
);

export const Select = ({ label, children, className = '', ...props }) => (
  <div className="mb-3.5 sm:mb-4">
    {label && (
      <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--color-muted)' }}>
        {label}
      </label>
    )}
    <select
      {...props}
      className={`w-full rounded-xl px-3.5 sm:px-4 py-2 sm:py-2.5 text-sm outline-none transition-colors ${className}`}
      style={{
        background: 'var(--input-bg)',
        border: '1px solid var(--input-border)',
        color: 'var(--color-text)',
      }}
    >
      {children}
    </select>
  </div>
);

export const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseClass = `inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all disabled:opacity-50 select-none ${className}`;

  if (variant === 'danger') {
    return (
      <button
        {...props}
        className={`${baseClass} text-red-400 hover:bg-red-500/20`}
        style={{ background: 'rgba(239,68,68,0.1)' }}
      >
        {children}
      </button>
    );
  }
  if (variant === 'secondary') {
    return (
      <button
        {...props}
        className={`${baseClass} hover:bg-white/5`}
        style={{
          background: 'var(--glass-bg)',
          border: '1px solid var(--color-border)',
          color: 'var(--color-text)',
        }}
      >
        {children}
      </button>
    );
  }
  return (
    <button
      {...props}
      className={`${baseClass} text-white`}
      style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent2))' }}
    >
      {children}
    </button>
  );
};

export const Modal = ({ isOpen, onClose, title, children, maxWidth = 'max-w-xl' }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={`relative w-full ${maxWidth} rounded-2xl sm:rounded-3xl border shadow-2xl overflow-hidden z-10 my-auto`}
            style={{
              background: 'var(--color-surface)',
              borderColor: 'var(--color-border)',
            }}
          >
            <div className="p-4 sm:p-5 border-b flex items-center justify-between gap-3" style={{ borderColor: 'var(--color-border)' }}>
              <h3 className="font-bold text-base sm:text-lg truncate" style={{ color: 'var(--color-text)' }}>
                {title}
              </h3>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-white/10 flex-shrink-0"
                style={{ color: 'var(--color-muted)' }}
                aria-label="Close dialog"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-4 sm:p-6 max-h-[75vh] overflow-y-auto">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export const ConfirmModal = ({ isOpen, onClose, onConfirm, title = 'Confirm Delete', message = 'Are you sure you want to delete this item? This action cannot be undone.', confirmText = 'Delete', loading = false }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} maxWidth="max-w-md">
      <div className="flex items-start gap-3.5 mb-5">
        <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center flex-shrink-0 text-red-400">
          <AlertTriangle size={20} />
        </div>
        <p className="text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>
          {message}
        </p>
      </div>

      <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-2.5 pt-3 border-t" style={{ borderColor: 'var(--color-border)' }}>
        <Button variant="secondary" onClick={onClose} disabled={loading} className="w-full sm:w-auto">
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm} disabled={loading} className="w-full sm:w-auto">
          {loading ? 'Deleting...' : confirmText}
        </Button>
      </div>
    </Modal>
  );
};

export const LoadingCard = ({ text = 'Loading data...' }) => (
  <div
    className="p-10 sm:p-14 text-center glass rounded-2xl border flex flex-col items-center justify-center gap-3.5 my-4"
    style={{ borderColor: 'var(--color-border)' }}
  >
    <div className="relative flex items-center justify-center">
      <div
        className="w-10 h-10 rounded-full border-2 border-t-transparent animate-spin"
        style={{ borderColor: 'rgba(var(--accent-rgb), 0.2)', borderTopColor: 'var(--accent)' }}
      />
      <div
        className="absolute w-5 h-5 rounded-full border-2 border-b-transparent animate-spin"
        style={{
          borderColor: 'rgba(var(--accent2-rgb), 0.3)',
          borderBottomColor: 'var(--accent2)',
          animationDirection: 'reverse',
          animationDuration: '0.8s',
        }}
      />
    </div>
    <p className="text-[11px] sm:text-xs font-semibold tracking-widest uppercase opacity-80" style={{ color: 'var(--color-muted)' }}>
      {text}
    </p>
  </div>
);
