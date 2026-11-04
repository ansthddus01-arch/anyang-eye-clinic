import { Footer } from "@/components/Footer";
import { FromAbove } from "@/components/FromAbove";
import { Hero } from "@/components/Hero";
import { Mission } from "@/components/Mission";
import { Nav } from "@/components/Nav";
import { Specialties } from "@/components/Specialties";
import { Stories } from "@/components/Stories";
import { Vision } from "@/components/Vision";
import { Visit } from "@/components/Visit";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Vision />
        <Mission />
        <FromAbove />
        <Stories />
        <Specialties />
        <Visit />
      </main>
      <Footer />
    </>
  );
}
