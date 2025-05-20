import { motion } from 'framer-motion';

import ts from '@assets/typescript-icon.svg';
import js from '@assets/javascript-icon.svg';
import jquery from '@assets/jquery-icon.svg';
import node from '@assets/nodejs-icon.svg';
import sass from '@assets/sass-icon.svg';
import tailwind from '@assets/tailwindcss-icon.svg';
import stencil from '@assets/stenciljs-icon.png';
import ionic from '@assets/ionic-icon.png';
import react from '@assets/react-icon.svg';
import php from '@assets/php-icon.svg';
import laravel from '@assets/laravel-icon.svg';
import { FaEdit } from 'react-icons/fa';

import { useAuth } from './Context/AuthContext';
import { useContent } from './Context/ContentContext';

import { useState } from 'react';
import TechnologySelectorModal from './Modals/TechnologySelectorModal';

// Example of how to use the technologies array
// const technologies = [
//   { name: 'TypeScript', logo: ts },
// //   { name: 'JavaScript', logo: js },
//   { name: 'jQuery', logo: jquery },
//   { name: 'Node.js', logo: node },
//   { name: 'SASS', logo: sass },
//   { name: 'Tailwind CSS', logo: tailwind },

//   { name: 'StencilJS', logo: stencil },
//   { name: 'Ionic', logo: ionic },
//   { name: 'React', logo: react },
//   { name: 'PHP', logo: php },
//   { name: 'Laravel', logo: laravel },
// ];

interface Technology {
  name: string;
  logo: string;
}

function getTechnologyLogo(techName: string) {
  switch (techName) {
    case 'TypeScript':
      return ts;
    case 'JavaScript':
      return js;
    case 'jQuery':
      return jquery;
    case 'Node.js':
      return node;
    case 'SASS':
      return sass;
    case 'Tailwind CSS':
      return tailwind;
    case 'StencilJS':
      return stencil;
    case 'Ionic':
      return ionic;
    case 'React':
      return react;
    case 'PHP':
      return php;
    case 'Laravel':
      return laravel;
    default:
      return '';
  }
}

export default function Technologies() {
  const { user } = useAuth();
  const { contentData, loading } = useContent();
  const [modalOpen, setModalOpen] = useState(false);

  if (loading) {
    return (
      <section className="relative z-10 flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-6 text-center text-white pt-16">
        <div className="animate-pulse h-64 w-64 rounded-full bg-gray-300" />
      </section>
    );
  }

  if (!contentData || !contentData.technologies) {
    return (
      <section className="relative z-10 flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-6 text-center text-white pt-16">
        <p className="text-lg text-red-500">Error al cargar el contenido</p>
      </section>
    );
  }

  const technologies: Technology[] = contentData.technologies.map((tech) => ({
      name: tech,
      logo: getTechnologyLogo(tech),
  }));

  if (technologies.length === 0) {
    return (
      <section className="relative z-10 flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-6 text-center text-white pt-16">
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-neon drop-shadow-neon mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
        Tecnologías que uso
        </motion.h2>
        <p className="relative text-lg text-red-500">No hay tecnologías disponibles
          {user && (
            <button
              onClick={() => setModalOpen(true)}
              className="absolute -top-4 -right-8 text-gray-400 hover:text-cyan-300 transition"
            >
              <FaEdit className="text-base" />
            </button>
          )}
        </p>
        {/* Modal */}
        <TechnologySelectorModal open={modalOpen} onClose={() => setModalOpen(false)} />
      </section>
    );
  }

  return (
    <section
      id="tech"
      className="relative z-10 px-6 py-20 text-center text-white sm:py-28"
    >
      <motion.h2
        className="text-3xl sm:text-4xl font-bold text-neon drop-shadow-neon mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        Tecnologías que uso
      </motion.h2>

      <div className="relative mx-auto grid max-w-6xl grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 p-2">
        {user && (
          <button
            onClick={() => setModalOpen(true)}
            className="absolute -top-4 -right-4 text-gray-400 hover:text-cyan-300 transition"
          >
            <FaEdit />
          </button>
        )}
        {technologies.map((tech, index) => (
          <motion.div
            key={tech.name}
            className="group flex flex-col items-center justify-center rounded-xl bg-white/5 backdrop-blur-md border border-cyan-500/20 p-6 shadow-md hover:shadow-[0_0_15px_#00ffff] transition duration-300"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <img
              src={tech.logo}
              alt={tech.name}
              className="mb-3 h-16 w-16 object-contain transition-transform group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_#00ffff]"
            />
            <p className="text-sm font-semibold text-cyan-300">{tech.name}</p>
          </motion.div>
        ))}
      </div>
      {/* Modal */}
      <TechnologySelectorModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}
