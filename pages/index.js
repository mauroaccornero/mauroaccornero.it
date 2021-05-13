import React from 'react';
import { Page } from '../components/page/page.component';
import { Footer } from '../components/footer/footer.component';
import { Intro } from '../components/intro/intro.component';
import {Certifications} from '../components/certifications/certifications.component';
/**/

const Homepage = () => {
  return (
      <Page>
        <Intro />
          <Certifications />
        <Footer />
      </Page>
  );
};

export default Homepage;
