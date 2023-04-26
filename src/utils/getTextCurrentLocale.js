import useCookie from '../hooks/useCookie';
import textDictionaryJson from '../../public/textDictionary.json'

export default function getTextCurrentLocale(key) {
    const [localeCookie,] = useCookie('locale')
    const locale = (typeof localeCookie === 'undefined' ) ? 'es' : localeCookie

    if (textDictionaryJson[locale] == undefined)
        return "undefined"

    if (textDictionaryJson[locale][key] == undefined)
        return "undefined"

    return textDictionaryJson[locale][key];
}

export function getText(key, passedLocale) {
    const locale = (typeof passedLocale === 'undefined' ) ? 'es' : passedLocale

    if (textDictionaryJson[locale] == undefined)
        return "undefined"

    if (textDictionaryJson[locale][key] == undefined)
        return "undefined"

    return textDictionaryJson[locale][key];
}