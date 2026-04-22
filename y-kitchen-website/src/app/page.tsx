import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedMeals from "@/components/FeaturedMeals";
import Menu from "@/components/Menu";
import WhyUs from "@/components/WhyUs";
import DineIn from "@/components/DineIn";
import GroupMeals from "@/components/GroupMeals";
import Catering from "@/components/Catering";
import CanteenService from "@/components/CanteenService";
import About from "@/components/About";
import FAQ from "@/components/FAQ";
import Location from "@/components/Location";
import CTAFooter from "@/components/CTAFooter";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <FeaturedMeals />
        <Menu />
        <WhyUs />
        <DineIn />
        <GroupMeals />
        <Catering />
        <CanteenService />
        <About />
        <FAQ />
        <Location />
      </main>
      <CTAFooter />
    </>
  );
}
