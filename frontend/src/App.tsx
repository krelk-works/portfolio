import AnimatedBackground from '@components/AnimatedBackground';
import { AuthProvider } from './components/Context/AuthContext';
import { ContentProvider } from './components/Context/ContentContext';

import Navbar from '@components/Navbar';
import Hero from '@components/Hero';
import About from '@components/About';
import Technologies from '@components/Technologies';
import Projects from '@components/Projects';
import Footer from '@components/Footer';
import Contact from '@components/Contact';

function App() {
  return (
    <AuthProvider>
      <ContentProvider>
        <div className="relative text-white font-orbitron bg-black min-h-screen">
          <AnimatedBackground />
          <Navbar />
          <main className="relative z-10">
            <Hero />
            <About />
            <Technologies />
            <Projects />
            <Contact />
          </main>
          <Footer />
        </div>
      </ContentProvider>
    </AuthProvider>
  );
}

export default App;