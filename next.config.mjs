/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  reactStrictMode: true,
  images: {
    domains: ['images.icon-icons.com','images.seeklogo.com', 'res.cloudinary.com '], // <--- add your icon host here
  },
};

export default nextConfig;


