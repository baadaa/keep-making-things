import React from 'react';
import Helmet from 'react-helmet';
import Header from './Header';
import useSiteMetadata from '../static_queries/useSiteMetadata';
import layoutStyles from '../styles/components/layout.module.scss';

export default function Layout({ page, bgColor, children }) {
  const { title, description } = useSiteMetadata();
  return (
    <section
      className={`${layoutStyles.layout} ${
        page === 'info' && layoutStyles.info_page
      }`}
      style={{
        backgroundColor: bgColor,
      }}
    >
      <Helmet>
        <html lang="en" />
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
      <Header page={page} title={title} />
      <div className={layoutStyles.content}>{children}</div>
    </section>
  );
}
