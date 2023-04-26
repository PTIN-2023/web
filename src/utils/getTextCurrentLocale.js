import useCookie from '../hooks/useCookie';
import textDictionaryJson from '../../public/textDictionary.json'

export default function getTextCurrentLocale(key) {
    const [localeCookie,] = useCookie('locale')
    const locale = (typeof localeCookie === 'undefined' ) ? 'es' : localeCookie

    if (textDictionaryJson[locale] == undefined)
        return undefined
    else
        return textDictionaryJson[locale][key]
}
