const nextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ["image.tmdb.org"],
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
