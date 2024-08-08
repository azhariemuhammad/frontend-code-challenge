import { Select } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import { useTranslation } from 'react-i18next'
import { languageAtom } from '../atom/languageAtom'
import { useEffect } from 'react'

const LanguageSwitcher = () => {
  const [_, setLanguage] = useAtom(languageAtom)
  const { i18n } = useTranslation()

  useEffect(() => {
    const storedLanguage = localStorage.getItem('language')
    const detectedLanguage = storedLanguage?.replace(/"/g, '') || 'en'

    i18n.changeLanguage(detectedLanguage)
  }, [])

  const handleLanguageChange = (language: string) => {
    console.log({ language })
    setLanguage(language)
    i18n.changeLanguage(language)
  }

  return (
    <Select value={i18n.language} onChange={e => handleLanguageChange(e.target.value)} size='xs'>
      <option value='en'>English</option>
      <option value='zh-HK'>繁體中文</option>
    </Select>
  )
}

export default LanguageSwitcher
