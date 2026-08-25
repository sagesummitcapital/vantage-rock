import AmbientDots from "@/components/AmbientDots";
import Nav from "@/components/Nav";
import Hero from "@/components/sections/Hero";
import FiveProblems from "@/components/sections/FiveProblems";
import TheShift from "@/components/sections/TheShift";
import Diagnostic from "@/components/sections/Diagnostic";
import Packages from "@/components/sections/Packages";
import About from "@/components/sections/About";
import FinalCTA from "@/components/sections/FinalCTA";
import Impact from "@/components/sections/Impact";
import FAQ from "@/components/sections/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <AmbientDots />
      <main id="main" className="relative z-10 min-h-screen bg-transparent text-ink">
        <Nav />
        <Hero />
        <FiveProblems />
        <TheShift />
        <Diagnostic />
        <Packages />
        <About />
        <FinalCTA />
        <Impact />
        <FAQ />
        <Footer />
      </main>
    </>
  );
}
