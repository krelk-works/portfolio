import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from './Context/AuthContext';
import LoginModal from './Modals/LoginModal';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { user, logout } = useAuth();

  const navItems = [
    { label: 'Inicio', href: '#hero' },
    { label: 'Sobre mí', href: '#about' },
    { label: 'Tecnologías', href: '#tech' },
    { label: 'Proyectos', href: '#projects' },
    { label: 'Contacto', href: '#contact' },
    { label: 'CV', href: 'https://cv.krelk.com/' },
  ];

  return (
    <>
      <nav className="h-16 fixed top-0 left-0 z-50 w-full bg-black bg-opacity-70 px-6 shadow-lg backdrop-blur-md border-b border-cyan-500/20">
        <div className="mx-auto flex h-full max-w-6xl items-center justify-between">
          <a href="#hero" className="text-neon font-orbitron text-xl font-bold tracking-wide">
            {'<Krelk/>'}
          </a>

          <ul className="hidden gap-6 text-sm sm:flex items-center">
            {navItems.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  className="text-gray-300 transition hover:text-neon hover:drop-shadow-neon"
                >
                  {label}
                </a>
              </li>
            ))}
            <li className="relative">
              {!user ? (
                <button
                  onClick={() => setLoginOpen(true)}
                  className="text-gray-300 transition hover:text-neon hover:drop-shadow-neon"
                >
                  Login
                </button>
              ) : (
                <div className="relative">
                  <button
                    onClick={() => setShowDropdown((prev) => !prev)}
                    className="text-cyan-300 font-semibold hover:text-white"
                  >
                    {user}
                  </button>
                  {showDropdown && (
                    <div className="absolute left-1/2 top-full z-50 mt-2 w-40 -translate-x-1/2 rounded-md border border-cyan-500 bg-black p-2 text-sm text-white shadow-lg">
                      <button
                        onClick={() => {
                          logout();
                          setShowDropdown(false);
                        }}
                        className="w-full text-center hover:text-neon"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              )}
            </li>
          </ul>

          <button
            className="sm:hidden text-neon focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.ul
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="mt-2 flex flex-col gap-2 sm:hidden text-center bg-black/50"
            >
              {navItems.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-md px-4 py-2 text-gray-300 hover:bg-cyan-500/20 hover:text-neon"
                  >
                    {label}
                  </a>
                </li>
              ))}
              <li>
                {!user ? (
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      setLoginOpen(true);
                    }}
                    className="text-gray-300 hover:text-neon"
                  >
                    Login
                  </button>
                ) : (
                  <div className="relative">
                    <button
                      onClick={() => setShowDropdown((prev) => !prev)}
                      className="text-cyan-300 font-semibold hover:text-white"
                    >
                      {user}
                    </button>
                    {showDropdown && (
                      <div className="mx-auto mt-2 w-full rounded-md border border-cyan-500 bg-black p-2 text-sm text-white shadow-md">
                        <button
                          onClick={() => {
                            logout();
                            setShowDropdown(false);
                            setMenuOpen(false);
                          }}
                          className="w-full text-center hover:text-neon"
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </li>
            </motion.ul>
          )}
        </AnimatePresence>
      </nav>

      <AnimatePresence>
        {loginOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}