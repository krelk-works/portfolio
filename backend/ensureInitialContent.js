require('dotenv').config();
const mongoose = require('mongoose');
const PortfolioContent = require('./models/PortfolioContent');

const initialData = {
  professionSummary:
    'Desarrollo experiencias web modernas animadas y con un diseño centrado en el impacto visual y la usabilidad.',
  aboutParagraph1:
    'Soy un desarrollador web full stack enfocado en construir interfaces intuitivas y visualmente impactantes. Me apasiona la fusión entre diseño y tecnología, y disfruto creando experiencias digitales que marquen diferencia. Trabajo con React, Tailwind, animaciones avanzadas y me gusta cuidar cada detalle visual.',
  aboutParagraph2:
    'Además, me involucro en cada parte del proceso: desde la planificación visual hasta la implementación técnica. Siempre busco aprender nuevas herramientas y mejorar la experiencia del usuario, manteniéndome al día con las tendencias en diseño y desarrollo web.',
  technologies: [],
  projects: [],
};

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    const existing = await PortfolioContent.findOne();
    if (existing) {
      Object.assign(existing, initialData);
      await existing.save();
      console.log('Contenido actualizado correctamente');
    } else {
      await PortfolioContent.create(initialData);
      console.log('Contenido inicial creado');
    }
    mongoose.disconnect();
  })
  .catch((err) => {
    console.error('Error al conectar o insertar contenido:', err);
  });