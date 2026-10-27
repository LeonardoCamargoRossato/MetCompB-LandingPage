import { ArrowLeft, ChevronLeft, ChevronRight, ExternalLink, FileText, Image as ImageIcon, NotebookTabs, Play } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { contents } from '../data/contents'
import { files } from '../data/files'
import { videos } from '../data/videos'
import { contentText, contentVideoIds, videoText } from '../data/localization'
import { usePreferences } from '../context/Preferences'

export function ContentDetail(){
 const {slug}=useParams()
 const {language}=usePreferences()
 const [videoIndex,setVideoIndex]=useState(0)
 const [imageIndex,setImageIndex]=useState(0)
 useEffect(()=>{setVideoIndex(0);setImageIndex(0)},[slug])
 const item=contents.find(c=>c.slug===slug)
 if(!item)return <section className="page page-grid"><h1>{language==='pt'?'Conteúdo não encontrado.':'Content not found.'}</h1></section>
 const copy=contentText(item,language)
 const own=files.filter(f=>f.folder===item.directory)
 const figures=own.filter(f=>f.kind==='Figura'&&f.rawUrl)
 const relatedVideos=contentVideoIds(item.slug).map(id=>videos.find(v=>v.id===id)).filter(Boolean)
 const activeVideo=relatedVideos[videoIndex%Math.max(relatedVideos.length,1)]
 const activeFigure=figures[imageIndex%Math.max(figures.length,1)]
 const pt=language==='pt'
 return <section className="page page-grid">
  <Link className="back" to="/conteudos"><ArrowLeft size={16}/> {pt?'Conteúdos':'Contents'}</Link>
  <div className="detail-hero"><div><div className="eyebrow">{item.directory}</div><h1>{copy.title}</h1><p>{copy.description}</p><div className="tags">{[...item.topics,...item.methods].map(x=><span key={x}>{x}</span>)}</div></div><div className="formula-box"><small>COMPUTATIONAL NOTE</small><strong>{item.accent}</strong><span>model → discretize → solve → visualize</span></div></div>
  <div className="detail-grid"><div><h2>{pt?'O que você encontra aqui':'What you will find here'}</h2><p>{pt?<>Materiais acadêmicos organizados em torno de <b>{copy.title.toLowerCase()}</b>, conectando formulação matemática, implementação numérica, visualização e análise.</>:<>Academic materials organized around <b>{copy.title.toLowerCase()}</b>, connecting mathematical formulation, numerical implementation, visualization and analysis.</>}</p></div><div><h2>{pt?'Conceitos envolvidos':'Key concepts'}</h2><ul className="clean-list">{item.topics.map(x=><li key={x}>{x}</li>)}</ul></div></div>

  {activeVideo&&<section className="lesson-section"><div className="section-head compact"><div><div className="kicker"><span></span> {pt?'VIDEOAULA RELACIONADA':'RELATED VIDEO LESSON'}</div><h2>{pt?'Aprenda com a videoaula':'Learn with the video lesson'}</h2></div>{relatedVideos.length>1&&<div className="carousel-controls"><button onClick={()=>setVideoIndex((videoIndex-1+relatedVideos.length)%relatedVideos.length)} aria-label="Previous"><ChevronLeft/></button><span>{videoIndex+1}/{relatedVideos.length}</span><button onClick={()=>setVideoIndex((videoIndex+1)%relatedVideos.length)} aria-label="Next"><ChevronRight/></button></div>}</div><div className="lesson-card"><div className="lesson-video"><iframe src={`https://www.youtube.com/embed/${activeVideo.id}?rel=0`} title={videoText(activeVideo,language).title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen/></div><div className="lesson-copy"><div className="eyebrow">{activeVideo.category}</div><h3>{videoText(activeVideo,language).title}</h3><p>{videoText(activeVideo,language).description}</p><div className="tags">{activeVideo.topics.map(x=><span key={x}>{x}</span>)}</div><Link className="button" to="/videoaulas"><Play size={16}/>{pt?'Abrir videoaulas':'Open video lessons'}</Link></div></div></section>}

  {activeFigure&&<section className="visual-preview"><div className="section-head compact"><div><h2>{pt?'Preview visual':'Visual preview'}</h2><p className="section-note">{pt?'Navegue pelas figuras e resultados deste conteúdo.':'Browse figures and outputs from this content.'}</p></div><div className="carousel-controls"><button onClick={()=>setImageIndex((imageIndex-1+figures.length)%figures.length)} aria-label="Previous image"><ChevronLeft/></button><span>{imageIndex+1}/{figures.length}</span><button onClick={()=>setImageIndex((imageIndex+1)%figures.length)} aria-label="Next image"><ChevronRight/></button></div></div><div className="image-carousel"><a href={activeFigure.rawUrl} target="_blank" rel="noopener noreferrer"><img loading="lazy" src={activeFigure.rawUrl} alt={activeFigure.name}/><span>{activeFigure.name}</span></a></div>{figures.length>1&&<div className="carousel-dots">{figures.map((f,i)=><button key={f.name} className={i===imageIndex?'active':''} onClick={()=>setImageIndex(i)} aria-label={`Image ${i+1}`}/>)}</div>}</section>}

  <div className="section-head compact available-files-head"><div><h2>{pt?'Arquivos disponíveis':'Available files'}</h2></div><a href={item.githubUrl} target="_blank" rel="noopener noreferrer">{pt?'Abrir pasta no GitHub':'Open folder on GitHub'} <ExternalLink size={15}/></a></div>
  <div className="file-list">{own.length?own.map(f=><a key={f.name} href={f.githubUrl} target="_blank" rel="noopener noreferrer"><span className="file-icon">{f.kind==='Notebook'?<NotebookTabs/>:f.kind==='Figura'?<ImageIcon/>:<FileText/>}</span><span><b>{f.name}</b><small>{f.description}</small></span><em>{f.kind}</em></a>):<div className="empty-state">{pt?'O inventário detalhado desta pasta será ampliado nas próximas curadorias.':'The detailed inventory for this folder will be expanded in future curation rounds.'} <a href={item.githubUrl} target="_blank" rel="noopener noreferrer">{pt?'Abrir fonte':'Open source'} ↗</a></div>}</div>
 </section>
}
