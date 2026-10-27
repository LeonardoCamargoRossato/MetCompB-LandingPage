import { ContentCard } from '../components/ContentCard'
import { contents } from '../data/contents'
import { usePreferences } from '../context/Preferences'

export function Contents(){
 const {language}=usePreferences()
 const en=language==='en'
 return <section className="page page-grid"><div className="page-title"><div className="kicker"><span></span> {en?'VISUAL LIBRARY':'BIBLIOTECA VISUAL'}</div><h1>{en?'Contents':'Conteúdos'}</h1><p>{en?'Each folder from the original repository becomes a learning entry with context, concepts, files, related lessons and direct access to the source.':'Cada pasta do repositório original vira uma entrada pedagógica com contexto, conceitos, arquivos, videoaulas relacionadas e acesso direto à fonte.'}</p></div><div className="cards-grid">{contents.map(x=><ContentCard key={x.slug} item={x}/>)}</div></section>
}
