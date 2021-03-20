import { graphql, useStaticQuery } from 'gatsby';

export default function useBlogData() {
  const data = useStaticQuery(graphql`
    query getBlogData {
      allMarkdownRemark(sort: { order: DESC, fields: frontmatter___date }) {
        edges {
          node {
            id
            frontmatter {
              formattedDate: date(formatString: "MMMM Do, YYYY")
              isoDate: date(formatString: "YYYY-MM-DD")
              title
              hero_image {
                childImageSharp {
                  fluid(maxWidth: 800) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
            excerpt(pruneLength: 120)
            fields {
              slug
            }
          }
        }
      }
    }
  `);
  return data.allMarkdownRemark.edges;
}
