// @ts-check
 
/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
}

module.exports = {
  reactStrictMode: true,
  // Add the following lines
  rewrites: async () => [
    {
      source: '/api/users',
      destination: 'http://localhost:3001/api/users',
    },
  ],
};
