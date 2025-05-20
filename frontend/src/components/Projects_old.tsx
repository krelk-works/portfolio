import { motion } from 'framer-motion';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import {
  FaReact,
  FaNodeJs,
  FaLaravel,
  FaUnity,
  FaStripe,
  FaPhp,
  FaDocker,
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

const projects = [
  {
    title: 'Intranet Gestión de obras de arte - Museo Apel·les Fenosa',
    images: [
        '/projects/fenosa/fenosa_1-min.png',
        '/projects/fenosa/fenosa_2-min.png',
        '/projects/fenosa/fenosa_3-min.png',
        '/projects/fenosa/fenosa_4-min.png',
        '/projects/fenosa/fenosa_5-min.png',
        '/projects/fenosa/fenosa_6-min.png',
        '/projects/fenosa/fenosa_7-min.png',
    ],
    technologies: ['PHP', 'Sass', 'MariaDB', 'Docker'],
    description:
      'Aplicación web de Intranet para la gestión de obras de arte, con administración de usuarios y roles.',
  },
  {
    title: 'Sistema de Mailing - Bitgenoma S.L.',
    images: [
        '/projects/mailing/mailing_1-min.png',
        '/projects/mailing/mailing_2-min.png',
        '/projects/mailing/mailing_3-min.png',
        '/projects/mailing/mailing_4-min.png',
        '/projects/mailing/mailing_5-min.png',
        '/projects/mailing/mailing_6-min.png',
    ],
    technologies: ['StencilJS', 'TypeScript', 'Ionic', 'Express', 'MongoDB', 'Docker'],
    description:
      'Sistema de envío de correos massivos para marketing.',
  }
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative z-10 px-6 py-20 text-white sm:py-28"
    >
      <motion.h2
        className="text-center text-3xl sm:text-4xl font-bold text-neon drop-shadow-neon mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        Proyectos Destacados
      </motion.h2>

      <div className="mx-auto flex max-w-6xl flex-col gap-12">
        {projects.map((project, i) => (
          <motion.div
            key={project.title}
            className="rounded-xl bg-white/10 backdrop-blur-md border border-cyan-500/20 p-6 shadow-[0_0_20px_#00ffff80]"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-neon mb-4 text-center">
              {project.title}
            </h3>

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

            <p className="text-gray-300 mb-4 text-center">
              {project.description}
            </p>

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
      </div>
    </section>
  );
}