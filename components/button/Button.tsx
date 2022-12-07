import PropTypes from "prop-types";
import styles from "./button.module.css";

interface IButtonProps {
  target: string;
  href: string;
  text: string;
}

function Button({ target, href, text }: IButtonProps) {
  return (
    <a className={styles.Button} target={target} href={href}>
      {text}
    </a>
  );
}

Button.propTypes = {
  href: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  target: PropTypes.string,
};

Button.defaultProps = {
  target: "_blank",
};

export default Button;
