import Head from 'next/head'
import * as env_config from '../utils/env_config'
import AuthWebInfoCard from '../component/auth/AuthWebInfoCard';
import AuthSignCard from '../component/auth/AuthSignCard';
import genCommonProps from '../utils/gen_common_props';
import useCookie from '../hooks/useCookie';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export async function getServerSideProps() {
  return await genCommonProps()
}


export default function Home(props) {
  // Cookies
  const [userTokenCookie, ] = useCookie('user_token')

  const { push } = useRouter();
  useEffect(() => {
    if(userTokenCookie && userTokenCookie != '')
     push('/profile');
  }, [userTokenCookie]);

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

