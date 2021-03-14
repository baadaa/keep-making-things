import React from 'react';
import Layout from '../components/Layout';
import infoStyles from '../styles/pages/info.module.scss';
import useSiteMetaData from '../static_queries/useSiteMetadata';

export default function Info() {
  const { infoData } = useSiteMetaData();
  return (
    <Layout page="info" bgColor={infoData.background_color}>
      <section className={infoStyles.info_blurb}>
        <h2>
          <div dangerouslySetInnerHTML={{ __html: infoData.description }} />
        </h2>
        <ul>
          <li>
            <p>
              Website:{' '}
              <a href={infoData.contact.website}>{infoData.contact.website}</a>
            </p>
          </li>
          <li>
            <p>
              Email:{' '}
              <a href={`mailto:${infoData.contact.email}`}>
                {infoData.contact.email}
              </a>
            </p>
          </li>
          <li>
            <p>
              Github: @
              <a href={`https://github.com/${infoData.contact.github_handle}`}>
                {infoData.contact.github_handle}
              </a>
            </p>
          </li>
        </ul>
      </section>
    </Layout>
  );
}
