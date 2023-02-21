// @ts-check
const { resolve } = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { dir, defaultLoaders }) => {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        modules: [...config.resolve.modules, resolve(dir, "../std")],
        alias: {
          ...config.resolve.alias,
          "@octo-nodes/std": resolve(dir, "../std"),
          '@mui/material': '@mui/joy',
        },
      },
      module: {
        ...config.module,
        rules: [
          ...config.module.rules,
          {
            test: /\.(tsx|ts|js|mjs|jsx)$/,
            include: [
              resolve(dir, "../std")
            ],
            use: defaultLoaders.babel
          }
        ]
      }
    }
  }
}

module.exports = nextConfig
