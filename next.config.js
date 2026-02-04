/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // ⚠️ Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },
  images: {
    domains: [
      'localhost',
      'your-domain.com', // Replace with actual domain
      'your-supabase-project.supabase.co', // For Supabase Storage images
    ],
    formats: ['image/avif', 'image/webp'],
  },
  
  // Enable React strict mode for better error catching
  reactStrictMode: true,
  
  // Disable powered by header for security
  poweredByHeader: false,
  
  // Compiler options
  compiler: {
    // Remove console logs in production
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  
  // Environment variables to expose to client
  env: {
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || "Fresh Lab'O",
  },
  
  // Headers for security
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
        ],
      },
    ];
  },
  
  // Redirects
  async redirects() {
    return [
      // Example redirect - customize as needed
      // {
      //   source: '/home',
      //   destination: '/',
      //   permanent: true,
      // },
    ];
  },
};

module.exports = nextConfig;
