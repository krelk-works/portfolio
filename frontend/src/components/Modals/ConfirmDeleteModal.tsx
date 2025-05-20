import { motion } from 'framer-motion';

interface ConfirmDeleteModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  projectTitle: string;
}

export default function ConfirmDeleteModal({ open, onClose, onConfirm, projectTitle }: ConfirmDeleteModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4">
      <motion.div
        className="bg-zinc-900 text-white p-6 rounded-2xl shadow-xl w-full max-w-md"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <h2 className="text-xl font-bold text-red-400 mb-4 text-center">¿Eliminar proyecto?</h2>
        <p className="text-center text-gray-300 mb-6">
          Estás a punto de eliminar el proyecto <span className="text-cyan-300 font-semibold">"{projectTitle}"</span> y todas sus imágenes asociadas.
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white transition"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition shadow-[0_0_10px_#f00]"
          >
            Eliminar
          </button>
        </div>
      </motion.div>
    </div>
  );
}
