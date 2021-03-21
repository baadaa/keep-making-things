import React, { useState } from 'react';
import Helmet from 'react-helmet';
import Header from './Header';
import Info from './info';
import useSiteMetadata from '../static_queries/useSiteMetadata';
import layoutStyles from '../styles/components/layout.module.scss';

export default function Layout({ page, children }) {
  const { title, description } = useSiteMetadata();
  const [showInfo, setShowInfo] = useState(false);
  const toggleInfo = () => setShowInfo(!showInfo);
  const toggleColor = () => {
    document.querySelector('body').classList.toggle('isDark');
  };
  return (
    <section
      className={`${layoutStyles.layout} ${
        page === 'info' && layoutStyles.info_page
      }`}
    >
      <Helmet>
        <html lang="en" />
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
      <Header
        page={page}
        title={title}
        toggleInfo={toggleInfo}
        toggleColor={toggleColor}
      />
      <main className={layoutStyles.content}>{children}</main>
      <Info showInfo={showInfo} toggleInfo={toggleInfo} />
    </section>
  );
}
