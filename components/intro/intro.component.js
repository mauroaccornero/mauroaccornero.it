import React from 'react';
import { ButtonContainer } from '../button-container/button-container.component';
/**/
import styles from './intro.module.css';

export const Intro = () => {
  return (
    <section className={styles.Intro}>
      <div>
        <h1>Hello</h1>
        <h2>I'm <strong>Mauro</strong>, a <strong>Web Developer</strong> based in <strong>Milan</strong>.</h2>
        <ButtonContainer />
      </div>
    </section>
  );
};
