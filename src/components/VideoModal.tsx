import { ArrowLeft, ArrowRight, ExternalLink, X } from 'lucide-react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import type { Video } from '../data/videos'
import { videoContentMap, videoText } from '../data/localization'
import { contents } from '../data/contents'
import { usePreferences } from '../context/Preferences'

export function VideoModal({video,onClose,onPrevious,onNext}:{video:Video;onClose:()=>void;onPrevious:()=>void;onNext:()=>void}){
 const {language}=usePreferences()
 const copy=videoText(video,language)
 const relatedSlugs=videoContentMap[video.id]??[]
 const related=relatedSlugs.map(slug=>contents.find(c=>c.slug===slug)).filter(Boolean)
 useEffect(()=>{const fn=(e:KeyboardEvent)=>{if(e.key==='Escape')onClose();if(e.key==='ArrowLeft')onPrevious();if(e.key==='ArrowRight')onNext()};document.addEventListener('keydown',fn);return()=>document.removeEventListener('keydown',fn)},[onClose,onPrevious,onNext])
 return <div className="modal-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)onClose()}}>
  <div className="video-modal" role="dialog" aria-modal="true" aria-label={copy.title}>
   <div className="modal-toolbar">
    <div className="modal-nav"><button onClick={onPrevious} aria-label={language==='en'?'Previous video':'Vídeo anterior'}><ArrowLeft size={18}/></button><span>{language==='en'?'Browse lessons':'Navegar pelas aulas'}</span><button onClick={onNext} aria-label={language==='en'?'Next video':'Próximo vídeo'}><ArrowRight size={18}/></button></div>
    <button className="modal-close" onClick={onClose} aria-label={language==='en'?'Close':'Fechar'}><X/></button>
   </div>
   <div className="video-frame"><iframe src={`https://www.youtube.com/embed/${video.id}?rel=0`} title={copy.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen/></div>
   <div className="video-detail"><div className="eyebrow">{video.category}</div><h2>{copy.title}</h2><p>{copy.description}</p><div className="tags">{video.topics.map(x=><span key={x}>{x}</span>)}</div><div className="video-modal-actions">{related[0]&&<Link className="button primary" to={'/conteudos/'+related[0]!.slug} onClick={onClose}>{language==='en'?'Understand this lesson':'Entender esta aula'} <ArrowRight size={16}/></Link>}<a className="button" href={`https://youtu.be/${video.id}`} target="_blank" rel="noopener noreferrer">YouTube <ExternalLink size={16}/></a></div>{related.length>1&&<div className="related-links"><small>{language==='en'?'Also related to:':'Também relacionado a:'}</small>{related.slice(1).map(item=><Link key={item!.slug} to={'/conteudos/'+item!.slug} onClick={onClose}>{item!.title}</Link>)}</div>}</div>
  </div>
 </div>
}
