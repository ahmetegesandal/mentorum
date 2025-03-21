/** @type {import('next').NextConfig} */

const { i18n } = require("./next-i18next.config.js");

const nextConfig = {
  reactStrictMode: true,
  i18n,

  webpack: (config) => {
    // Webpack cache'i devre dışı bırak
    config.cache = false;
    return config;
  },
};

module.exports = nextConfig;
