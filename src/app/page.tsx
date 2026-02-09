import Hero from '@/components/home/Hero';
import About from '@/components/home/About';
import TechDomains from '@/components/home/TechDomains';
import Projects from '@/components/home/Projects';
import HtopSkills from '@/components/home/HtopSkills';
import Contact from '@/components/home/Contact';

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <TechDomains />
      <Projects />
      <HtopSkills />
      <Contact />
    </main>
  );
}
