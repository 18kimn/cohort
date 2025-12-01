module.exports = {
  async redirects() {
    return [
      {
        source: "/fishes",
        destination: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        permanent: true,
      },
      {
        source: "/fish-names",
        destination: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        permanent: true,
      },
    ];
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};
