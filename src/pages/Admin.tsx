import { Image, RotateCcw, Upload } from 'lucide-react'
import { useRef } from 'react'
import { usePreferences } from '../context/Preferences'

export function Admin(){
 const {siteIconUrl,profilePhotoUrl,setSiteIcon,setProfilePhoto,clearSiteIcon,clearProfilePhoto}=usePreferences()
 const iconInput=useRef<HTMLInputElement>(null)
 const photoInput=useRef<HTMLInputElement>(null)
 const pick=(file:File|undefined,apply:(f:File)=>void)=>{if(file&&file.type.startsWith('image/'))apply(file)}
 return <section className="page page-grid admin-page">
   <div className="page-title"><div className="kicker"><span></span> LOCAL ADMIN</div><h1>MetCompB Admin</h1><p>Local visual customization stored only in this browser via IndexedDB. No external database or storage is used.</p></div>
   <div className="admin-grid">
    <article className="admin-card"><div><small>SITE BRANDING</small><h2>MetCompB icon</h2><p>Click the preview to upload a PNG, JPG, WEBP or SVG. This replaces the small icon beside MetCompB in the header on this browser.</p></div><button className="asset-preview square" onClick={()=>iconInput.current?.click()}>{siteIconUrl?<img src={siteIconUrl} alt="Site icon"/>:<Image/>}<span><Upload size={15}/> Upload file</span></button><input ref={iconInput} hidden type="file" accept="image/*" onChange={e=>pick(e.target.files?.[0],setSiteIcon)}/>{siteIconUrl&&<button className="button admin-reset" onClick={clearSiteIcon}><RotateCcw size={15}/> Restore default</button>}</article>
    <article className="admin-card"><div><small>ABOUT PROFILE</small><h2>Profile photo</h2><p>Click the preview to upload the photo shown on the About page. The image remains only in IndexedDB on this device.</p></div><button className="asset-preview portrait" onClick={()=>photoInput.current?.click()}>{profilePhotoUrl?<img src={profilePhotoUrl} alt="Profile"/>:<Image/>}<span><Upload size={15}/> Upload file</span></button><input ref={photoInput} hidden type="file" accept="image/*" onChange={e=>pick(e.target.files?.[0],setProfilePhoto)}/>{profilePhotoUrl&&<button className="button admin-reset" onClick={clearProfilePhoto}><RotateCcw size={15}/> Restore default</button>}</article>
   </div>
   <div className="admin-note"><b>Important:</b> GitHub Pages is a static site. These uploaded images are local browser customizations and are not published to the repository or shared with other visitors.</div>
 </section>
}
