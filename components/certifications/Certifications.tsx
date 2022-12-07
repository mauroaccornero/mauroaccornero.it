import Image from "next/image";
import styles from "./certifications.module.css";
import JSNADLogo from "../../public/images/jsnad-openjs-node-js-application-developer.png";
import lfw211Logo from "../../public/images/lfw211-node-js-application-development.png";

function Certifications() {
  return (
    <section className={styles.Certifications}>
      <div>
        <h3>Courses & Certifications</h3>
        <ul>
          <li>
            <a
              href="https://www.credly.com/badges/8bb95258-c3c5-4636-964b-1fabaf52075a/public_url"
              target="_blank"
              title="Node.js® Application Developer Certification"
              rel="noreferrer"
            >
              <Image src={JSNADLogo} height={250} width={250} alt="Node.js® Application Developer Certification" />
              <div className={styles.certificationDescription}>
                JSNAD: OpenJS Node.js Application Developer
                <br />
                Issued by The Linux Foundation
              </div>
            </a>
          </li>
          <li>
            <a
              href="https://www.credly.com/badges/b4067d4a-ffc5-4f54-8dbe-d88686b48880/public_url"
              target="_blank"
              title="Node.js® Application Developer"
              rel="noreferrer"
            >
              <Image src={lfw211Logo} height={250} width={250} alt="Node.js® Application Developer" />
              <div className={styles.certificationDescription}>
                LFW211: Node.js Application Development
                <br />
                Issued by The Linux Foundation
              </div>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Certifications;
