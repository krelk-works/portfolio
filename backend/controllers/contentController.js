const crypto = require('crypto');
const slugify = require('slugify');
const path = require('path');
const fs = require('fs');

const PortfolioContent = require('../models/PortfolioContent');

// Obtener el contenido completo
exports.getContent = async (req, res) => {
  try {
    const content = await PortfolioContent.findOne();
    if (!content) return res.status(404).json({ message: 'Contenido no encontrado' });
    res.json(content);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener el contenido' });
  }
};

// Actualizar todo el contenido (requiere autenticación)
exports.updateContent = async (req, res) => {
  try {
    const updated = await PortfolioContent.findOneAndUpdate({}, req.body, {
      new: true,
      runValidators: true,
    });
    res.json(updated);
  } catch (error) {
    console.error('Error actualizando contenido:', error);
    res.status(500).json({ message: 'Error al actualizar el contenido' });
  }
};

// Añadir un nuevo proyecto (requiere autenticación)
exports.addProject = async (req, res) => {
  try {
    const content = await PortfolioContent.findOne();
    if (!content) return res.status(404).json({ message: 'Contenido no encontrado' });

    const title = req.body.title;
    const description = req.body.description;
    const technologies = JSON.parse(req.body.technologies || '[]');
    const slug = slugify(title, { lower: true, strict: true });
    const images = [];

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No se subieron imágenes' });
    }

    // Crear ruta: /uploads/projects/slug/
    const folderPath = path.join(__dirname, '..', 'uploads', 'projects', slug);
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
      console.log(`📁 Carpeta creada: ${folderPath}`);
    }

    for (const file of req.files) {
      try {
        const ext = path.extname(file.originalname);
        const filename = `${crypto.randomUUID()}${ext}`;
        const destination = path.join(folderPath, filename);

        fs.renameSync(file.path, destination);
        console.log(`✅ Imagen movida: ${filename}`);

        // Construir ruta pública para el frontend
        const host = process.env.HOST || `localhost`;
        const port = process.env.PORT ? `:${process.env.PORT}` : '';
        const publicPath = `${host}${port}/uploads/projects/${slug}/${filename}`;

        images.push(publicPath);
      } catch (fileErr) {
        console.error(`❌ Error al mover archivo ${file.originalname}:`, fileErr);
      }
    }

    content.projects.push({ title, description, technologies, images });
    await content.save();

    res.status(201).json({ message: 'Proyecto guardado', projects: content.projects });
  } catch (err) {
    console.error('❌ Error al guardar proyecto:', err);
    res.status(500).json({ message: 'Error al guardar el proyecto' });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const { title } = req.params;
    const slug = slugify(title, { lower: true, strict: true });

    const content = await PortfolioContent.findOne();
    if (!content) return res.status(404).json({ message: 'Contenido no encontrado' });

    const index = content.projects.findIndex(p => p.title === title);
    if (index === -1) return res.status(404).json({ message: 'Proyecto no encontrado' });

    // Eliminar carpeta física del proyecto
    const folderPath = path.join(__dirname, '..', 'uploads', 'projects', slug);
    if (fs.existsSync(folderPath)) {
      fs.rmSync(folderPath, { recursive: true, force: true });
    }

    // Eliminar del array en Mongo
    content.projects.splice(index, 1);
    await content.save();

    res.json({ message: 'Proyecto eliminado', projects: content.projects });
  } catch (err) {
    console.error('Error al eliminar proyecto:', err);
    res.status(500).json({ message: 'Error al eliminar el proyecto' });
  }
};