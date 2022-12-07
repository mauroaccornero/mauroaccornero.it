import Button from '../button/Button';
import styles from './button-container.module.css'

function ButtonContainer () {
    return (
        <ul className={styles.ButtonContainer}>
              <li>
                <Button href='https://www.linkedin.com/in/mauroaccornero/' text='Linkedin' />
              </li>
              <li>
                <Button href='https://github.com/mauroaccornero' text='Github' />
              </li>
            </ul>
    )
}

export default ButtonContainer
