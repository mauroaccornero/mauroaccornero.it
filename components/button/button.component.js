import React from "react";
import PropTypes from 'prop-types'
/**/
import styles from './button.module.css'

export const Button = props => {
    const { target, href, text} = props
    return <a className={styles.Button} target={target} href={href}>{text}</a>
}

Button.propTypes = {
    href: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    target: PropTypes.string,
}

Button.defaultProps = {
    target: "_blank",
}
