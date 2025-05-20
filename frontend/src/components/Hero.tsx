import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import { FaEdit } from 'react-icons/fa';

import { useAuth } from './Context/AuthContext';
import { useContent } from './Context/ContentContext';

import ChangePhotoModal from './Modals/ChangePhotoModal';
import ContentEditModal from './Modals/ContentEditModal';

export default function Hero() {
  const imagePlaceholder = '/uploads/placeholder.svg';
  const { user } = useAuth();
  const { contentData, loading } = useContent();

  const [photoModalOpen, setPhotoModalOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(imagePlaceholder);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalField, setModalField] = useState<'professionSummary' | 'aboutParagraph1' | 'aboutParagraph2' | 'name' | 'role'>('professionSummary');

  const openModal = (field: typeof modalField) => {
    setModalField(field);
    setModalOpen(true);
  };

  useEffect(() => {
    if (contentData?.image) {
      setProfileImage(contentData.image);
    }
  }, [contentData]);

  if (loading) {
    return (
      <section className="relative z-10 flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-6 text-center text-white pt-16">
        <div className="animate-pulse h-64 w-64 rounded-full bg-gray-300" />
      </section>
    );
  }

  if (!contentData || !contentData?.professionSummary) {
    return (
      <section className="relative z-10 flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-6 text-center text-white pt-16">
        <p className="text-lg text-red-500">Error al cargar el contenido</p>
      </section>
    );
  }

  return (
    <section
      id="hero"
      className="relative z-10 flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-6 text-center text-white pt-16"
    >
      {/* Modal de cambio de foto */}
      <ChangePhotoModal
        open={photoModalOpen}
        onClose={() => setPhotoModalOpen(false)}
        onUpdate={(newImg) => {
          const timestamp = new Date().getTime();
          setProfileImage(`${newImg}?t=${timestamp}`);
        }}
      />

      {/* Modal de edición */}
      <ContentEditModal
        field={modalField}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />

      {/* Imagen de perfil con efecto neon */}
      <motion.div
        className="relative mb-6 rounded-full border-4 border-cyan-400 p-1 shadow-neon bg-white/15"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <img
          src={profileImage}
          alt="Foto de perfil"
          className="h-64 w-64 rounded-full object-contain shadow-[0_0_25px_#00ffff]"
        />
        {user && (
          // <button
          //   onClick={() => setPhotoModalOpen(true)}
          //   className="absolute right-2 bottom-2 bg-black/50 hover:bg-cyan-600 p-2 rounded-full text-cyan-300 hover:text-white transition"
          //   title="Cambiar foto de perfil"
          // >
            <button
            onClick={() => setPhotoModalOpen(true)}
            className="absolute right-5 top-5 -translate-y-1/2 text-gray-400 hover:text-cyan-300 transition"
            title="Cambiar foto de perfil"
          >
            <FaEdit />
          </button>
        )}
        <span className="absolute inset-0 animate-pulse rounded-full border-4 border-cyan-400 blur-sm opacity-30" />
      </motion.div>

      <motion.h1
        className="relative text-4xl sm:text-5xl md:text-6xl font-bold text-neon drop-shadow-neon"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {contentData?.name || 'Nombre completo'}
        {loading && <span className="animate-pulse text-cyan-400">Cargando...</span>}
        {user && (
          <button
            onClick={() => openModal('name')}
            className="absolute -right-5 top-0 -translate-y-1/2 text-gray-400 hover:text-cyan-300 transition"
          >
            <FaEdit className="text-base" />
          </button>
        )}
      </motion.h1>

      <motion.h2
        className="relative mt-2 text-lg sm:text-xl md:text-2xl text-cyan-200 tracking-wide"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1 }}
      >
        {contentData?.role || 'Rol no definido'}
        {loading && <span className="animate-pulse text-cyan-400">Cargando...</span>}
        {user && (
          <button
            onClick={() => openModal('role')}
            className="absolute -right-5 top-0 -translate-y-1/2 text-gray-400 hover:text-cyan-300 transition"
          >
            <FaEdit className="text-base" />
          </button>
        )}
      </motion.h2>

      <motion.p
        className="relative mt-6 max-w-xl text-sm sm:text-base md:text-lg text-gray-400 p-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 1 }}
      >
        {contentData?.professionSummary}
        {loading && <span className="animate-pulse text-cyan-400">Cargando...</span>}
        {user && (
          <button
            onClick={() => openModal('professionSummary')}
            className="absolute -right-2 top-0 -translate-y-1/2 text-gray-400 hover:text-cyan-300 transition"
          >
            <FaEdit className="text-base" />
          </button>
        )}
      </motion.p>

      <motion.a
        href="#projects"
        className="mt-8 inline-block rounded-xl border border-cyan-400 px-6 py-3 text-cyan-300 shadow-[0_0_10px_#00ffff] transition hover:bg-cyan-400 hover:text-black animate-glow-button"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        Ver mis proyectos
      </motion.a>
    </section>
  );
}
