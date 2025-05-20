import { motion } from 'framer-motion';
import { FaEdit } from 'react-icons/fa';

import { useAuth } from './Context/AuthContext';
import { useContent } from './Context/ContentContext';
import ContentEditModal from './Modals/ContentEditModal';
import { useState } from 'react';

export default function About() {
  const { user } = useAuth();
  const { contentData, loading } = useContent();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalField, setModalField] = useState<'professionSummary' | 'aboutParagraph1' | 'aboutParagraph2'>('professionSummary');

  const openModal = (field: typeof modalField) => {
    setModalField(field);
    setModalOpen(true);
  };

  if (loading) {
    return (
      <section className="relative z-10 flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-6 text-center text-white pt-16">
        <div className="animate-pulse h-64 w-64 rounded-full bg-gray-300" />
      </section>
    );
  }

  if (!contentData) {
    return (
      <section className="relative z-10 flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-6 text-center text-white pt-16">
        <p className="text-lg text-red-500">Error al cargar el contenido</p>
      </section>
    );
  }

  return (
    <section
      id="about"
      className="relative z-10 px-6 py-20 text-center text-white sm:py-28"
    >
      {/* Modal de edición */}
      <ContentEditModal
        field={modalField}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
      <motion.h2
        className="text-3xl sm:text-4xl font-bold text-neon drop-shadow-neon mb-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        Sobre mí
      </motion.h2>

      <motion.p
        className="relative mx-auto max-w-3xl text-base sm:text-lg text-gray-300 leading-relaxed p-2"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 1 }}
        viewport={{ once: true }}
      >
        {contentData?.aboutParagraph1}
        {/* Soy un desarrollador web full stack enfocado en construir interfaces intuitivas y visualmente impactantes. Me apasiona la fusión entre diseño y tecnología, y disfruto creando experiencias digitales que marquen diferencia. Trabajo con React, Tailwind, animaciones avanzadas y me gusta cuidar cada detalle visual. */}
        {user && (
          <button
            onClick={() => openModal('aboutParagraph1')}
            className="absolute right-0 top-0 -translate-y-1/2 text-gray-400 hover:text-cyan-300 opacity-1 group-hover:opacity-100 transition"
          >
            <FaEdit className="text-base" />
          </button>
        )}
      </motion.p>

      <motion.p
        className="relative mx-auto mt-6 max-w-3xl text-base sm:text-lg text-gray-400 leading-relaxed p-2"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 1 }}
        viewport={{ once: true }}
      >
        {contentData?.aboutParagraph2}
        {/* Además, me involucro en cada parte del proceso: desde la planificación visual hasta la implementación técnica. Siempre busco aprender nuevas herramientas y mejorar la experiencia del usuario, manteniéndome al día con las tendencias en diseño y desarrollo web. */}
        {user && (
          <button
            onClick={() => openModal('aboutParagraph2')}
            className="absolute right-0 top-0 -translate-y-1/2 text-gray-400 hover:text-cyan-300 opacity-1 group-hover:opacity-100 transition"
          >
            <FaEdit className="text-base" />
          </button>
        )}
      </motion.p>
    </section>
  );
}