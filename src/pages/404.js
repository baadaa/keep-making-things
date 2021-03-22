import React from 'react';
import { Link } from 'gatsby';
import Layout from '../components/Layout';
import notFoundStyles from '../styles/pages/404.module.scss';

export default function NotFound() {
  return (
    <Layout>
      <div className={notFoundStyles.notFound__container}>
        <Link to="/">
          <p>Sorry, couldn't find that page.</p>
        </Link>
      </div>
    </Layout>
  );
}
