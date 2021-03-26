import React, { Component } from 'react';
import { getFirebase } from '../firebase';
import ClapIcon from './ClapIcon';
import { inflect } from '../utils';
import clapperStyles from '../styles/components/claps.module.scss';

// Learned from
// https://github.com/kyleshevlin/blog/blob/main/src/components/TotalBeardStrokes.js

class TotalClaps extends Component {
  state = {
    count: 0,
    hasFetchedOnce: false,
  };

  componentDidMount() {
    const lazyApp = import('@firebase/app');
    const lazyDatabase = import('@firebase/database');
    const { slug } = this.props;

    Promise.all([lazyApp, lazyDatabase]).then(([firebase]) => {
      const database = getFirebase(firebase).database();

      database.ref(`posts/${slug}`).on('value', (snapshot) => {
        const value = snapshot.val();
        const update = { hasFetchedOnce: true };

        if (value) {
          update.count = value;
        }

        this.setState(update);
      });
    });
  }

  render() {
    const { count, hasFetchedOnce } = this.state;
    const isBrowser = typeof window !== 'undefined';
    const toBottom = () =>
      isBrowser &&
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    return (
      <span
        style={{
          opacity: hasFetchedOnce ? 1 : 0,
        }}
        className={clapperStyles.summary}
      >
        <ClapIcon width={20} onClick={toBottom} style={{ cursor: 'pointer' }} />
        <span className={clapperStyles.num}>
          {count} <span>{inflect('clap')(count)} earned</span>
        </span>
      </span>
    );
  }
}

export default TotalClaps;
