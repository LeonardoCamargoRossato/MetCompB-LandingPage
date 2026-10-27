import { ArrowLeft, ChevronLeft, ChevronRight, ExternalLink, FileText, Image as ImageIcon, NotebookTabs, Play, Download, BookOpen } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { NotebookViewer } from '../components/NotebookViewer'
import { contents } from '../data/contents'
import { files } from '../data/files'
import { videos } from '../data/videos'
import { contentText, contentVideoIds, videoText, ui } from '../data/localization'
import { usePreferences } from '../context/Preferences'

const bodyText={
 en:{notFound:'Content not found.',intro:'Academic materials organized around this topic, connecting mathematical formulation, numerical implementation, visualization and analysis.',empty:'The detailed inventory for this folder will be expanded in future curation rounds.',source:'Open source',python:'Install Python',jupyter:'Jupyter Notebook Tutorial'},
 pt:{notFound:'Conteúdo não encontrado.',intro:'Materiais acadêmicos organizados em torno deste tema, conectando formulação matemática, implementação numérica, visualização e análise.',empty:'O inventário detalhado desta pasta será ampliado nas próximas curadorias.',source:'Abrir fonte',python:'Instalar Python',jupyter:'Tutorial Jupyter Notebook'},
 de:{notFound:'Inhalt nicht gefunden.',intro:'Akademische Materialien zu diesem Thema verbinden mathematische Formulierung, numerische Umsetzung, Visualisierung und Analyse.',empty:'Das detaillierte Inventar dieses Ordners wird in zukünftigen Kurationsrunden erweitert.',source:'Quelle öffnen',python:'Python installieren',jupyter:'Jupyter-Notebook-Tutorial'},
 fr:{notFound:'Contenu introuvable.',intro:'Des ressources académiques organisées autour de ce thème, reliant formulation mathématique, implémentation numérique, visualisation et analyse.',empty:'L’inventaire détaillé de ce dossier sera enrichi lors de prochaines phases de curation.',source:'Ouvrir la source',python:'Installer Python',jupyter:'Tutoriel Jupyter Notebook'},
 es:{notFound:'Contenido no encontrado.',intro:'Materiales académicos organizados en torno a este tema, conectando formulación matemática, implementación numérica, visualización y análisis.',empty:'El inventario detallado de esta carpeta se ampliará en futuras rondas de curaduría.',source:'Abrir fuente',python:'Instalar Python',jupyter:'Tutorial Jupyter Notebook'}
}

const primaryNotebookBySlug:Record<string,string>={
 'binomial-poisson':'DIstribuição_Binomial_x_Poisson.ipynb','exam1-review':'Revisão_Prova_1_MetCompB.ipynb',epidemics:'Aplicacoes_Modelo_SIR__GithubVersion.ipynb','exam1-resolution':'Resolucao_Prova_1__MetCompB.ipynb','exam2-resolution':'Resolucao_Prova2.ipynb',projectile:'Resolução_Trabalho1_LançamentoProjetil.ipynb','mass-spring':'Resolucao_Trabalho2_MetCompB.ipynb','random-simulation':'Resolucao_Trabalho3_MetCompB.ipynb','ode-review':'Revisão_Prova_1_MetCompB.ipynb'
}

export function ContentDetail(){
 const {slug}=useParams();const {language}=usePreferences();const t=ui[language];const bt=bodyText[language]
 const [videoIndex,setVideoIndex]=useState(0);const [imageIndex,setImageIndex]=useState(0)
 useEffect(()=>{setVideoIndex(0);setImageIndex(0)},[slug])
 const item=contents.find(c=>c.slug===slug);if(!item)return <section className="page page-grid"><h1>{bt.notFound}</h1></section>
 const copy=contentText(item,language);const own=files.filter(f=>f.folder===item.directory);const figures=own.filter(f=>f.kind==='Figura'&&f.rawUrl)
 const notebooks=own.filter(f=>f.kind==='Notebook');const primaryName=primaryNotebookBySlug[item.slug];const primaryNotebook=notebooks.find(f=>f.name===primaryName)??notebooks[0]
 const notebookRawUrl=primaryNotebook?`https://raw.githubusercontent.com/LeonardoCamargoRossato/MetCompB/main/${encodeURI(item.directory+'/'+primaryNotebook.name)}`:null
 const relatedVideos=contentVideoIds(item.slug).map(id=>videos.find(v=>v.id===id)).filter(Boolean);const activeVideo=relatedVideos[videoIndex%Math.max(relatedVideos.length,1)];const activeFigure=figures[imageIndex%Math.max(figures.length,1)]
 return <section className="page page-grid">
  <Link className="back" to="/conteudos"><ArrowLeft size={16}/> {t.backContents}</Link>
  <div className="detail-hero"><div><div className="eyebrow">{item.directory}</div><h1>{copy.title}</h1><p>{copy.description}</p><div className="tags">{[...item.topics,...item.methods].map(x=><span key={x}>{x}</span>)}</div></div><div className="formula-box"><small>COMPUTATIONAL NOTE</small><strong>{item.accent}</strong><span>model → discretize → solve → visualize</span></div></div>
  <div className="detail-grid"><div><h2>{t.whatFind}</h2><p>{bt.intro}</p></div><div><h2>{t.keyConcepts}</h2><ul className="clean-list">{item.topics.map(x=><li key={x}>{x}</li>)}</ul></div></div>
  {activeVideo&&<section className="lesson-section"><div className="section-head compact"><div><div className="kicker"><span></span> {t.relatedLesson}</div><h2>{t.learnVideo}</h2></div>{relatedVideos.length>1&&<div className="carousel-controls"><button onClick={()=>setVideoIndex((videoIndex-1+relatedVideos.length)%relatedVideos.length)}><ChevronLeft/></button><span>{videoIndex+1}/{relatedVideos.length}</span><button onClick={()=>setVideoIndex((videoIndex+1)%relatedVideos.length)}><ChevronRight/></button></div>}</div><div className="lesson-card"><div className="lesson-video"><iframe src={`https://www.youtube.com/embed/${activeVideo.id}?rel=0`} title={videoText(activeVideo,language).title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen/></div><div className="lesson-copy"><div className="eyebrow">{activeVideo.category}</div><h3>{videoText(activeVideo,language).title}</h3><p>{videoText(activeVideo,language).description}</p><div className="tags">{activeVideo.topics.map(x=><span key={x}>{x}</span>)}</div><div className="lesson-actions"><Link className="button" to="/videoaulas"><Play size={16}/>{t.openLessons}</Link><Link className="button" to="/conteudos/tutorial-jupyter"><Download size={16}/>{bt.python}</Link><Link className="button" to="/conteudos/tutorial-jupyter"><BookOpen size={16}/>{bt.jupyter}</Link></div></div></div></section>}
  {primaryNotebook&&notebookRawUrl&&<NotebookViewer rawUrl={notebookRawUrl} githubUrl={primaryNotebook.githubUrl} name={primaryNotebook.name} language={language}/>} 
  {activeFigure&&<section className="visual-preview"><div className="section-head compact"><div><h2>{t.visualPreview}</h2><p className="section-note">{t.browseFigures}</p></div><div className="carousel-controls"><button onClick={()=>setImageIndex((imageIndex-1+figures.length)%figures.length)}><ChevronLeft/></button><span>{imageIndex+1}/{figures.length}</span><button onClick={()=>setImageIndex((imageIndex+1)%figures.length)}><ChevronRight/></button></div></div><div className="image-carousel"><a href={activeFigure.rawUrl} target="_blank" rel="noopener noreferrer"><img loading="lazy" src={activeFigure.rawUrl} alt={activeFigure.name}/><span>{activeFigure.name}</span></a></div>{figures.length>1&&<div className="carousel-dots">{figures.map((f,i)=><button key={f.name} className={i===imageIndex?'active':''} onClick={()=>setImageIndex(i)}/>)}</div>}</section>}
  <div className="section-head compact available-files-head"><div><h2>{t.availableFiles}</h2></div><a href={item.githubUrl} target="_blank" rel="noopener noreferrer">{t.openFolder} <ExternalLink size={15}/></a></div><div className="file-list">{own.length?own.map(f=><a key={f.name} href={f.githubUrl} target="_blank" rel="noopener noreferrer"><span className="file-icon">{f.kind==='Notebook'?<NotebookTabs/>:f.kind==='Figura'?<ImageIcon/>:<FileText/>}</span><span><b>{f.name}</b><small>{f.description}</small></span><em>{f.kind}</em></a>):<div className="empty-state">{bt.empty} <a href={item.githubUrl} target="_blank" rel="noopener noreferrer">{bt.source} ↗</a></div>}</div>
 </section>
}
