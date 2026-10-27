import { Languages, Menu, Moon, Sun, Terminal, X } from 'lucide-react'
import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { usePreferences } from '../context/Preferences'

const portfolioUrl='https://leonardocamargorossato.github.io/LCR-SolutionsArchitecture-IA-Quantum/#/'

export function Layout(){
 const [open,setOpen]=useState(false)
 const {language,theme,setLanguage,setTheme}=usePreferences()
 const nav=language==='en'
  ? [['/','Home'],['/videoaulas','Video Lessons'],['/conteudos','Contents'],['/arquivos','Files'],['/sobre','About']]
  : [['/','Home'],['/videoaulas','Videoaulas'],['/conteudos','Conteúdos'],['/arquivos','Arquivos'],['/sobre','Sobre']]
 return <div className="app-shell">
   <header className="header">
    <NavLink to="/" className="brand"><span className="brand-mark"><Terminal size={20}/></span><span><b>MetCompB</b><small>Scientific Computing Lab</small></span></NavLink>
    <button className="menu-btn" onClick={()=>setOpen(!open)} aria-label={language==='en'?'Open menu':'Abrir menu'}>{open?<X/>:<Menu/>}</button>
    <nav className={open?'nav open':'nav'}>{nav.map(([to,label])=><NavLink key={to} to={to} onClick={()=>setOpen(false)} className={({isActive})=>isActive?'active':''}>{label}</NavLink>)}</nav>
    <div className="header-tools">
      <button className="icon-control" onClick={()=>setTheme(theme==='light'?'dark':'light')} aria-label={theme==='light'?'Switch to dark theme':'Mudar para tema claro'} title={theme==='light'?'Dark theme':'Tema claro'}>{theme==='light'?<Moon size={18}/>:<Sun size={18}/>}</button>
      <button className="language-control" onClick={()=>setLanguage(language==='en'?'pt':'en')} aria-label="Change language" title={language==='en'?'Português':'English'}><span>{language==='en'?'🇺🇸':'🇧🇷'}</span><Languages size={15}/></button>
    </div>
    <a className="creator-link" href={portfolioUrl} target="_blank" rel="noopener noreferrer">@LeonardoCamargoRossato</a>
   </header>
   <main><Outlet/></main>
   <footer className="footer"><div><b>MetCompB</b><p>{language==='en'?'Scientific computing archive curated by Leonardo Camargo Rossato.':'Acervo de computação científica curado por Leonardo Camargo Rossato.'}</p></div><div className="footer-links"><a href="https://github.com/LeonardoCamargoRossato/MetCompB" target="_blank" rel="noopener noreferrer">GitHub</a><a href="https://www.youtube.com/@MetCompB_UFRGS" target="_blank" rel="noopener noreferrer">YouTube</a><a href={portfolioUrl} target="_blank" rel="noopener noreferrer">Portfolio ↗</a></div></footer>
 </div>
}
