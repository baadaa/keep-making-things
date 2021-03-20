import React from 'react';
import { AiFillGithub, AiFillMail } from 'react-icons/ai';
import { FaMousePointer } from 'react-icons/fa';
import infoStyles from '../styles/pages/info.module.scss';

export default function Info({ showInfo, toggleInfo }) {
  return (
    showInfo && (
      <div className={infoStyles.wrapper}>
        <button
          className={infoStyles.closeButton}
          type="button"
          onClick={toggleInfo}
        >
          Close
        </button>
        <section className={infoStyles.info_blurb}>
          <p>A personal project to keep documenting random stuff I make.</p>
          <ul>
            <li>
              <p>
                <FaMousePointer style={{ marginRight: '5px' }} />
                <a href="https://bald.design">bald dot design</a>
              </p>
            </li>
            <li>
              <p
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <AiFillMail style={{ marginRight: '5px' }} />{' '}
                <a href="mailto:bumhan.yu@gmail.com">
                  hello at bald dot design
                </a>
              </p>
            </li>
            <li>
              <p
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <AiFillGithub style={{ marginRight: '5px' }} />{' '}
                <a href="https://github.com/baadaa">baadaa</a>
              </p>
            </li>
          </ul>
        </section>
      </div>
    )
  );
}
