import React, { Component } from 'react';
import debounce from 'lodash.debounce';
import ClapIcon from './ClapIcon';
import { getFirebase } from '../firebase';
import clapperStyles from '../styles/components/claps.module.scss';

// Learned from
// https://github.com/kyleshevlin/blog/blob/main/src/components/BeardStrokes.js

const LOCAL_STORAGE_KEY = 'keepMaking:highFives';

function getClicksForPostFromLocalStorage(slug) {
  let data = window.localStorage.getItem(LOCAL_STORAGE_KEY);
  let count = 0;

  if (data) {
    data = JSON.parse(data);

    if (data[slug]) {
      count = data[slug];
    }
  }

  return count;
}

function setClicksForPostInLocalStorage(slug, count) {
  let data = window.localStorage.getItem(LOCAL_STORAGE_KEY);
  let update = { [slug]: count };

  if (data) {
    data = JSON.parse(data);
    update = { ...data, [slug]: count };
  }

  window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(update));
}

function addClicksToDatabase(database, slug, count, lastUpdateCount) {
  if (database) {
    database
      .ref(`posts/${slug}`)
      .once('value')
      .then((snapshot) => {
        const value = snapshot.val();
        const currentTotal = value || 0;

        database
          .ref('posts')
          .child(slug)
          // If we don't track and subtract the lastUpdateCount, then if a user
          // leaves and comes back to a post, we'll be adding whatever clicks
          // they had stored in localStorage AGAIN to the database if they choose
          // to like the post some more.
          .set(currentTotal + count - lastUpdateCount);
      });
  }
}

class Claps extends Component {
  state = {
    count: 0,
    database: null,
    lastUpdateCount: 0,
  };

  handleClap = () => {
    this.setState((state) =>
      state.count >= 50 ? null : { count: Math.min(50, state.count + 1) }
    );
  };

  storeClaps = debounce(() => {
    const { slug } = this.props;
    const { count, database, lastUpdateCount } = this.state;

    setClicksForPostInLocalStorage(slug, count);
    addClicksToDatabase(database, slug, count, lastUpdateCount);
    this.setState({ lastUpdateCount: count });
  }, 500);

  componentDidMount() {
    const lazyApp = import('@firebase/app');
    const lazyDatabase = import('@firebase/database');
    const { slug } = this.props;

    Promise.all([lazyApp, lazyDatabase]).then(([firebase]) => {
      const database = getFirebase(firebase).database();
      const localCount = getClicksForPostFromLocalStorage(slug);

      this.setState({
        count: localCount,
        database,
        lastUpdateCount: localCount,
      });
    });
  }

  componentDidUpdate() {
    this.storeClaps();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.count !== this.state.count;
  }

  render() {
    const { count } = this.state;

    return (
      <div className={clapperStyles.clapper}>
        <div className={clapperStyles.wrapper}>
          <div className={clapperStyles.clickArea}>
            <button
              type="button"
              onClick={this.handleClap}
              disabled={count === 50}
              className={clapperStyles.clapBtn}
            >
              <ClapIcon width={40} />
            </button>
            <div>{`+${count}`}</div>
          </div>
          <div>
            Like what I made?
            <br />
            Give me some claps.
          </div>
        </div>
      </div>
    );
  }
}

export default Claps;
