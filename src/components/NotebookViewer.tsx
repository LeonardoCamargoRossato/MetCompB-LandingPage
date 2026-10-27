import { ExternalLink, NotebookTabs } from 'lucide-react'
import { useEffect, useState } from 'react'
import type { Language } from '../context/Preferences'

type NotebookCell = {
  cell_type: 'markdown' | 'code' | 'raw'
  source?: string[] | string
  execution_count?: number | null
  outputs?: Array<{
    output_type?: string
    name?: string
    text?: string[] | string
    data?: Record<string, string[] | string>
    traceback?: string[]
  }>
}

type NotebookDocument = { cells?: NotebookCell[]; metadata?: Record<string, unknown> }

const copy: Record<Language,{title:string;subtitle:string;loading:string;error:string;github:string}> = {
  en:{title:'Main notebook',subtitle:'Read-only Jupyter Notebook preview. Code is not executed.',loading:'Loading notebook…',error:'The notebook preview could not be loaded.',github:'Open notebook on GitHub'},
  pt:{title:'Notebook principal',subtitle:'Visualização somente leitura do Jupyter Notebook. O código não é executado.',loading:'Carregando notebook…',error:'Não foi possível carregar a visualização do notebook.',github:'Abrir notebook no GitHub'},
  de:{title:'Haupt-Notebook',subtitle:'Schreibgeschützte Jupyter-Notebook-Vorschau. Code wird nicht ausgeführt.',loading:'Notebook wird geladen…',error:'Die Notebook-Vorschau konnte nicht geladen werden.',github:'Notebook auf GitHub öffnen'},
  fr:{title:'Notebook principal',subtitle:'Aperçu Jupyter Notebook en lecture seule. Le code n’est pas exécuté.',loading:'Chargement du notebook…',error:'Impossible de charger l’aperçu du notebook.',github:'Ouvrir le notebook sur GitHub'},
  es:{title:'Notebook principal',subtitle:'Vista de Jupyter Notebook de solo lectura. El código no se ejecuta.',loading:'Cargando notebook…',error:'No se pudo cargar la vista del notebook.',github:'Abrir notebook en GitHub'}
}

function sourceText(source?: string[] | string){return Array.isArray(source)?source.join(''):source??''}

function MarkdownCell({text}:{text:string}){
 const lines=text.split('\n')
 return <div className="nb-markdown">{lines.map((line,i)=>{
   if(line.startsWith('### ')) return <h4 key={i}>{line.slice(4)}</h4>
   if(line.startsWith('## ')) return <h3 key={i}>{line.slice(3)}</h3>
   if(line.startsWith('# ')) return <h2 key={i}>{line.slice(2)}</h2>
   if(line.trim()==='') return <div className="nb-space" key={i}/>
   return <p key={i}>{line}</p>
 })}</div>
}

function Output({output}:{output:NonNullable<NotebookCell['outputs']>[number]}){
 const data=output.data??{}
 const png=data['image/png']; const jpeg=data['image/jpeg']
 const image=png||jpeg
 if(image){const value=Array.isArray(image)?image.join(''):image;const mime=png?'image/png':'image/jpeg';return <div className="nb-output image"><img src={`data:${mime};base64,${value}`} alt="Notebook output"/></div>}
 const text=output.text??data['text/plain']??output.traceback
 if(text){const value=Array.isArray(text)?text.join(''):text;return <pre className="nb-output text">{value}</pre>}
 return null
}

export function NotebookViewer({rawUrl,githubUrl,name,language}:{rawUrl:string;githubUrl:string;name:string;language:Language}){
 const [notebook,setNotebook]=useState<NotebookDocument|null>(null)
 const [state,setState]=useState<'loading'|'ready'|'error'>('loading')
 const t=copy[language]
 useEffect(()=>{
   let cancelled=false;setState('loading');setNotebook(null)
   fetch(rawUrl).then(r=>{if(!r.ok)throw new Error(String(r.status));return r.json()}).then(data=>{if(!cancelled){setNotebook(data);setState('ready')}}).catch(()=>{if(!cancelled)setState('error')})
   return()=>{cancelled=true}
 },[rawUrl])
 return <section className="notebook-section">
   <div className="section-head compact notebook-heading"><div><div className="kicker"><span></span> JUPYTER NOTEBOOK</div><h2>{t.title}</h2><p className="section-note">{t.subtitle}</p></div><a href={githubUrl} target="_blank" rel="noopener noreferrer">{t.github} <ExternalLink size={15}/></a></div>
   <div className="notebook-shell">
    <div className="notebook-topbar"><span><NotebookTabs size={17}/>{name}</span><small>read-only · .ipynb</small></div>
    <div className="notebook-document">
      {state==='loading'&&<div className="notebook-status">{t.loading}</div>}
      {state==='error'&&<div className="notebook-status error">{t.error} <a href={githubUrl} target="_blank" rel="noopener noreferrer">GitHub ↗</a></div>}
      {state==='ready'&&notebook?.cells?.map((cell,index)=><div className={`nb-cell ${cell.cell_type}`} key={index}>
        {cell.cell_type==='markdown'?<MarkdownCell text={sourceText(cell.source)}/>:cell.cell_type==='code'?<><div className="nb-code-row"><span className="nb-prompt">In [{cell.execution_count??' '}]:</span><pre>{sourceText(cell.source)}</pre></div>{cell.outputs?.map((o,i)=><Output output={o} key={i}/>)}</>:<pre className="nb-raw">{sourceText(cell.source)}</pre>}
      </div>)}
    </div>
   </div>
 </section>
}
