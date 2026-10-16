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

  experimental: {
    optimizePackageImports: [
      "react-icons",
      "lucide-react",
      "@heroicons/react",
      "date-fns",
      "lodash",
      "framer-motion",
      "@headlessui/react",
      "react-icons/ai",
      "react-icons/bi",
      "react-icons/bs",
      "react-icons/fa",
      "react-icons/fi",
      "react-icons/gi",
      "react-icons/hi",
      "react-icons/hi2",
      "react-icons/io",
      "react-icons/md",
      "react-icons/pi",
      "react-icons/ri",
      "react-icons/rx",
      "react-icons/sl",
      "react-icons/tb",
      "react-icons/vsc",
    ],
  },

  reactStrictMode: true,
};

export default nextConfig;

