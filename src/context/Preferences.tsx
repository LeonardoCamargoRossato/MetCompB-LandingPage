import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

export type Language = 'en' | 'pt' | 'de' | 'fr' | 'es'
export type Theme = 'light' | 'dark'

type Preferences = {
  language: Language
  theme: Theme
  siteIconUrl: string | null
  profilePhotoUrl: string | null
  jupyterIconUrl: string | null
  setLanguage: (language: Language) => void
  setTheme: (theme: Theme) => void
  setSiteIcon: (file: File) => void
  setProfilePhoto: (file: File) => void
  setJupyterIcon: (file: File) => void
  clearSiteIcon: () => void
  clearProfilePhoto: () => void
  clearJupyterIcon: () => void
}

const PreferencesContext = createContext<Preferences | null>(null)
const DB_NAME = 'metcompb-landingpage'
const STORE = 'preferences'

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1)
    request.onupgradeneeded = () => {
      const db = request.result
      if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE)
    }
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

async function readValue<T>(key: string, fallback: T): Promise<T> {
  try {
    const db = await openDb()
    return await new Promise<T>((resolve) => {
      const tx = db.transaction(STORE, 'readonly')
      const request = tx.objectStore(STORE).get(key)
      request.onsuccess = () => resolve((request.result as T) ?? fallback)
      request.onerror = () => resolve(fallback)
    })
  } catch { return fallback }
}

async function writeValue(key: string, value: unknown) {
  try {
    const db = await openDb()
    db.transaction(STORE, 'readwrite').objectStore(STORE).put(value, key)
  } catch { /* non-critical local preference */ }
}

async function deleteValue(key: string) {
  try {
    const db = await openDb()
    db.transaction(STORE, 'readwrite').objectStore(STORE).delete(key)
  } catch { /* non-critical local preference */ }
}

function blobUrl(value: Blob | null) { return value ? URL.createObjectURL(value) : null }

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en')
  const [theme, setThemeState] = useState<Theme>('light')
  const [siteIconUrl, setSiteIconUrl] = useState<string | null>(null)
  const [profilePhotoUrl, setProfilePhotoUrl] = useState<string | null>(null)
  const [jupyterIconUrl, setJupyterIconUrl] = useState<string | null>(null)

  useEffect(() => {
    void readValue<Language>('language', 'en').then(setLanguageState)
    void readValue<Theme>('theme', 'light').then(setThemeState)
    void readValue<Blob | null>('siteIcon', null).then(v=>setSiteIconUrl(blobUrl(v)))
    void readValue<Blob | null>('profilePhoto', null).then(v=>setProfilePhotoUrl(blobUrl(v)))
    void readValue<Blob | null>('jupyterIcon', null).then(v=>setJupyterIconUrl(blobUrl(v)))
  }, [])

  useEffect(() => { document.documentElement.dataset.theme = theme }, [theme])

  const replaceUrl=(setter:(v:string|null)=>void,current:string|null,file:File|null)=>{
    if(current) URL.revokeObjectURL(current)
    setter(file?URL.createObjectURL(file):null)
  }

  const value = useMemo<Preferences>(() => ({
    language, theme, siteIconUrl, profilePhotoUrl, jupyterIconUrl,
    setLanguage: (next) => { setLanguageState(next); void writeValue('language', next) },
    setTheme: (next) => { setThemeState(next); void writeValue('theme', next) },
    setSiteIcon: (file) => { replaceUrl(setSiteIconUrl,siteIconUrl,file); void writeValue('siteIcon',file) },
    setProfilePhoto: (file) => { replaceUrl(setProfilePhotoUrl,profilePhotoUrl,file); void writeValue('profilePhoto',file) },
    setJupyterIcon: (file) => { replaceUrl(setJupyterIconUrl,jupyterIconUrl,file); void writeValue('jupyterIcon',file) },
    clearSiteIcon: () => { replaceUrl(setSiteIconUrl,siteIconUrl,null); void deleteValue('siteIcon') },
    clearProfilePhoto: () => { replaceUrl(setProfilePhotoUrl,profilePhotoUrl,null); void deleteValue('profilePhoto') },
    clearJupyterIcon: () => { replaceUrl(setJupyterIconUrl,jupyterIconUrl,null); void deleteValue('jupyterIcon') },
  }), [language, theme, siteIconUrl, profilePhotoUrl, jupyterIconUrl])

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>
}

export function usePreferences() {
  const value = useContext(PreferencesContext)
  if (!value) throw new Error('usePreferences must be used inside PreferencesProvider')
  return value
}
