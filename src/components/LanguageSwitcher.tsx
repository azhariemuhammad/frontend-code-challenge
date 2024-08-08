import { Select } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

const LanguageSwitcher = () => {
  const { i18n } = useTranslation()

  const handleLanguageChange = (language: string) => {
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
