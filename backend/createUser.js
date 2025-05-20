require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    const email = 'leo@example.com';
    const plainPassword = 'hola1234';

    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      existingUser.password = hashedPassword;
      await existingUser.save();
      console.log('Contraseña actualizada para el usuario existente');
    } else {
      const newUser = new User({ email, password: hashedPassword });
      await newUser.save();
      console.log('Usuario nuevo creado correctamente');
    }

    mongoose.disconnect();
  })
  .catch((err) => {
    console.error('Error al conectar o crear usuario:', err);
  });
