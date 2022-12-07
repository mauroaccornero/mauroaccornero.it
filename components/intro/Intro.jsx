import ButtonContainer from '../button-container/ButtonContainer';
import styles from './intro.module.css';

function Intro () {
  return (
    <section className={styles.Intro}>
      <div>
        <h1>Hello</h1>
        <h2>I'm <strong>Mauro</strong>, a <strong>Web Developer</strong> based in <strong>Italy</strong>.</h2>
        <ButtonContainer />
      </div>
    </section>
  );
}

export default Intro
