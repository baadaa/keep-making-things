import { graphql, useStaticQuery } from 'gatsby';

export default function useSiteMetadata() {
  const data = useStaticQuery(graphql`
    query getMetadata {
      site {
        siteMetadata {
          title
          description
          repoUrl
          infoData {
            contact {
              website
              email
              github_handle
            }
            description
            background_color
          }
        }
      }
    }
  `);
  return data.site.siteMetadata;
}
