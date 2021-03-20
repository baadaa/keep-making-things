module.exports = {
  // this makes the site config available to forestry cms
  siteMetadata: {
    title: 'Keep Making Things',
    description: 'Keep making and keep documenting them. A personal project',
    repoUrl: 'https://github.com/baadaa/keep-making-things.git',
    about: `Bumhan Yu is making things`,
    contact: { email: 'bumhan.yu@gmail.com', github_handle: 'baadaa' },
  },
  plugins: [
    'gatsby-plugin-sass',
    'gatsby-transformer-remark',
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-yaml',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'src',
        path: `${__dirname}/src/`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'posts',
        path: `${__dirname}/content/posts`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: 'images',
        path: `${__dirname}/content/images`,
      },
    },
    {
      resolve: 'gatsby-plugin-sharp',
      options: {
        defaultQuality: 75,
      },
    },
    `gatsby-transformer-sharp`,
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          'gatsby-remark-relative-images',
          'gatsby-remark-normalize-paths',
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1000,
              linkImagesToOriginal: false,
            },
          },
        ],
      },
    },
  ],
};
