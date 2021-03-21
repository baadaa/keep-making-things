import React from 'react';
import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
import Layout from '../components/Layout';
import useBlogData from '../static_queries/useBlogData';
import blogTemplateStyles from '../styles/templates/blog.module.scss';
// this component handles the blur img & fade-ins

export default function Blog({ data }) {
  const dataProp = data.markdownRemark;
  const allBlogData = useBlogData();

  function getNextSlug(slug) {
    const allSlugs = allBlogData.map((blog) => blog.node.fields.slug);
    const nextSlug = allSlugs[allSlugs.indexOf(slug) + 1];
    if (nextSlug !== undefined && nextSlug !== '') {
      return nextSlug;
    }
    return false;
  }
  function getPrevSlug(slug) {
    const allSlugs = allBlogData.map((blog) => blog.node.fields.slug);
    const prevSlug = allSlugs[allSlugs.indexOf(slug) - 1];
    if (prevSlug !== undefined && prevSlug !== '') {
      return prevSlug;
    }
    return false;
  }

  const nextPostSlug = getNextSlug(dataProp.fields.slug);
  const prevPostSlug = getPrevSlug(dataProp.fields.slug);

  return (
    <Layout>
      <article className={blogTemplateStyles.blog}>
        <figure className={blogTemplateStyles.blog__hero}>
          {dataProp.frontmatter.hero_image.childImageSharp.fluid && (
            <Img
              fluid={dataProp.frontmatter.hero_image.childImageSharp.fluid}
              alt={dataProp.frontmatter.title}
            />
          )}
        </figure>
        <div className={blogTemplateStyles.blog__info}>
          <h1>{dataProp.frontmatter.title}</h1>
          <time dateTime={dataProp.frontmatter.isoDate}>
            {dataProp.frontmatter.formattedDate}
          </time>
        </div>
        <div className={blogTemplateStyles.blog__body}>
          <p
            style={{
              padding: '2rem',
              marginBottom: '2rem',
              backgroundColor: '#f0f0f0',
            }}
          >
            {dataProp.frontmatter.intro}
          </p>
        </div>
        <div
          className={blogTemplateStyles.blog__body}
          dangerouslySetInnerHTML={{ __html: dataProp.html }}
        />
        <nav className={blogTemplateStyles.blog__footer}>
          {prevPostSlug && (
            <Link
              to={`/${prevPostSlug}`}
              className={blogTemplateStyles.footer__prev}
              style={{ marginRight: 'auto' }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                style={{ transform: 'rotate(180deg)' }}
                version="1.1"
                x="0px"
                y="0px"
                viewBox="0 0 26 26"
                enableBackground="new 0 0 26 26"
              >
                <path d="M23.021,12.294l-8.714-8.715l-1.414,1.414l7.007,7.008H2.687v2h17.213l-7.007,7.006l1.414,1.414l8.714-8.713  C23.411,13.317,23.411,12.685,23.021,12.294z" />
              </svg>{' '}
              Newer post
            </Link>
          )}
          {nextPostSlug && (
            <Link
              to={`/${nextPostSlug}`}
              className={blogTemplateStyles.footer__next}
              style={{ marginLeft: 'auto' }}
            >
              Older post{' '}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                x="0px"
                y="0px"
                viewBox="0 0 26 26"
                enableBackground="new 0 0 26 26"
              >
                <path d="M23.021,12.294l-8.714-8.715l-1.414,1.414l7.007,7.008H2.687v2h17.213l-7.007,7.006l1.414,1.414l8.714-8.713  C23.411,13.317,23.411,12.685,23.021,12.294z" />
              </svg>
            </Link>
          )}
        </nav>
      </article>
    </Layout>
  );
}

// dynamic page query, must occur within each post context
// $slug is made available by context from createPages call in gatsby-node.js
export const getPostData = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      fields {
        slug
      }
      frontmatter {
        title
        formattedDate: date(formatString: "MMMM Do, YYYY")
        isoDate: date(formatString: "YYYY-MM-DD")
        intro
        hero_image {
          publicURL
          childImageSharp {
            fluid(maxWidth: 1500) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      html
    }
  }
`;
