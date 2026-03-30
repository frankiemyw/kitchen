import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhyUs from "@/components/WhyUs";
import FeaturedMeals from "@/components/FeaturedMeals";
import Menu from "@/components/Menu";
import Catering from "@/components/Catering";
import About from "@/components/About";
import Location from "@/components/Location";
import FAQ from "@/components/FAQ";
import CTAFooter from "@/components/CTAFooter";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <WhyUs />
        <FeaturedMeals />
        <Menu />
        <Catering />
        <About />
        <Location />
        <FAQ />
      </main>
      <CTAFooter />
    </>
  );
}
