import React from "react";
/**/
import styles from "./footer.module.css";

export const Footer = () => {
  return (
    <footer className={styles.Footer}>
      <div className="container">
        &copy; 2020 All right reserved - Mauro Accornero -{" "}
        <a href="mailto:info@mauroaccornero.it">info@mauroaccornero.it</a>- VAT
        01455130052
      </div>
    </footer>
  );
};
