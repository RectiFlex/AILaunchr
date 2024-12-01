import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Stats from '../components/Stats';
import ApplicationProcess from '../components/ApplicationProcess';
import Testimonials from '../components/Testimonials';
import CTA from '../components/CTA';

const LandingPage = () => {
  return (
    <>
      <Hero />
      <Features />
      <Stats />
      <ApplicationProcess />
      <Testimonials />
      <CTA />
    </>
  );
};

export default LandingPage;