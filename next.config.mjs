/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'firebasestorage.googleapis.com',
      'ik.imagekit.io' // 👈 add this
    ],
  },
};

export default nextConfig;
