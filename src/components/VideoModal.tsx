import { ExternalLink, X } from 'lucide-react'
import { useEffect } from 'react'
import type { Video } from '../data/videos'
export function VideoModal({video,onClose}:{video:Video;onClose:()=>void}){
 useEffect(()=>{const fn=(e:KeyboardEvent)=>{if(e.key==='Escape')onClose()};document.addEventListener('keydown',fn);return()=>document.removeEventListener('keydown',fn)},[onClose])
 return <div className="modal-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)onClose()}}><div className="video-modal" role="dialog" aria-modal="true" aria-label={video.title}><button className="modal-close" onClick={onClose} aria-label="Fechar"><X/></button><div className="video-frame"><iframe src={`https://www.youtube.com/embed/${video.id}?rel=0`} title={video.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen/></div><div className="video-detail"><div className="eyebrow">{video.category}</div><h2>{video.title}</h2><p>{video.description}</p><div className="tags">{video.topics.map(x=><span key={x}>{x}</span>)}</div><a className="button primary" href={`https://youtu.be/${video.id}`} target="_blank" rel="noopener noreferrer">Ver no YouTube <ExternalLink size={16}/></a></div></div></div>
}
