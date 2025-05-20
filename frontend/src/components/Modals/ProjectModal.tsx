import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface ProjectModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (project: {
    title: string;
    description: string;
    technologies: string[];
    images: File[];
  }) => void;
}

const techOptions = [
  'React', 'Tailwind', 'Express', 'MongoDB', 'Node',
  'Laravel', 'Stripe', 'MySQL', 'Unity', 'PHP',
  'Sass', 'MariaDB', 'StencilJS', 'Docker', 'TypeScript', 'Ionic'
];

export default function ProjectModal({ open, onClose, onSubmit }: ProjectModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [technologies, setTechnologies] = useState<string[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImages(prev => [...prev, ...files]);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
    setImagePreviews(imagePreviews.filter((_, i) => i !== index));
  };

  const toggleTech = (tech: string) => {
    setTechnologies(prev =>
      prev.includes(tech) ? prev.filter(t => t !== tech) : [...prev, tech]
    );
  };

  const handleSubmit = () => {
    if (!title || !description || images.length === 0 || technologies.length === 0) {
      alert('Por favor, completa todos los campos.');
      return;
    }
    onSubmit({ title, description, technologies, images });
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4">
      <motion.div
        className="bg-zinc-900 text-white p-6 rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <button onClick={onClose} className="absolute top-3 right-3 text-white/50 hover:text-white text-xl">✕</button>
        <h2 className="text-2xl font-bold text-neon mb-6">Nuevo Proyecto</h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Título del proyecto"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 rounded bg-zinc-800 text-white placeholder-gray-400 focus:outline-none"
          />

          <textarea
            placeholder="Descripción"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full px-4 py-2 rounded bg-zinc-800 text-white placeholder-gray-400 focus:outline-none"
          />

          <div>
            <h3 className="mb-2 font-semibold text-cyan-300">Tecnologías usadas:</h3>
            <div className="flex flex-wrap gap-2">
              {techOptions.map((tech) => (
                <button
                  key={tech}
                  onClick={() => toggleTech(tech)}
                  className={`px-3 py-1 rounded-full text-sm border backdrop-blur-sm transition
                    ${technologies.includes(tech) ? 'bg-cyan-600 text-white border-cyan-400' : 'bg-white/10 text-cyan-300 border-cyan-300/50'}`}
                >
                  {tech}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-2 font-semibold text-cyan-300">Imágenes seleccionadas:</h3>
            <input
              type="file"
              accept="image/*"
              multiple
              ref={fileInputRef}
              className="hidden"
              onChange={handleImageChange}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-xl transition"
            >
              Seleccionar imágenes
            </button>
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
              {imagePreviews.map((src, idx) => (
                <div key={idx} className="relative group">
                  <img src={src} alt={`preview-${idx}`} className="rounded-lg object-cover aspect-video w-full" />
                  <button
                    onClick={() => removeImage(idx)}
                    className="absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center"
                  >✕</button>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl transition"
          >
            Guardar Proyecto
          </button>
        </div>
      </motion.div>
    </div>
  );
}
