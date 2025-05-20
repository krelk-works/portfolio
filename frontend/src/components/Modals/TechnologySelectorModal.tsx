// ✅ TechnologySelectorModal.tsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useContent } from '../Context/ContentContext';

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

const allTechnologies = [
  { name: 'TypeScript', logo: ts },
  { name: 'JavaScript', logo: js },
  { name: 'jQuery', logo: jquery },
  { name: 'Node.js', logo: node },
  { name: 'SASS', logo: sass },
  { name: 'Tailwind CSS', logo: tailwind },
  { name: 'StencilJS', logo: stencil },
  { name: 'Ionic', logo: ionic },
  { name: 'React', logo: react },
  { name: 'PHP', logo: php },
  { name: 'Laravel', logo: laravel },
];

interface TechnologySelectorModalProps {
  open: boolean;
  onClose: () => void;
}

export default function TechnologySelectorModal({ open, onClose }: TechnologySelectorModalProps) {
  const { contentData, updateContent } = useContent();
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    if (open && contentData) {
      setSelected(contentData.technologies);
    }
  }, [open, contentData]);

  const toggleTechnology = (name: string) => {
    setSelected((prev) =>
      prev.includes(name) ? prev.filter((t) => t !== name) : [...prev, name]
    );
  };

  const handleUpdate = async () => {
    await updateContent({ technologies: selected });
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-4xl w-100 bg-zinc-900 p-6 rounded-xl shadow-xl border border-cyan-500 text-white"
          >
            <h2 className="text-xl font-bold mb-4 text-cyan-300">Editar tecnologías</h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {allTechnologies.map((tech) => (
                <button
                  key={tech.name}
                  onClick={() => toggleTechnology(tech.name)}
                  className={`flex flex-col items-center justify-center gap-2 rounded-lg p-4 border transition ${
                    selected.includes(tech.name)
                      ? 'border-cyan-400 bg-cyan-500/10'
                      : 'border-gray-600 hover:bg-white/5'
                  }`}
                >
                  <img src={tech.logo} alt={tech.name} className="h-10 w-10 object-contain" />
                  <span className="text-sm text-center">{tech.name}</span>
                </button>
              ))}
            </div>

            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-md border border-cyan-400 text-cyan-300 hover:bg-cyan-400 hover:text-black transition"
              >
                Cancelar
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 rounded-md bg-cyan-400 text-black font-semibold hover:bg-cyan-300 transition"
              >
                Actualizar
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}