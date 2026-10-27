import { ContentCard } from '../components/ContentCard'
import { contents } from '../data/contents'
export function Contents(){return <section className="page page-grid"><div className="page-title"><div className="kicker"><span></span> BIBLIOTECA VISUAL</div><h1>Conteúdos</h1><p>Cada pasta do repositório original vira uma entrada pedagógica: contexto, conceitos, arquivos e acesso direto à fonte.</p></div><div className="cards-grid">{contents.map(x=><ContentCard key={x.slug} item={x}/>)}</div></section>}
