import styles from './footer.module.css';

function Footer () {
  const date = new Date()
  const year = date.getFullYear()

  return (
    <footer className={styles.Footer}>
      <div className='container'>
        &copy; {year} All right reserved - Mauro Accornero -{' '}
        <a href='mailto:info@mauroaccornero.it'>info@mauroaccornero.it</a>- VAT
        01455130052
      </div>
    </footer>
  );
};

export default Footer
