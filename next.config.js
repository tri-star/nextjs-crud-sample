/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    reactRemoveProperties: { properties: ['^data-test'] },
    removeConsole: {
      exclude: ['info', 'warn', 'error'],
    },
    emotion: {
    },
  }
}

module.exports = nextConfig
