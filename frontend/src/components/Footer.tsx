import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="relative z-10 mt-16 px-6 py-12 text-white border-t border-cyan-500/20 backdrop-blur-md">
      <div className="mx-auto max-w-6xl flex flex-col items-center gap-6">
        {/* <h2 className="text-xl sm:text-2xl font-bold text-neon drop-shadow-neon">
          © {new Date().getFullYear()} Leonardo Craciun
        </h2> */}
        <p className="text-center text-gray-400 max-w-lg">
          Este portfolio ha sido diseñado y desarrollado con amor por la tecnología, cuidado por los detalles y pasión por la estética digital.
        </p>

        <div className="flex gap-6 text-cyan-300">
          <a
            href="https://github.com/krelk-works"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white hover:drop-shadow-[0_0_6px_#00ffff]"
          >
            <FaGithub size={24} />
          </a>
          <a
            href="https://linkedin.com/in/leonard-denis-craciun-a54323155"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white hover:drop-shadow-[0_0_6px_#00ffff]"
          >
            <FaLinkedin size={24} />
          </a>
          <a
            href="mailto:leo.craciun97@gmail.com"
            className="hover:text-white hover:drop-shadow-[0_0_6px_#00ffff]"
          >
            <FaEnvelope size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
}
