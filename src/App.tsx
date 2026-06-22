import CanvasChrome from "./components/CanvasChrome";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import ProductManagement from "./components/ProductManagement";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Credentials from "./components/Credentials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <CanvasChrome />
      <main>
        <Hero />
        <About />
        <Experience />
        <ProductManagement />
        <Projects />
        <Skills />
        <Credentials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
