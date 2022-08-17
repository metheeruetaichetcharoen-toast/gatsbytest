/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  trailingSlash: "ignore",
  siteMetadata: {
    title: "Full-Stack Bootcamp",
    author: "Methee Ruetaichetcharoen",
  },
  /* Your site config here */
  plugins: [
    "gatsby-plugin-sass",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "src",
        path: `${__dirname}/src/`,
      },
    },
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          "gatsby-remark-relative-images",
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 750,
              linkImagesToOriginal: false,
            },
          },
        ],
      },
    },
    {
      resolve: "gatsby-github-trigger-webhook",
      options: {
        githubAPIToken: "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",
        owner: "toasttab",
        repo: "mktg-craft-cms",
        fullyQualifiedRef: "heads/playground/gatsby-test",
        secretKey: "a super secret key, maybe with emojis?",
        addressCallback: "http://localhost/endpoint/for/notifying",
      },
    },
    {
      resolve: `gatsby-plugin-s3`,
      options: {
        //bucketName: "mktg-headless-otl",
        bucketName: "otl-lewisgoulden-test",
        acl: null,
        region: "us-east-1",
      },
    },
  ],
}
