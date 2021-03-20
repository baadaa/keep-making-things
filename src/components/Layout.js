import React, { useState } from 'react';
import Helmet from 'react-helmet';
import Header from './Header';
import Info from './info';
import useSiteMetadata from '../static_queries/useSiteMetadata';
import layoutStyles from '../styles/components/layout.module.scss';

export default function Layout({ page, bgColor, children }) {
  const { title, description } = useSiteMetadata();
  const [showInfo, setShowInfo] = useState(false);
  const toggleInfo = () => setShowInfo(!showInfo);
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
      <Header page={page} title={title} toggleInfo={toggleInfo} />
      <main className={layoutStyles.content}>{children}</main>
      <Info showInfo={showInfo} toggleInfo={toggleInfo} />
    </section>
  );
}
