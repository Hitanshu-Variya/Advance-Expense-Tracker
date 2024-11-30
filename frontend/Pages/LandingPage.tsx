import Navbar from '../Components/HomePage/HomePage.Navbar.tsx'
import HeroSection from '../Components/HomePage/HomePage.HeroSection.tsx'
import FeatureSection from '../Components/HomePage/HomePage.FeatureSection.tsx'
import FooterSection from '../Components/HomePage/HomePage.FooterSection.tsx'
import { useRef } from 'react';

const LandingPage = () => {
  const featuresRef = useRef<HTMLElement | null>(null);

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="mx-auto px-4 md:px-14 pb-6 bg-black overflow-hidden">
      <Navbar onFeaturesClick={scrollToFeatures} />
      <HeroSection />
      <section ref={featuresRef} id="features">
        <FeatureSection />
      </section>
      <FooterSection />
    </div>
  );
}

export default LandingPage;
