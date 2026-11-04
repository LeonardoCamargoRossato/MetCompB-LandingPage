import { useId } from 'react'
import type { Language } from '../context/Preferences'

const labels: Record<Language, string> = {
  en: 'United States', pt: 'Brazil', de: 'Germany', fr: 'France', es: 'Spain'
}
const emoji: Record<Language, string> = {
  en: '🇺🇸', pt: '🇧🇷', de: '🇩🇪', fr: '🇫🇷', es: '🇪🇸'
}

/** Mobile keeps its native waving emoji. Desktop uses a waving SVG fallback for Windows. */
export function LanguageFlag({ code }: { code: Language }) {
  const uid = useId().replace(/:/g, '')
  const clipId = 'flag-wave-' + uid
  const shadeId = 'flag-shade-' + uid
  return <span className="language-flag" role="img" aria-label={labels[code]}>
    <span className="language-flag-emoji" aria-hidden="true">{emoji[code]}</span>
    <svg className="language-flag-wave" viewBox="0 0 30 24" width="28" height="23" aria-hidden="true">
      <defs>
        <clipPath id={clipId}>
          <path d="M2 3 Q9 0.1 16 3 Q22 5 28 2.6 L28 20.8 Q21 23.4 15 20.8 Q8 18.2 2 21 Z" />
        </clipPath>
        <linearGradient id={shadeId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#000" stopOpacity=".17"/>
          <stop offset=".25" stopColor="#fff" stopOpacity=".18"/>
          <stop offset=".58" stopColor="#000" stopOpacity=".12"/>
          <stop offset=".84" stopColor="#fff" stopOpacity=".13"/>
          <stop offset="1" stopColor="#000" stopOpacity=".10"/>
        </linearGradient>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        {code === 'en' && <>
          <rect width="30" height="24" fill="#fff"/>
          {Array.from({ length: 7 }, (_, i) =>
            <rect key={i} x="0" y={i * 24 / 7} width="30" height={24 / 13} fill="#B22234"/>)}
          <rect width="12.7" height="12.4" fill="#3C3B6E"/>
          {Array.from({length:5},(_,row)=>Array.from({length:5},(_,col)=>
            <circle key={row+'-'+col} cx={1.6+col*2.4} cy={1.5+row*2.2} r=".49" fill="#fff"/>))}
        </>}
        {code === 'pt' && <>
          <rect width="30" height="24" fill="#009C3B"/>
          <path d="M15 2.8 27 12 15 21.2 3 12Z" fill="#FFDF00"/>
          <circle cx="15" cy="12" r="5.8" fill="#002776"/>
          <path d="M9.6 9.5q6.1-1.9 10.6 3.4" fill="none" stroke="#fff" strokeWidth="1.1"/>
        </>}
        {code === 'de' && <>
          <rect width="30" height="24" fill="#FFCE00"/>
          <path d="M0 0h30v8H0Z" fill="#111"/>
          <path d="M0 8h30v8H0Z" fill="#DD0000"/>
        </>}
        {code === 'fr' && <>
          <rect width="30" height="24" fill="#ED2939"/>
          <path d="M0 0h20v24H0Z" fill="#fff"/>
          <path d="M0 0h10v24H0Z" fill="#002395"/>
        </>}
        {code === 'es' && <>
          <rect width="30" height="24" fill="#AA151B"/>
          <rect y="6" width="30" height="12" fill="#F1BF00"/>
          <path d="M9 8h4v8H9Z" fill="#C61B25"/>
          <path d="M10 8h2v3h-2Z" fill="#fff"/>
          <path d="M8 10v6m6-6v6" fill="none" stroke="#C61B25" strokeWidth=".8"/>
        </>}
        <rect width="30" height="24" fill={`url(#${shadeId})`}/>
      </g>
      <path d="M2 3 Q9 .1 16 3 Q22 5 28 2.6 L28 20.8 Q21 23.4 15 20.8 Q8 18.2 2 21 Z" fill="none" stroke="#000" strokeOpacity=".12" strokeWidth=".55"/>
    </svg>
  </span>
}
