/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
      return [
        {
          source: '/',
          destination: '/plano',
          permanent: true,
        },
      ];
    },
  };
  
  export default nextConfig;