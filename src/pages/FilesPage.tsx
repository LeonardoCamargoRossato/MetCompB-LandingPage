import { ExternalLink, FileText, Image as ImageIcon, NotebookTabs, Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { files, type FileKind } from '../data/files'
import { ui } from '../data/localization'
import { usePreferences } from '../context/Preferences'

const kindLabels={
 en:{Todos:'All',Notebook:'Notebook',Figura:'Figure',Documento:'Document','Documentação':'Documentation','Simulação':'Simulation'},
 pt:{Todos:'Todos',Notebook:'Notebook',Figura:'Figura',Documento:'Documento','Documentação':'Documentação','Simulação':'Simulação'},
 de:{Todos:'Alle',Notebook:'Notebook',Figura:'Abbildung',Documento:'Dokument','Documentação':'Dokumentation','Simulação':'Simulation'},
 fr:{Todos:'Tous',Notebook:'Notebook',Figura:'Figure',Documento:'Document','Documentação':'Documentation','Simulação':'Simulation'},
 es:{Todos:'Todos',Notebook:'Notebook',Figura:'Figura',Documento:'Documento','Documentação':'Documentación','Simulação':'Simulación'}
} as const
const descriptions={en:'Search, filter and open materials directly in the original academic repository.',pt:'Busque, filtre e abra os materiais diretamente no repositório acadêmico original.',de:'Suchen, filtern und öffnen Sie Materialien direkt im ursprünglichen akademischen Repository.',fr:'Recherchez, filtrez et ouvrez les ressources directement dans le dépôt académique d’origine.',es:'Busca, filtra y abre materiales directamente en el repositorio académico original.'}

export function FilesPage(){
 const [q,setQ]=useState('');const [kind,setKind]=useState<'Todos'|FileKind>('Todos');const [folder,setFolder]=useState('Todos')
 const {language}=usePreferences();const t=ui[language]
 const folders=['Todos',...Array.from(new Set(files.map(f=>f.folder)))]
 const filtered=useMemo(()=>files.filter(f=>(kind==='Todos'||f.kind===kind)&&(folder==='Todos'||f.folder===folder)&&(`${f.name} ${f.folder} ${f.description}`).toLowerCase().includes(q.toLowerCase())).sort((a,b)=>a.name.localeCompare(b.name)),[q,kind,folder])
 const label=(value:string)=>(kindLabels[language] as Record<string,string>)[value]??value
 return <section className="page page-grid"><div className="page-title"><div className="kicker"><span></span> FILE EXPLORER</div><h1>{t.allFiles}</h1><p>{descriptions[language]}</p></div><div className="filter-bar"><label className="search"><Search size={17}/><input value={q} onChange={e=>setQ(e.target.value)} placeholder={t.search}/></label><select value={kind} onChange={e=>setKind(e.target.value as any)}>{['Todos','Notebook','Figura','Documento','Documentação','Simulação'].map(x=><option value={x} key={x}>{label(x)}</option>)}</select><select value={folder} onChange={e=>setFolder(e.target.value)}>{folders.map(x=><option key={x} value={x}>{x==='Todos'?t.allFolders:x}</option>)}</select></div><div className="file-count"><b>{filtered.length}</b> {t.filesFound}</div><div className="explorer"><div className="explorer-head"><span>{t.file}</span><span>{t.folder}</span><span>{t.type}</span><span></span></div>{filtered.map(f=><div className="explorer-row" key={f.folder+f.name}><div className="file-name"><span>{f.kind==='Notebook'?<NotebookTabs/>:f.kind==='Figura'?<ImageIcon/>:<FileText/>}</span><div><b>{f.name}</b><small>{f.description}</small></div></div><code>{f.folder}</code><em>{label(f.kind)}</em><a href={f.githubUrl} target="_blank" rel="noopener noreferrer" aria-label={t.openContent+' '+f.name}><ExternalLink size={17}/></a></div>)}</div></section>
}
