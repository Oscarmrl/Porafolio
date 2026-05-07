import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main style={{ minHeight: "100vh", background: "white" }}>
      <Navbar />
      <div style={{ padding: "0 64px" }}>
        <Hero />
        <About />
        <Projects />
        <Contact />
      </div>
      <Footer />
    </main>
  );
}
