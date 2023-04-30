/** @type {import('next').NextConfig} */
module.exports = {
  output: 'standalone',
  async redirects() {
    return [      
      /**
       * "Patient" Redirects
       */
      
      {
        source: '/patients', 
        has: [
          {
            type: 'cookie',
            key: 'user_role',
            value: '"patient"',
          },
        ],
        permanent: false,
        destination: '/403',
      },
      {
        source: '/notifications', 
        has: [
          {
            type: 'cookie',
            key: 'user_role',
            value: '"patient"',
          },
        ],
        permanent: false,
        destination: '/403',
      },
      {
        source: '/map', 
        has: [
          {
            type: 'cookie',
            key: 'user_role',
            value: '"patient"',
          },
        ],
        permanent: false,
        destination: '/403',
      },
      {
        source: '/inventory', 
        has: [
          {
            type: 'cookie',
            key: 'user_role',
            value: '"patient"',
          },
        ],
        permanent: false,
        destination: '/403',
      },
      {
        source: '/order', 
        has: [
          {
            type: 'cookie',
            key: 'user_role',
            value: '"patient"',
          },
        ],
        permanent: false,
        destination: '/403',
      },
      {
        source: '/stats', 
        has: [
          {
            type: 'cookie',
            key: 'user_role',
            value: '"patient"',
          },
        ],
        permanent: false,
        destination: '/403',
      },
      /**
       * "Doctor" Redirects
       */

      // if the source, query, and cookie are matched,
      // this redirect will be applied
      {
        source: '/myorders', 
        has: [
          {
            type: 'cookie',
            key: 'user_role',
            value: '"doctor"',
          },
        ],
        permanent: false,
        destination: '/403',
      },
      {
        source: '/makeorder', 
        has: [
          {
            type: 'cookie',
            key: 'user_role',
            value: '"doctor"',
          },
        ],
        permanent: false,
        destination: '/403',
      },
      {
        source: '/map', 
        has: [
          {
            type: 'cookie',
            key: 'user_role',
            value: '"doctor"',
          },
        ],
        permanent: false,
        destination: '/403',
      },
      {
        source: '/inventory', 
        has: [
          {
            type: 'cookie',
            key: 'user_role',
            value: '"doctor"',
          },
        ],
        permanent: false,
        destination: '/403',
      },
      {
        source: '/order', 
        has: [
          {
            type: 'cookie',
            key: 'user_role',
            value: '"doctor"',
          },
        ],
        permanent: false,
        destination: '/403',
      },
      {
        source: '/stats', 
        has: [
          {
            type: 'cookie',
            key: 'user_role',
            value: '"doctor"',
          },
        ],
        permanent: false,
        destination: '/403',
      },

      /**
       * "Manager" Redirects
       * 
       */
      {
        source: '/myorders', 
        has: [
          {
            type: 'cookie',
            key: 'user_role',
            value: '"manager"',
          },
        ],
        permanent: false,
        destination: '/403',
      },
      {
        source: '/makeorder', 
        has: [
          {
            type: 'cookie',
            key: 'user_role',
            value: '"manager"',
          },
        ],
        permanent: false,
        destination: '/403',
      },
      {
        source: '/"patients"', 
        has: [
          {
            type: 'cookie',
            key: 'user_role',
            value: '"manager"',
          },
        ],
        permanent: false,
        destination: '/403',
      },
      {
        source: '/notifications', 
        has: [
          {
            type: 'cookie',
            key: 'user_role',
            value: '"manager"',
          },
        ],
        permanent: false,
        destination: '/403',
      },

    ]
  },
}
