'use client'
import Hero from "./components/Hero";
import Asuntos from './components/Asuntos'
import Quienes from "./components/Quienes";
import Validados from "./components/Validados";
import Location from "./components/Location";
import Contact from "./components/Contact";
import FooterComp from "./components/FooterComp";
import LanguageProvider from "./components/LanguageProvider";

export default function Home() {
  return (
    <>
      <LanguageProvider>
        <div>
          <Hero />
          <Asuntos />
          <Quienes />
          <Validados />
          <Location />
          <Contact />
        </div>
        <FooterComp />
      </LanguageProvider>
    </>
  );
}
