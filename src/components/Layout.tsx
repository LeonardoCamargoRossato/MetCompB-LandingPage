import { Menu, Terminal, X } from 'lucide-react'
import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const nav = [['/','Home'],['/conteudos','Conteúdos'],['/videoaulas','Videoaulas'],['/arquivos','Arquivos'],['/sobre','Sobre']]
export function Layout(){
 const [open,setOpen]=useState(false)
 return <div className="app-shell">
   <header className="header">
    <NavLink to="/" className="brand"><span className="brand-mark"><Terminal size={20}/></span><span><b>MetCompB</b><small>Scientific Computing Lab</small></span></NavLink>
    <button className="menu-btn" onClick={()=>setOpen(!open)} aria-label="Abrir menu">{open?<X/>:<Menu/>}</button>
    <nav className={open?'nav open':'nav'}>{nav.map(([to,label])=><NavLink key={to} to={to} onClick={()=>setOpen(false)} className={({isActive})=>isActive?'active':''}>{label}</NavLink>)}</nav>
    <a className="icon-link desktop-only" href="https://github.com/LeonardoCamargoRossato/MetCompB" target="_blank" rel="noopener noreferrer" aria-label="Abrir GitHub"><Terminal size={19}/></a>
   </header>
   <main><Outlet/></main>
   <footer className="footer"><div><b>MetCompB</b><p>Presentation layer for the MetCompB educational archive.</p></div><div className="footer-links"><a href="https://github.com/LeonardoCamargoRossato/MetCompB" target="_blank" rel="noopener noreferrer">GitHub</a><a href="https://www.youtube.com/@MetCompB_UFRGS" target="_blank" rel="noopener noreferrer">YouTube</a></div></footer>
 </div>
}
