import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import DineIn from "@/components/DineIn";
import GroupMeals from "@/components/GroupMeals";
import CanteenService from "@/components/CanteenService";
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
        <DineIn />
        <FeaturedMeals />
        <GroupMeals />
        <Menu />
        <Catering />
        <CanteenService />
        <WhyUs />
        <About />
        <Location />
        <FAQ />
        <CTAFooter />
      </main>
      <CTAFooter />
    </>
  );
}
