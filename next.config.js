module.exports = {
  redirects: async () => {
    return [
      {
        source: '/bephrem',
        destination: 'https://bephrem.com',
        permanent: true
      }
    ];
  },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx']
};
