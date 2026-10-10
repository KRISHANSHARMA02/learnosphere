/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
    return [
      {
        source: '/Mathematicstopic/missing-numbers-',
        destination: '/Mathematicstopic/missing-numbers',
        permanent: true,
      },
      {
        source: '/Mathematicstopic/prime-factorization-',
        destination: '/Mathematicstopic/prime-factorization',
        permanent: true,
      },
      {
        source: '/Mathematicstopic/square-root-of-7-',
        destination: '/Mathematicstopic/square-root-of-7',
        permanent: true,
      },
    ];
  },
  images: {
     unoptimized: true,
    qualities: [100], // allow quality=100
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'http',
        hostname:  'localhost', 
      },
      {
        protocol: 'https',
        hostname:  'blogs.learnosphere.in', 
      },
      {
        protocol: 'https',
        hostname:  'learnosphere.in', 

      },
      {
        protocol: 'https',
        hostname: 'learnosphere.s3.ap-south-1.amazonaws.com',
      }
    ],
    
  },
  
    eslint: {
    ignoreDuringBuilds: true, // ← disables ESLint in CI/production builds
  },
  

  reactStrictMode: true,
};

export default nextConfig;

