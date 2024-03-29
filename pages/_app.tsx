import Head from "next/head";
import { AppProps } from "next/app";
import "./styles.css";
import PropTypes from "prop-types";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Web Developer Freelance - Mauro Accornero</title>
        <meta property="og:title" content="Web Developer Freelance - Mauro Accornero" key="title" />
        <meta property="og:type" content="website" key="og:type" />
        <meta name="description" content="Web Developer Freelance based in Milan, Mauro Accornero" key="description" />
        <meta property="og:url" content="https://www.mauroaccornero.it" key="og:url" />
        <meta
          property="og:description"
          content="Web Developer Freelance based in Milan, Mauro Accornero"
          key="og:description"
        />
        <meta property="og:image" content="/static/web_developer_freelance_mauro_accornero.png" key="og:image" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.shape({}),
};

export default App;
