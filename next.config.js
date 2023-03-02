/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BACKEND_URI: 'http://localhost:4000',
    PORT: 3000,
    JWT_TOKEN_KEY: 'a very secret key meow! -w-'
  }
}

module.exports = nextConfig
