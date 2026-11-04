import type { Language } from '../context/Preferences'

/** Self-contained SVG flags to avoid Windows rendering regional-indicator emojis as letters. */
export function LanguageFlag({ code }: { code: Language }) {
  const shared = { width: 24, height: 17, viewBox: '0 0 24 17', role: 'img' as const, 'aria-label': ({ en: 'United States', pt: 'Brazil', de: 'Germany', fr: 'France', es: 'Spain' })[code] }
  switch (code) {
    case 'en':
      return <svg {...shared}><rect width="24" height="17" rx="1" fill="#fff"/>{Array.from({ length: 7 }, (_, i) => <rect key={i} y={i * 17 / 7} width="24" height={17 / 13} fill="#B22234"/>)}<rect width="10" height="9.15" fill="#3C3B6E"/>{Array.from({length: 5}, (_, row) => Array.from({length: 6}, (_, col) => <circle key={row + '-' + col} cx={0.9 + col * 1.6} cy={0.85 + row * 1.7} r=".36" fill="#fff"/>))}</svg>
    case 'pt':
      return <svg {...shared}><rect width="24" height="17" rx="1" fill="#009B3A"/><path d="M12 1.5 22 8.5 12 15.5 2 8.5Z" fill="#FFDF00"/><circle cx="12" cy="8.5" r="4.1" fill="#002776"/><path d="M8.4 6.6q4.3-1.1 7.2 2.9" fill="none" stroke="#fff" strokeWidth=".85"/></svg>
    case 'de':
      return <svg {...shared}><rect width="24" height="17" rx="1" fill="#FFCE00"/><path d="M0 0h24v5.667H0Z" fill="#000"/><path d="M0 5.667h24v5.667H0Z" fill="#DD0000"/></svg>
    case 'fr':
      return <svg {...shared}><rect width="24" height="17" rx="1" fill="#ED2939"/><path d="M0 0h16v17H0Z" fill="#fff"/><path d="M0 0h8v17H0Z" fill="#002395"/></svg>
    case 'es':
      return <svg {...shared}><rect width="24" height="17" rx="1" fill="#AA151B"/><rect y="4.25" width="24" height="8.5" fill="#F1BF00"/><rect x="7" y="6.15" width="2.8" height="4.65" rx=".3" fill="#AA151B"/><path d="M7.25 6h2.3M7.25 8.8h2.3" stroke="#fff" strokeWidth=".6"/><path d="M6.35 6.15v4.8m4.1-4.8v4.8" stroke="#AA151B" strokeWidth=".55"/></svg>
  }
}
