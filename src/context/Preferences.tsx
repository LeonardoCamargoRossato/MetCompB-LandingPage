import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

export type Language = 'en' | 'pt'
export type Theme = 'light' | 'dark'

type Preferences = {
  language: Language
  theme: Theme
  setLanguage: (language: Language) => void
  setTheme: (theme: Theme) => void
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

async function readPref<T>(key: string, fallback: T): Promise<T> {
  try {
    const db = await openDb()
    return await new Promise<T>((resolve) => {
      const tx = db.transaction(STORE, 'readonly')
      const request = tx.objectStore(STORE).get(key)
      request.onsuccess = () => resolve((request.result as T) ?? fallback)
      request.onerror = () => resolve(fallback)
    })
  } catch {
    return fallback
  }
}

async function writePref(key: string, value: string) {
  try {
    const db = await openDb()
    const tx = db.transaction(STORE, 'readwrite')
    tx.objectStore(STORE).put(value, key)
  } catch {
    // Preferences are non-critical; the app still works if IndexedDB is unavailable.
  }
}

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en')
  const [theme, setThemeState] = useState<Theme>('light')

  useEffect(() => {
    void readPref<Language>('language', 'en').then(setLanguageState)
    void readPref<Theme>('theme', 'light').then(setThemeState)
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  const value = useMemo<Preferences>(() => ({
    language,
    theme,
    setLanguage: (next) => { setLanguageState(next); void writePref('language', next) },
    setTheme: (next) => { setThemeState(next); void writePref('theme', next) },
  }), [language, theme])

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>
}

export function usePreferences() {
  const value = useContext(PreferencesContext)
  if (!value) throw new Error('usePreferences must be used inside PreferencesProvider')
  return value
}
