import React, { useState } from 'react';
import Helmet from 'react-helmet';
import Header from './Header';
import Info from './info';
import layoutStyles from '../styles/components/layout.module.scss';
import useSiteMetadata from '../static_queries/useSiteMetadata';

export default function Layout({
  seo = {
    title: 'Keep making things',
    description: 'A personal project to keep documenting random stuff I make.',
    image: '/title.png',
  },
  children,
  location = {
    pathname: '/',
  },
}) {
  const { title, description, image } = seo;
  const { siteUrl } = useSiteMetadata();
  const [showInfo, setShowInfo] = useState(false);
  const toggleInfo = () => setShowInfo(!showInfo);
  const toggleColor = () => {
    document.querySelector('body').classList.toggle('isDark');
  };
  return (
    <section className={layoutStyles.layout}>
      <Helmet>
        <html lang="en" />
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta name="twitter:title" content={title} />
        <meta name="description" content={description} />
        <meta name="twitter:description" content={description} />
        <meta property="og:description" content={description} />
        <meta name="image" content={`${siteUrl}${image}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:image" content={`${siteUrl}${image}`} />
        <meta name="twitter:image" content={`${siteUrl}${image}`} />
        <meta property="og:url" content={`${siteUrl}${location.pathname}`} />
      </Helmet>
      <Header toggleInfo={toggleInfo} toggleColor={toggleColor} />
      <main className={layoutStyles.content}>{children}</main>
      <Info showInfo={showInfo} toggleInfo={toggleInfo} />
    </section>
  );
}
