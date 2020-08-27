import React from "react";
import { Button } from "../button/button.component";
/**/
import styles from './button-container.module.css'

export const ButtonContainer = props => {
    return (
        <ul className={styles.ButtonContainer}>
              <li>
                <Button href="https://www.linkedin.com/in/mauroaccornero/" text="Linkedin" />
              </li>
              <li>
                <Button href="https://github.com/mauroaccornero" text="Github" />
              </li>
            </ul>
    )
}
