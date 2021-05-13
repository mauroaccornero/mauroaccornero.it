import React from 'react';
/**/
import styles from './footer.module.css';

export const Footer = () => {
  const date = new Date()
  return (
    <footer className={styles.Footer}>
      <div className='container'>
        &copy; {date.getFullYear()} All right reserved - Mauro Accornero -{' '}
        <a href='mailto:info@mauroaccornero.it'>info@mauroaccornero.it</a>- VAT
        01455130052
      </div>
    </footer>
  );
};
