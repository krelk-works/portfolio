import { motion } from 'framer-motion';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useEffect, useState } from 'react';

import {
  FaReact,
  FaNodeJs,
  FaLaravel,
  FaUnity,
  FaStripe,
  FaPhp,
  FaDocker,
  FaPlus,
  FaTrash
} from 'react-icons/fa';
import {
  SiTailwindcss,
  SiMongodb,
  SiMysql,
  SiExpress,
  SiSass,
  SiMariadb,
  SiStencil,
  SiTypescript,
  SiIonic,
} from 'react-icons/si';

import { useContent } from './Context/ContentContext';
import { useAuth } from './Context/AuthContext';
import ProjectModal from './Modals/ProjectModal';
import ConfirmDeleteModal from './Modals/ConfirmDeleteModal';

const techIcons: Record<string, JSX.Element> = {
  React: <FaReact className="inline mr-1" />,
  Tailwind: <SiTailwindcss className="inline mr-1" />,
  Express: <SiExpress className="inline mr-1" />,
  MongoDB: <SiMongodb className="inline mr-1" />,
  Node: <FaNodeJs className="inline mr-1" />,
  Laravel: <FaLaravel className="inline mr-1" />,
  Stripe: <FaStripe className="inline mr-1" />,
  MySQL: <SiMysql className="inline mr-1" />,
  Unity: <FaUnity className="inline mr-1" />,
  PHP: <FaPhp className="inline mr-1" />,
  Sass: <SiSass className="inline mr-1" />,
  MariaDB: <SiMariadb className="inline mr-1" />,
  StencilJS: <SiStencil className="inline mr-1" />,
  Docker: <FaDocker className="inline mr-1" />,
  TypeScript: <SiTypescript className="inline mr-1" />,
  Ionic: <SiIonic className="inline mr-1" />,
};

interface Project {
  title: string;
  description: string;
  technologies: string[];
  images: string[];
}

export default function Projects() {
  const { user } = useAuth();
  const { contentData, loading } = useContent();

  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>(contentData?.projects || []);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    setProjects(contentData?.projects || []);
  }, [contentData]);

  const handleDeleteProject = async () => {
    if (!selectedProject?.title) return;

    try {
      const res = await fetch(`http://localhost:5000/api/content/projects/${encodeURIComponent(selectedProject.title)}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const data = await res.json();
      if (res.ok) {
        setProjects(data.projects);
        setConfirmOpen(false);
        setSelectedProject(null);
      } else {
        alert(data.message || 'Error al eliminar proyecto');
      }
    } catch (err) {
      console.error('Error eliminando proyecto:', err);
      alert('No se pudo eliminar el proyecto.');
    }
  };

  if (loading || !contentData?.projects) return null;

  return (
    <section id="projects" className="relative z-10 px-6 py-20 text-white sm:py-28">
      <motion.h2
        className="text-center text-3xl sm:text-4xl font-bold text-neon drop-shadow-neon mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        Proyectos Destacados
      </motion.h2>

      <div className="relative mx-auto flex max-w-6xl flex-col gap-12">
        {projects.map((project, i) => (
          <motion.div
            key={project.title}
            className="relative rounded-xl bg-white/10 backdrop-blur-md border border-cyan-500/20 p-6 shadow-[0_0_20px_#00ffff80]"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            {user && (
              <button
                onClick={() => {
                  setSelectedProject(project);
                  setConfirmOpen(true);
                }}
                className="absolute top-4 right-4 text-gray-400 hover:text-cyan-300 transition"
              >
                <FaTrash className="text-base" />
              </button>
            )}

            <h3 className="text-2xl font-bold text-neon mb-4 text-center">{project.title}</h3>

            <div className="mb-4">
              <Carousel
                showArrows
                infiniteLoop
                showThumbs={false}
                autoPlay={true}
                showStatus={false}
                transitionTime={400}
              >
                {project.images.map((src, idx) => (
                  <div key={idx}>
                    <img
                      src={src}
                      alt={`${project.title} ${idx + 1}`}
                      className="rounded-lg aspect-video object-contain w-full"
                    />
                  </div>
                ))}
              </Carousel>
            </div>

            <p className="text-gray-300 mb-4 text-center">{project.description}</p>

            <div className="flex flex-wrap justify-center gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="flex items-center gap-1 rounded-full border border-cyan-400 bg-white/10 px-3 py-1 text-sm text-cyan-300 backdrop-blur-sm"
                >
                  {techIcons[tech] || null} {tech}
                </span>
              ))}
            </div>
          </motion.div>
        ))}

        {projects.length === 0 && (
          <p className="text-gray-300 text-center">No hay proyectos destacados disponibles.</p>
        )}

        {user && (
          <button
            onClick={() => setProjectModalOpen(true)}
            className="flex justify-center items-center gap-2 px-5 py-2 rounded-xl border border-cyan-400 bg-white/10 text-cyan-300 shadow-[0_0_10px_#00ffff80] hover:bg-cyan-400 hover:text-black transition w-full"
          >
            <FaPlus className="text-base" />
            Añadir proyecto
          </button>
        )}
      </div>

      <ProjectModal
        open={projectModalOpen}
        onClose={() => setProjectModalOpen(false)}
        onSubmit={async (newProject) => {
          try {
            const formData = new FormData();
            formData.append('title', newProject.title);
            formData.append('description', newProject.description);
            formData.append('technologies', JSON.stringify(newProject.technologies));
            newProject.images.forEach(img => formData.append('images', img));

            for (const [key, value] of formData.entries()) {
            console.log('➡', key, value);
            }

            const res = await fetch('http://localhost:5000/api/content/projects', {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
              body: formData,
            });

            const data = await res.json();
            if (res.ok) {
              setProjects(data.projects);
              setProjectModalOpen(false);
            } else {
              alert(data.message || 'Error al guardar proyecto');
            }
          } catch (err) {
            console.error('Error al guardar proyecto:', err);
            alert('Ocurrió un error al guardar el proyecto');
          }
        }}
      />

      <ConfirmDeleteModal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleDeleteProject}
        projectTitle={selectedProject?.title || ''}
      />
    </section>
  );
}

