/** @type {import('next').NextConfig} */

module.exports = {
  output: 'standalone',
  async redirects() {
    //Rutas no permitidas para cada rol, en el caso de los usuarios que no esten logeados se redirige al login, para los demas ser redirige a /403.
    const patientRoutes = ['/patients','/assign', '/notifications', '/map', '/inventory', '/orders', '/stats', '/prescriptions'];
    const doctorRoutes = ['/myorders','/assign', '/makeorder', '/map', '/inventory', '/orders', '/stats'];
    const managerRoutes = ['/myorders', '/makeorder', '/patients', '/notifications', '/prescriptions'];
    const unloggedRoutes = ['/myorders', '/assign','/makeorder', '/map', '/inventory', '/orders', '/stats', '/patients', '/notifications', '/profile', '/prescriptions'];
    const redirectPatient = patientRoutes.map((patientRoutes) => ({
      source: patientRoutes,
      has: [
        {
          type: 'cookie',
          key: 'user_role',
          value: '"patient"',
        },
      ],
      destination: '/403',
      permanent: false,
    }));
    const redirectDoctor = doctorRoutes.map((doctorRoutes) => ({
      source: doctorRoutes,
      has: [
        {
          type: 'cookie',
          key: 'user_role',
          value: '"doctor"',
        },
      ],
      destination: '/403',
      permanent: false,
    }));
    const redirectManager = managerRoutes.map((managerRoutes) => ({
      source: managerRoutes,
      has: [
        {
          type: 'cookie',
          key: 'user_role',
          value: '"manager"',
        },
      ],
      destination: '/403',
      permanent: false,
    }));
    const redirectUnlogged = unloggedRoutes.map((unloggedRoutes) => ({
      source: unloggedRoutes,
      missing: [
        {
          type: 'cookie',
          key: 'user_role',
        },
      ],
      destination: '/',
      permanent: false,
    }));
    return redirectPatient.concat(redirectDoctor, redirectManager, redirectUnlogged);
  },
};
