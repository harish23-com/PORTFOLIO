export const Card = ({ title, children, actions }) => (
  <div
    className="rounded-2xl p-5 sm:p-6 mb-6 border"
    style={{
      background: 'var(--color-surface)',
      borderColor: 'var(--color-border)',
      boxShadow: 'var(--shadow-card)',
    }}
  >
    {(title || actions) && (
      <div className="flex items-center justify-between mb-5">
        {title && (
          <h2 className="font-semibold text-lg" style={{ color: 'var(--color-text)' }}>
            {title}
          </h2>
        )}
        {actions}
      </div>
    )}
    {children}
  </div>
);

export const Input = ({ label, ...props }) => (
  <div className="mb-4">
    {label && (
      <label className="block text-xs mb-1.5" style={{ color: 'var(--color-muted)' }}>
        {label}
      </label>
    )}
    <input
      {...props}
      className="w-full rounded-xl px-4 py-2.5 text-sm outline-none transition-colors"
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

export const TextArea = ({ label, ...props }) => (
  <div className="mb-4">
    {label && (
      <label className="block text-xs mb-1.5" style={{ color: 'var(--color-muted)' }}>
        {label}
      </label>
    )}
    <textarea
      {...props}
      className="w-full rounded-xl px-4 py-2.5 text-sm outline-none transition-colors resize-y"
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

export const Select = ({ label, children, ...props }) => (
  <div className="mb-4">
    {label && (
      <label className="block text-xs mb-1.5" style={{ color: 'var(--color-muted)' }}>
        {label}
      </label>
    )}
    <select
      {...props}
      className="w-full rounded-xl px-4 py-2.5 text-sm outline-none transition-colors"
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

export const Button = ({ children, variant = 'primary', ...props }) => {
  const baseClass = 'inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all disabled:opacity-60';

  if (variant === 'danger') {
    return (
      <button {...props} className={`${baseClass} text-red-400 hover:bg-red-500/20`}
        style={{ background: 'rgba(239,68,68,0.1)' }}>
        {children}
      </button>
    );
  }
  if (variant === 'secondary') {
    return (
      <button {...props} className={`${baseClass} hover:bg-white/5`}
        style={{ background: 'var(--glass-bg)', border: '1px solid var(--color-border)', color: 'var(--color-text)' }}>
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
