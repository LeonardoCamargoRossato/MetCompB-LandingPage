import { ExternalLink, FileText, Image as ImageIcon, NotebookTabs, Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { files, type FileKind } from '../data/files'
import { usePreferences } from '../context/Preferences'

export function FilesPage(){
 const [q,setQ]=useState('')
 const [kind,setKind]=useState<'Todos'|FileKind>('Todos')
 const [folder,setFolder]=useState('Todos')
 const {language}=usePreferences()
 const en=language==='en'
 const folders=['Todos',...Array.from(new Set(files.map(f=>f.folder)))]
 const filtered=useMemo(()=>files.filter(f=>(kind==='Todos'||f.kind===kind)&&(folder==='Todos'||f.folder===folder)&&(`${f.name} ${f.folder} ${f.description}`).toLowerCase().includes(q.toLowerCase())).sort((a,b)=>a.name.localeCompare(b.name)),[q,kind,folder])
 const kindLabel=(value:string)=>en?({Todos:'All',Figura:'Figure',Documento:'Document','Documentação':'Documentation','Simulação':'Simulation'} as Record<string,string>)[value]??value:value
 return <section className="page page-grid"><div className="page-title"><div className="kicker"><span></span> FILE EXPLORER</div><h1>{en?'All Files':'Todos os Arquivos'}</h1><p>{en?'Search, filter and open materials directly in the original academic repository.':'Busque, filtre e abra os materiais diretamente no repositório acadêmico original.'}</p></div><div className="filter-bar"><label className="search"><Search size={17}/><input value={q} onChange={e=>setQ(e.target.value)} placeholder={en?'Search file, folder or topic...':'Buscar arquivo, pasta ou tema...'}/></label><select value={kind} onChange={e=>setKind(e.target.value as any)}>{['Todos','Notebook','Figura','Documento','Documentação','Simulação'].map(x=><option value={x} key={x}>{kindLabel(x)}</option>)}</select><select value={folder} onChange={e=>setFolder(e.target.value)}>{folders.map(x=><option key={x} value={x}>{x==='Todos'&&en?'All folders':x}</option>)}</select></div><div className="file-count"><b>{filtered.length}</b> {en?'files found':'arquivos encontrados'}</div><div className="explorer"><div className="explorer-head"><span>{en?'File':'Arquivo'}</span><span>{en?'Folder':'Pasta'}</span><span>{en?'Type':'Tipo'}</span><span></span></div>{filtered.map(f=><div className="explorer-row" key={f.folder+f.name}><div className="file-name"><span>{f.kind==='Notebook'?<NotebookTabs/>:f.kind==='Figura'?<ImageIcon/>:<FileText/>}</span><div><b>{f.name}</b><small>{f.description}</small></div></div><code>{f.folder}</code><em>{kindLabel(f.kind)}</em><a href={f.githubUrl} target="_blank" rel="noopener noreferrer" aria-label={(en?'Open ':'Abrir ')+f.name}><ExternalLink size={17}/></a></div>)}</div></section>
}
