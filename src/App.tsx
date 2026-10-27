import { HashRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { About } from './pages/About'
import { ContentDetail } from './pages/ContentDetail'
import { Contents } from './pages/Contents'
import { FilesPage } from './pages/FilesPage'
import { Home } from './pages/Home'
import { Videos } from './pages/Videos'
export default function App(){return <HashRouter><Routes><Route element={<Layout/>}><Route path="/" element={<Home/>}/><Route path="/conteudos" element={<Contents/>}/><Route path="/conteudos/:slug" element={<ContentDetail/>}/><Route path="/videoaulas" element={<Videos/>}/><Route path="/arquivos" element={<FilesPage/>}/><Route path="/sobre" element={<About/>}/></Route></Routes></HashRouter>}
