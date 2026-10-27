import { ExternalLink, Play } from 'lucide-react'
import { useMemo, useState } from 'react'
import { VideoModal } from '../components/VideoModal'
import { videos } from '../data/videos'
import { ui, videoText } from '../data/localization'
import { usePreferences } from '../context/Preferences'

const descriptions={
 en:'A visual learning path through the MetCompB archive. Open a lesson, move between videos and jump directly to the related computational content.',
 pt:'Uma trilha visual pelo acervo MetCompB. Abra uma aula, navegue entre os vídeos e vá diretamente ao conteúdo computacional relacionado.',
 de:'Ein visueller Lernpfad durch das MetCompB-Archiv. Öffnen Sie eine Lektion, wechseln Sie zwischen Videos und springen Sie direkt zum zugehörigen Inhalt.',
 fr:'Un parcours visuel à travers les archives MetCompB. Ouvrez un cours, naviguez entre les vidéos et accédez directement au contenu associé.',
 es:'Un recorrido visual por el archivo MetCompB. Abre una clase, navega entre los videos y accede directamente al contenido relacionado.'
}
export function Videos(){
 const [selectedIndex,setSelectedIndex]=useState<number|null>(null)
 const {language}=usePreferences();const t=ui[language]
 const selected=useMemo(()=>selectedIndex===null?null:videos[selectedIndex],[selectedIndex])
 const move=(delta:number)=>{if(selectedIndex===null)return;setSelectedIndex((selectedIndex+delta+videos.length)%videos.length)}
 return <section className="page page-grid"><div className="page-title split-title"><div><div className="kicker"><span></span> {videos.length} {t.videos.toUpperCase()}</div><h1>{t.videos}</h1><p>{descriptions[language]}</p></div><a className="button" href="https://www.youtube.com/@MetCompB_UFRGS" target="_blank" rel="noopener noreferrer">{t.openChannel} <ExternalLink size={16}/></a></div><div className="video-grid">{videos.map((v,i)=>{const copy=videoText(v,language);return <button className="video-card" key={v.id} onClick={()=>setSelectedIndex(i)}><div className="thumb"><img loading="lazy" src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`} alt=""/><span className="play"><Play fill="currentColor"/></span><i>{String(i+1).padStart(2,'0')}</i></div><div className="video-card-copy"><small>{v.category}</small><h3>{copy.title}</h3><p>{copy.summary}</p><span>{t.details}</span></div></button>})}</div>{selected&&<VideoModal video={selected} onClose={()=>setSelectedIndex(null)} onPrevious={()=>move(-1)} onNext={()=>move(1)}/>}</section>
}
