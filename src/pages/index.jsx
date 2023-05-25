import Head from 'next/head'
import * as env_config from '../utils/env_config'
import AuthWebInfoCard from '../component/auth/AuthWebInfoCard';
import AuthSignCard from '../component/auth/AuthSignCard';

export async function getServerSideProps() {
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

export default function Home(props) {

  return (
    <>
      <Head>
        <title>TransMed</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="media/logo/favicon.ico" />
      </Head>
      <main>
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <div className="flex w-full max-w-6xl">
            <AuthWebInfoCard/>
            <AuthSignCard/>
          </div>
        </div>
      </main>
    </>
  )
}

