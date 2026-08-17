import { useId, useMemo } from 'react';
import { useTheme } from '../context/ThemeContext';

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

export const LogoEmblem = ({
  firstInitial = 'H',
  secondInitial = 'K',
  size = 40,
  className = '',
}) => {
  const uid = useId().replace(/:/g, '');
  let isLight = false;
  try {
    const theme = useTheme();
    isLight = theme?.mode === 'light';
  } catch {}

  const orbitId = `${uid}-orbit`;
  const firstLetterId = `${uid}-first`;
  const secondLetterId = `${uid}-second`;
  const swooshId = `${uid}-swoosh`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`flex-shrink-0 transition-transform duration-300 group-hover:scale-105 ${className}`}
    >
      <defs>
        {isLight ? (
          <>
            <linearGradient id={orbitId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0f172a" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#0284c7" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#00d9c0" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id={firstLetterId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#334155" />
            </linearGradient>
            <linearGradient id={secondLetterId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0284c7" />
              <stop offset="100%" stopColor="#0ea5e9" />
            </linearGradient>
            <linearGradient id={swooshId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0284c7" />
              <stop offset="50%" stopColor="#00d9c0" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
          </>
        ) : (
          <>
            <linearGradient id={orbitId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
              <stop offset="40%" stopColor="#00d9c0" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id={firstLetterId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#cbd5e1" />
            </linearGradient>
            <linearGradient id={secondLetterId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00f2fe" />
              <stop offset="50%" stopColor="#00d9c0" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>
            <linearGradient id={swooshId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00d9c0" />
              <stop offset="50%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#38bdf8" />
            </linearGradient>
          </>
        )}
      </defs>

      <circle
        cx="100"
        cy="100"
        r="88"
        stroke={`url(#${orbitId})`}
        strokeWidth={isLight ? "4" : "3"}
        strokeLinecap="round"
        strokeDasharray="460 80"
        opacity={isLight ? "0.95" : "0.9"}
      />

      <text
        x="64"
        y="142"
        fontFamily="serif"
        fontSize="108"
        fontWeight="900"
        fill={isLight ? "#0f172a" : `url(#${firstLetterId})`}
        textAnchor="middle"
        style={{
          letterSpacing: '-2px',
        }}
      >
        {firstInitial}
      </text>

      <text
        x="136"
        y="142"
        fontFamily="serif"
        fontSize="108"
        fontWeight="900"
        fill={isLight ? "#0284c7" : `url(#${secondLetterId})`}
        textAnchor="middle"
        style={{
          letterSpacing: '-2px',
        }}
      >
        {secondInitial}
      </text>

      <path
        d="M 38 106 C 58 126, 95 110, 120 90 C 145 70, 168 96, 172 108 C 158 92, 132 82, 108 96 C 80 112, 54 118, 38 106 Z"
        fill={`url(#${swooshId})`}
        opacity={isLight ? "1" : "0.95"}
      />
    </svg>
  );
};

const Logo = ({
  siteName = 'Harish Kumar',
  subtitle = 'FULL STACK DEVELOPER',
  tagline = 'CODE • BUILD • CREATE',
  variant = 'navbar',
  size = 38,
  showText = true,
  className = '',
}) => {
  const { firstInitial, secondInitial, firstName, lastName } = useMemo(
    () => parseName(siteName),
    [siteName]
  );

  if (variant === 'badge') {
    return (
      <div className={`flex flex-col items-center text-center group select-none max-w-full ${className}`}>
        <LogoEmblem firstInitial={firstInitial} secondInitial={secondInitial} size={size} />
        
        <div className="mt-3 max-w-full px-2">
          <h2 className="font-display font-black text-base sm:text-lg md:text-xl tracking-wider uppercase break-words">
            <span style={{ color: 'var(--color-text)' }}>{firstName}</span>{' '}
            <span className="gradient-text">{lastName}</span>
          </h2>
          
          {subtitle && (
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-1">
              <span className="h-px w-4 sm:w-8 bg-gradient-to-r from-transparent to-[var(--accent2)]" />
              <p className="text-[9px] sm:text-[11px] font-semibold tracking-[0.2em] text-[var(--accent2)] uppercase truncate">
                {subtitle}
              </p>
              <span className="h-px w-4 sm:w-8 bg-gradient-to-l from-transparent to-[var(--accent2)]" />
            </div>
          )}

          {tagline && (
            <p className="text-[8px] sm:text-[9px] tracking-[0.25em] uppercase opacity-70 mt-0.5 font-medium" style={{ color: 'var(--color-muted)' }}>
              {tagline}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-2.5 sm:gap-3 group select-none min-w-0 ${className}`}>
      <LogoEmblem firstInitial={firstInitial} secondInitial={secondInitial} size={size} />

      {showText && (
        <div className="flex flex-col min-w-0 text-left">
          <span className="font-display font-bold text-sm sm:text-base tracking-wide uppercase leading-tight truncate">
            <span style={{ color: 'var(--color-text)' }}>{firstName}</span>{' '}
            <span className="gradient-text">{lastName}</span>
          </span>
          {subtitle && (
            <span className="text-[8px] sm:text-[10px] font-semibold tracking-[0.18em] text-[var(--accent2)] uppercase leading-none mt-0.5 truncate">
              {subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default Logo;
