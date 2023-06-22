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
    return (process.env.LOCATION_NAME)
}

export function getLocationLatitudeMin() {
    return (process.env.LOCATION_LATITUDE_MIN)
}

export function getLocationLatitudeMax() {
    return (process.env.LOCATION_LATITUDE_MAX)
}

export function getLocationLatitude() {
    return (process.env.LOCATION_LATITUDE)
}

export function getLocationLongitudeMin() {
    return (process.env.LOCATION_LONGITUDE_MIN)
}

export function getLocationLongitudeMax() {
    return (process.env.LOCATION_LONGITUDE_MAX)
}

export function getLocationLongitude() {
    return (process.env.LOCATION_LONGITUDE)
}

export function getTokenMapBox() {
    return (process.env.TOKEN_MAPBOX)
}

export function getTokenGoogleSignIn() {
    return (process.env.TOKEN_GOOGLE_SIGNIN)
}
