/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    return {
      ...config, resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          '@mui/material': '@mui/joy',
        },
      },
    }
  }
}

module.exports = nextConfig
