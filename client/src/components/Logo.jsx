import { useMemo } from 'react';
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
  let isLight = false;
  try {
    const theme = useTheme();
    isLight = theme?.mode === 'light';
  } catch {}

  const orbitId = isLight ? 'orbitGlowLight' : 'orbitGlowDark';
  const firstLetterId = isLight ? 'firstLetterGradLight' : 'firstLetterGradDark';
  const secondLetterId = isLight ? 'secondLetterGradLight' : 'secondLetterGradDark';
  const swooshId = isLight ? 'swooshGradLight' : 'swooshGradDark';

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
        {/* Dark Mode Gradients */}
        <linearGradient id="orbitGlowDark" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="40%" stopColor="#00d9c0" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.3" />
        </linearGradient>

        <linearGradient id="firstLetterGradDark" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="50%" stopColor="#f1f5f9" />
          <stop offset="100%" stopColor="#cbd5e1" />
        </linearGradient>

        <linearGradient id="secondLetterGradDark" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00f2fe" />
          <stop offset="50%" stopColor="#00d9c0" />
          <stop offset="100%" stopColor="#2563eb" />
        </linearGradient>

        <linearGradient id="swooshGradDark" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00d9c0" />
          <stop offset="50%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#38bdf8" />
        </linearGradient>

        {/* Light Mode Gradients - High Contrast */}
        <linearGradient id="orbitGlowLight" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0f172a" stopOpacity="0.85" />
          <stop offset="50%" stopColor="#0284c7" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#00d9c0" stopOpacity="0.75" />
        </linearGradient>

        <linearGradient id="firstLetterGradLight" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0f172a" />
          <stop offset="45%" stopColor="#1e293b" />
          <stop offset="100%" stopColor="#334155" />
        </linearGradient>

        <linearGradient id="secondLetterGradLight" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0284c7" />
          <stop offset="50%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#2563eb" />
        </linearGradient>

        <linearGradient id="swooshGradLight" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0284c7" />
          <stop offset="50%" stopColor="#00d9c0" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>

        <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Orbit Ring */}
      <circle
        cx="100"
        cy="100"
        r="88"
        stroke={`url(#${orbitId})`}
        strokeWidth={isLight ? "3.5" : "2.5"}
        strokeLinecap="round"
        strokeDasharray="450 100"
        filter={isLight ? undefined : "url(#glowFilter)"}
        opacity={isLight ? "0.9" : "0.85"}
      />

      {/* Code < / > symbol */}
      <g filter={isLight ? undefined : "url(#glowFilter)"}>
        <path
          d="M 46 92 L 36 100 L 46 108"
          stroke={isLight ? "#0284c7" : "#00d9c0"}
          strokeWidth={isLight ? "4" : "3.5"}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 52 112 L 58 88"
          stroke={isLight ? "#0ea5e9" : "#38bdf8"}
          strokeWidth={isLight ? "4" : "3.5"}
          strokeLinecap="round"
        />
        <path
          d="M 64 92 L 74 100 L 64 108"
          stroke={isLight ? "#0284c7" : "#00d9c0"}
          strokeWidth={isLight ? "4" : "3.5"}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      {/* First Initial */}
      <text
        x="64"
        y="142"
        fontFamily="'Times New Roman', 'Playfair Display', Georgia, serif"
        fontSize="108"
        fontWeight="bold"
        fill={`url(#${firstLetterId})`}
        textAnchor="middle"
        style={{
          filter: isLight
            ? 'drop-shadow(0px 2px 6px rgba(0,0,0,0.25))'
            : 'drop-shadow(0px 4px 12px rgba(0,0,0,0.5))',
          letterSpacing: '-2px',
        }}
      >
        {firstInitial}
      </text>

      {/* Second Initial */}
      <text
        x="136"
        y="142"
        fontFamily="'Times New Roman', 'Playfair Display', Georgia, serif"
        fontSize="108"
        fontWeight="bold"
        fill={`url(#${secondLetterId})`}
        textAnchor="middle"
        style={{
          filter: isLight
            ? 'drop-shadow(0px 2px 8px rgba(2,132,199,0.35))'
            : 'drop-shadow(0px 4px 14px rgba(0,217,192,0.4))',
          letterSpacing: '-2px',
        }}
      >
        {secondInitial}
      </text>

      {/* Connecting Swoosh */}
      <path
        d="M 38 106 C 58 126, 95 110, 120 90 C 145 70, 168 96, 172 108 C 158 92, 132 82, 108 96 C 80 112, 54 118, 38 106 Z"
        fill={`url(#${swooshId})`}
        filter={isLight ? undefined : "url(#glowFilter)"}
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
      <div className={`flex flex-col items-center text-center group select-none ${className}`}>
        <LogoEmblem firstInitial={firstInitial} secondInitial={secondInitial} size={size * 2.6} />
        
        <div className="mt-3">
          <h2 className="font-display font-black text-xl sm:text-2xl tracking-wider uppercase">
            <span style={{ color: 'var(--color-text)' }}>{firstName}</span>{' '}
            <span className="gradient-text">{lastName}</span>
          </h2>
          
          {subtitle && (
            <div className="flex items-center justify-center gap-2 mt-1">
              <span className="h-px w-6 sm:w-10 bg-gradient-to-r from-transparent to-[var(--accent2)]" />
              <p className="text-[10px] sm:text-xs font-semibold tracking-[0.25em] text-[var(--accent2)] uppercase">
                {subtitle}
              </p>
              <span className="h-px w-6 sm:w-10 bg-gradient-to-l from-transparent to-[var(--accent2)]" />
            </div>
          )}

          {tagline && (
            <p className="text-[8px] sm:text-[9px] tracking-[0.3em] uppercase opacity-70 mt-1 font-medium" style={{ color: 'var(--color-muted)' }}>
              {tagline}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-2.5 sm:gap-3 group select-none ${className}`}>
      <LogoEmblem firstInitial={firstInitial} secondInitial={secondInitial} size={size} />

      {showText && (
        <div className="flex flex-col">
          <span className="font-display font-bold text-base sm:text-lg tracking-wide uppercase leading-tight">
            <span style={{ color: 'var(--color-text)' }}>{firstName}</span>{' '}
            <span className="gradient-text">{lastName}</span>
          </span>
          {subtitle && (
            <span className="text-[9px] sm:text-[10px] font-semibold tracking-[0.2em] text-[var(--accent2)] uppercase leading-none mt-0.5">
              {subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default Logo;
