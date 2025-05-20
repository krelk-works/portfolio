import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface Props {
  open: boolean;
  onClose: () => void;
  onUpdate?: (newImage: string) => void; // Callback para actualizar en el estado si lo deseas
}

export default function ChangePhotoModal({ open, onClose, onUpdate }: Props) {
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
        setFile(selected);
      };
      reader.readAsDataURL(selected);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append('image', file);

    const res = await fetch('http://localhost:5000/api/content/image', {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // o donde tengas el token
      },
      body: formData,
    });

    const data = await res.json();
    if (res.ok && onUpdate) onUpdate(data.image);
    setLoading(false);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4">
      <motion.div
        className="bg-zinc-900 p-6 rounded-2xl text-white w-full max-w-md relative shadow-lg"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white text-xl"
        >
          ✕
        </button>
        <h2 className="text-xl font-bold mb-4 text-cyan-400">Cambiar foto de perfil</h2>

        <div className="flex flex-col items-center gap-4">
          <div className="relative rounded-full border-4 border-cyan-400 p-1 shadow-neon bg-white/15">
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="w-32 h-32 rounded-full object-cover shadow-[0_0_25px_#00ffff]"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-zinc-700 flex items-center justify-center text-gray-500 text-sm">
                Vista previa
              </div>
            )}
            <span className="absolute inset-0 animate-pulse rounded-full border-4 border-cyan-400 blur-sm opacity-30" />
          </div>

          <input
            type="file"
            accept="image/*"
            ref={fileRef}
            className="hidden"
            onChange={handleFileChange}
          />

          <button
            onClick={() => fileRef.current?.click()}
            className="mt-8 inline-block rounded-xl border border-cyan-400 px-6 py-3 text-cyan-300 shadow-[0_0_10px_#00ffff] transition hover:bg-cyan-400 hover:text-black animate-glow-button"
          >
            Seleccionar imagen
          </button>

          {file && (
            <button
              onClick={handleUpload}
              disabled={loading}
            className="mt-8 inline-block rounded-xl border border-cyan-400 px-6 py-3 text-cyan-300 shadow-[0_0_10px_#00ffff] transition hover:bg-green-400 hover:text-black animate-glow-button"
            >
              {loading ? 'Subiendo...' : 'Guardar'}
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
