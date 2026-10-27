import { Activity, BarChart3, BookOpen, CheckCircle2, Dices, Network, Orbit, Sigma, Target, Waves } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { ContentItem } from '../data/contents'
const icons={histogram:BarChart3,book:BookOpen,check:CheckCircle2,network:Network,sigma:Sigma,target:Target,spring:Orbit,dice:Dices,wave:Waves}
export function ContentCard({item}: {item:ContentItem}){const Icon=icons[item.icon]||Activity;return <article className="content-card">
 <div className="card-visual"><Icon size={34}/><code>{item.accent}</code></div><div className="eyebrow">{item.directory}</div><h3>{item.title}</h3><p>{item.description}</p><div className="tags">{item.methods.slice(0,4).map(x=><span key={x}>{x}</span>)}</div><div className="card-actions"><Link to={'/conteudos/'+item.slug}>Explorar</Link><a href={item.githubUrl} target="_blank" rel="noopener noreferrer">GitHub ↗</a></div>
 </article>}
