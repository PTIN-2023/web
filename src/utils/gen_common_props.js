import * as env_config from "../utils/env_config"

export default async function genCommonProps() {
    const isLocal           = env_config.isLocal();
    const apiEndpoint       = String(env_config.getApiEndpoint());
    const locationName      = String(env_config.getLocationName());
    const locationLatitude  = String(env_config.getLocationLatitude());
    const locationLongitude = String(env_config.getLocationLongitude());
    const mapBoxToken       = String(env_config.getTokenMapBox());
    const googleToken       = String(env_config.getTokenGoogleSignIn());
  
    return {
      props: { 
        isLocal,
        apiEndpoint,
        locationName,
        locationLatitude,
        locationLongitude,
        mapBoxToken,
        googleToken
      }
    }
}
