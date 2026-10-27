import { Activity, BarChart3, BookOpen, CheckCircle2, Dices, Network, Orbit, Sigma, Target, Waves } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import type { ContentItem } from '../data/contents'
import { contentText, ui } from '../data/localization'
import { usePreferences } from '../context/Preferences'

const icons={histogram:BarChart3,book:BookOpen,check:CheckCircle2,network:Network,sigma:Sigma,target:Target,spring:Orbit,dice:Dices,wave:Waves}

export function ContentCard({item}: {item:ContentItem}){
 const Icon=icons[item.icon]||Activity
 const navigate=useNavigate()
 const {language}=usePreferences()
 const copy=contentText(item,language)
 const t=ui[language]
 const open=()=>navigate('/conteudos/'+item.slug)
 return <article className="content-card clickable-card" role="link" tabIndex={0} onClick={open} onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open()}}}>
   <div className="card-visual"><Icon size={34}/><code>{item.accent}</code></div>
   <div className="eyebrow">{item.directory}</div><h3>{copy.title}</h3><p>{copy.description}</p>
   <div className="tags">{item.methods.slice(0,4).map(x=><span key={x}>{x}</span>)}</div>
   <div className="card-actions"><span className="card-open">{t.openContent}</span><a href={item.githubUrl} target="_blank" rel="noopener noreferrer" onClick={e=>e.stopPropagation()}>GitHub ↗</a></div>
 </article>
}
