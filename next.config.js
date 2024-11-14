/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.prismic.io"],
  },
  swcMinify: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },

  redirects: async () => [
    {
      source: "/aula",
      destination: "/aulas",
      permanent: true,
    },
  ],
};

module.exports = nextConfig;
