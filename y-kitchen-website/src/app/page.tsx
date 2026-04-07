import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Menu from "@/components/Menu";
import DineIn from "@/components/DineIn";
import GroupMeals from "@/components/GroupMeals";
import Catering from "@/components/Catering";
import CanteenService from "@/components/CanteenService";
import About from "@/components/About";
import Location from "@/components/Location";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Menu />
        <DineIn />
        <GroupMeals />
        <Catering />
        <CanteenService />
        <About />
        <Location />
      </main>
    </>
  );
}
