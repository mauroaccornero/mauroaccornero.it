import React from "react";
import { Page } from "../components/page/page.component";
import { Footer } from "../components/footer/footer.component";
import { Intro } from "../components/intro/intro.component";
/**/

const Homepage = () => {
  return (
      <Page>
        <Intro />
        <Footer />
      </Page>
  );
};

export default Homepage;
