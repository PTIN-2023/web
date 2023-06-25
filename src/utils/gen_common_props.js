import * as env_config from "../utils/env_config"

export default async function genCommonProps() {
    const isLocal           = env_config.isLocal();
    const apiEndpoint       = String(          env_config.getApiEndpoint());
    const locationName      = String(isLocal ? env_config.getLocationName()      : "N/A");
    const locationLatitude  = String(isLocal ? env_config.getLocationLatitude()  : "N/A");
    const locationLongitude = String(isLocal ? env_config.getLocationLongitude() : "N/A");
    const mapBoxToken       = String(          env_config.getTokenMapBox());
    const googleToken       = String(          env_config.getTokenGoogleSignIn());
  
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
