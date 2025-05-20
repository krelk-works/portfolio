// ✅ ContentEditModal.tsx
import { useState, useEffect } from 'react';
import { useContent } from '../Context/ContentContext';
import { motion, AnimatePresence } from 'framer-motion';

interface ContentEditModalProps {
  field: 'professionSummary' | 'aboutParagraph1' | 'aboutParagraph2' | 'name' | 'role';
  open: boolean;
  onClose: () => void;
}

export default function ContentEditModal({ field, open, onClose }: ContentEditModalProps) {
  const { contentData, updateContent } = useContent();
  const [value, setValue] = useState('');

  useEffect(() => {
    if (open && contentData) {
      setValue(contentData[field]);
    }

    /*
      * Funcionalidad para evitar el scroll de la etiqueta main
      * al abrir el modal.
      * 
      * Esto se hace añadiendo o eliminando la clase 'overflow-hidden'
      * al body del documento.
      * 
      * Esto es útil para evitar que el contenido de la página
      * se desplace cuando se abre el modal.
      * 
      * El efecto se activa cuando el modal está abierto
      * y se desactiva cuando se cierra.
      * 
      * El efecto se limpia al desmontar el componente
      * o al cambiar el estado del modal.
    */

    const body = document.body;
    if (open) {
      body.classList.add('overflow-hidden');
    } else {
      body.classList.remove('overflow-hidden');
    }
    return () => {
      body.classList.remove('overflow-hidden');
    }
  }, [open, contentData, field, open]);

  const handleUpdate = async () => {
    await updateContent({ [field]: value });
    onClose();
  };

  const fieldLabels: Record<typeof field, string> = {
    name: 'Nombre',
    role: 'Rol',
    professionSummary: 'Resumen profesional',
    aboutParagraph1: 'Acerca de mí - Párrafo 1',
    aboutParagraph2: 'Acerca de mí - Párrafo 2',
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
            className="max-w-lg w-full bg-zinc-900 p-6 rounded-xl shadow-xl border border-cyan-500 text-white"
          >
            <h2 className="text-xl font-bold mb-4 text-cyan-300">Editar: {fieldLabels[field]}</h2>
            <textarea
              className="w-full h-40 p-3 rounded-md bg-zinc-800 border border-cyan-400 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <div className="mt-4 flex justify-end gap-4">
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
