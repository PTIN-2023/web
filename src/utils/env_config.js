export function getNodeEnv() {
    return (process.env.NODE_ENV)
}

export function getApiEndpoint() {
    return (process.env.API_URL)
}

export function getApiInternalEndpoint() {
    return (process.env.API_URL_INTERNAL)
}

export function isLocal() {
    return (process.env.IS_LOCAL == 1)
}

export function getLocationName() {
    if (isLocal())
        return (process.env.LOCATION_NAME)
    else
        console.error("Tried getting location name, but the enviroment is not local.")
}

export function getLocationLatitudeMin() {
    if (isLocal())
        return (process.env.LOCATION_LATITUDE_MIN)
    else
        console.error("Tried getting location latitude, but the enviroment is not local.")
}

export function getLocationLatitudeMax() {
    if (isLocal())
        return (process.env.LOCATION_LATITUDE_MAX)
    else
        console.error("Tried getting location latitude, but the enviroment is not local.")
}

export function getLocationLatitude() {
    if (isLocal())
        return (process.env.LOCATION_LATITUDE)
    else
        console.error("Tried getting location latitude, but the enviroment is not local.")
}

export function getLocationLongitudeMin() {
    if (isLocal())
        return (process.env.LOCATION_LONGITUDE_MIN)
    else
        console.error("Tried getting location longitude, but the enviroment is not local.")
}

export function getLocationLongitudeMax() {
    if (isLocal())
        return (process.env.LOCATION_LONGITUDE_MAX)
    else
        console.error("Tried getting location longitude, but the enviroment is not local.")
}

export function getLocationLongitude() {
    if (isLocal())
        return (process.env.LOCATION_LONGITUDE)
    else
        console.error("Tried getting location longitude, but the enviroment is not local.")
}

export function getTokenMapBox() {
    return (process.env.TOKEN_MAPBOX)
}

export function getTokenGoogleSignIn() {
    return (process.env.TOKEN_GOOGLE_SIGNIN)
}
