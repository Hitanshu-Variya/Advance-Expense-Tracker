import Navbar from '../Components/HomePage/HomePage.Navbar.tsx'
import HeroSection from '../Components/HomePage/HomePage.HeroSection.tsx'
import FeatureSection from '../Components/HomePage/HomePage.FeatureSection.tsx'

const LandingPage = () => {
  return (
    <div className="mx-auto px-4 md:px-14 pb-6 bg-black overflow-hidden">
      <Navbar />
      <HeroSection />
      <FeatureSection />
    </div>
  );
}

export default LandingPage;
