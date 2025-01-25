/** @type {import('next').NextConfig} */

const { i18n } = require("./next-i18next.config.js");

const nextConfig = {
  reactStrictMode: true,
  i18n,

  // Cache'i kapatmak için ayarlar
  experimental: {
    isrMemoryCacheSize: 0, // ISR için bellek cache'ini kapatır
    outputFileTracing: false, // Dosya izleme cache'ini kapatır
  },
  webpack: (config) => {
    // Webpack cache'i devre dışı bırak
    config.cache = false;
    return config;
  },
};

module.exports = nextConfig;
