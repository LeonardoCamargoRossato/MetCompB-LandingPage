import { ContentCard } from '../components/ContentCard'
import { contents } from '../data/contents'
import { ui } from '../data/localization'
import { usePreferences } from '../context/Preferences'

const descriptions={
 en:'Each folder from the original repository becomes a learning entry with context, concepts, files, related lessons and direct access to the source.',
 pt:'Cada pasta do repositório original vira uma entrada pedagógica com contexto, conceitos, arquivos, videoaulas relacionadas e acesso direto à fonte.',
 de:'Jeder Ordner des ursprünglichen Repositories wird zu einem Lernbereich mit Kontext, Konzepten, Dateien, zugehörigen Lektionen und direktem Zugriff auf die Quelle.',
 fr:'Chaque dossier du dépôt d’origine devient une entrée pédagogique avec contexte, concepts, fichiers, cours associés et accès direct à la source.',
 es:'Cada carpeta del repositorio original se convierte en una entrada didáctica con contexto, conceptos, archivos, clases relacionadas y acceso directo a la fuente.'
}
export function Contents(){const {language}=usePreferences();const t=ui[language];return <section className="page page-grid"><div className="page-title"><div className="kicker"><span></span> {t.visualLibrary}</div><h1>{t.contents}</h1><p>{descriptions[language]}</p></div><div className="cards-grid">{contents.map(x=><ContentCard key={x.slug} item={x}/>)}</div></section>}
