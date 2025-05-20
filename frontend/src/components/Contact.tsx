import { motion } from 'framer-motion';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { useRef, useState } from 'react';

export default function Contact() {
  const captchaRef = useRef<HCaptcha>(null);
  const [token, setToken] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: { Accept: 'application/json' },
    }).then((res) => {
      if (res.ok) {
        setSubmitted(true);
        form.reset();
        setToken('');
        if (captchaRef.current) captchaRef.current.resetCaptcha();
      }
    });
  };

  return (
    <section
      id="contact"
      className="relative z-10 px-6 py-24 text-white sm:py-32"
    >
      <motion.h2
        className="text-center text-3xl sm:text-4xl font-bold text-neon drop-shadow-neon mb-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        ¿Trabajamos juntos?
      </motion.h2>

      <motion.p
        className="mx-auto mb-12 max-w-2xl text-center text-gray-300"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
        viewport={{ once: true }}
      >
        Si tienes una idea, un proyecto o simplemente quieres saludar, rellena el siguiente formulario y te responderé lo antes posible.
      </motion.p>

      {submitted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-xl rounded-xl bg-white/10 p-6 text-center text-cyan-300 backdrop-blur-md border border-cyan-500"
        >
          <p className="text-lg font-semibold">✅ ¡Mensaje enviado con éxito!</p>
          <p className="mt-2 text-sm text-gray-300">
            Gracias por tu mensaje. Me pondré en contacto contigo lo antes posible.
          </p>
        </motion.div>
      ) : (
        <form
          onSubmit={handleSubmit}
          action="https://formspree.io/f/mrbqrqej"
          method="POST"
          className="mx-auto max-w-xl space-y-6 text-black"
        >
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-cyan-200">
              Nombre
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="mt-1 w-full rounded-md border border-cyan-400 bg-white/10 px-4 py-2 text-white backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-cyan-200">
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="mt-1 w-full rounded-md border border-cyan-400 bg-white/10 px-4 py-2 text-white backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-cyan-200">
              Mensaje
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              className="mt-1 w-full rounded-md border border-cyan-400 bg-white/10 px-4 py-2 text-white backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
            ></textarea>
          </div>

          <div className="flex justify-center">
            <HCaptcha
            //   sitekey="ES_5ed05600be9d4767b0b98f906dc6c05f" // Reemplázalo por tu sitekey real
            sitekey="10000000-ffff-ffff-ffff-000000000001" // Temporal para pruebas
              onVerify={(token) => setToken(token)}
              ref={captchaRef}
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              disabled={!token}
              className="rounded-full bg-cyan-400 px-8 py-3 text-black font-semibold hover:bg-cyan-300 transition-all duration-300 shadow-[0_0_10px_#00ffff80] disabled:opacity-50"
            >
              Enviar mensaje
            </button>
          </div>
        </form>
      )}
    </section>
  );
}