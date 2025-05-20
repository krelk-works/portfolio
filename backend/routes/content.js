const express = require('express');
const router = express.Router();
const { getContent, updateContent, addProject, deleteProject } = require('../controllers/contentController');
const verifyToken = require('../middleware/verifyToken');
const crypto = require('crypto');

const multer = require('multer');
const fs = require('fs');
const path = require('path');
const PortfolioContent = require('../models/PortfolioContent');

// Configuración de multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `image${ext}`);
  },
});
const upload = multer({ storage });

// Storage separado solo para proyectos
const storageProjects = multer.diskStorage({
  destination: (req, file, cb) => {
    const tempPath = path.join('uploads', 'temp');
    if (!fs.existsSync(tempPath)) fs.mkdirSync(tempPath, { recursive: true });
    cb(null, tempPath);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = `${crypto.randomUUID()}${ext}`;
    cb(null, filename);
  },
});
const uploadProjects = multer({ storage: storageProjects });

// Nueva ruta PATCH /image protegida
router.patch('/image', verifyToken, upload.single('image'), async (req, res) => {
  try {
    const ext = path.extname(req.file.originalname);
    
    let newImagePath;
    if (process.env.PORT) {
        newImagePath = `${process.env.HOST}:${process.env.PORT}/uploads/image${ext}`;
    } else {
        newImagePath = `${process.env.HOST}/uploads/image${ext}`;
    }

    // Buscar contenido existente
    const content = await PortfolioContent.findOne();
    if (!content) {
      return res.status(404).json({ message: 'Contenido no encontrado' });
    }

    // Si ya hay imagen y es distinta, eliminar el archivo anterior
    const uploadDir = path.join(__dirname, '../uploads');
    const files = fs.readdirSync(uploadDir);
    for (const file of files) {
        if (file.startsWith('image.') && file !== `image${ext}`) {
            const filePath = path.join(uploadDir, file);
            fs.unlinkSync(filePath);
            // console.log(`Imagen anterior eliminada: ${file}`);
        }
    }

    // Actualizar la ruta de la nueva imagen
    content.image = newImagePath;
    await content.save();
    console.log('Imagen actualizada:', content.image);
    res.json({ message: 'Imagen actualizada correctamente', image: newImagePath });
  } catch (err) {
    console.error('Error actualizando imagen:', err);
    res.status(500).json({ message: 'Error al actualizar la imagen' });
  }
});

// Obtener el contenido público
router.get('/', getContent);

// Actualizar el contenido (requiere token válido)
router.put('/', verifyToken, updateContent);

// Agregar un nuevo proyecto (requiere token válido)
router.post('/projects', verifyToken, uploadProjects.array('images', 20), addProject);

// Eliminar un proyecto (requiere token válido)
router.delete('/projects/:title', verifyToken, deleteProject);

module.exports = router;