import { getCookie } from 'cookies-next'
import textDictionaryJson from '../../public/textDictionary.json'

export function getText(key) {
    const localeCookie = getCookie('locale')
    const locale = (typeof localeCookie === 'undefined' ) ? 'es' : JSON.parse(localeCookie)

    if (textDictionaryJson[locale] == undefined)
        return undefined
    else
        return textDictionaryJson[locale][key]
}

export function getTextLocale(key, desiredLocale) {
    const locale = (typeof desiredLocale === 'undefined' ) ? 'es' : desiredLocale

    if (textDictionaryJson[locale] == undefined)
        return undefined
    else
        return textDictionaryJson[locale][key]
}