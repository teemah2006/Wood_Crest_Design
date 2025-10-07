import HeroSection from "./components/landing-page/LandingHero";
import SignatureSection from "./components/landing-page/SignatureSection";
import ProductsCategories from "./components/landing-page/ProductCategories";
import GiveawaySection from "./components/landing-page/GiveawaySection";
import BlogSection from "./components/landing-page/BlogSection";
export default function Home() {
 return(
    <div className="w-full">
      <HeroSection/>
      <SignatureSection/>
      <ProductsCategories/>
      <GiveawaySection/>
      <BlogSection/>

    </div>
  );
}
