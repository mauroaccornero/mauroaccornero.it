import React from "react";
import Head from "next/head";
/**/
import styles from "./page.module.css";

export const Page = (props) => {
  return (
    <div className={styles.Page}>
      <Head>
        <title>Web Developer Freelance - Mauro Accornero</title>
        <meta property="og:title" content="Web Developer Freelance - Mauro Accornero" key="title" />
        <meta property="og:type" content="website" key="og:type" />
        <meta name="description" content="Web Developer Freelance based in Milan, Mauro Accornero" key="description" />
        <meta property="og:url" content="https://www.mauroaccornero.it" key="og:url" />
        <meta property="og:description" content="Web Developer Freelance based in Milan, Mauro Accornero" key="og:description" />
        <meta property="og:image" content="/static/web_developer_freelance_mauro_accornero.png" key="og:image" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, user-scalable=no"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Prompt:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link rel="shortcut icon" href="/static/favicon.ico" />
      </Head>
      {props.children}
    </div>
  );
};
