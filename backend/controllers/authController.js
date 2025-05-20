const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;
const expiresInENV = process.env.JWT_EXPIRES_IN || '1h';

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Credenciales inválidas' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: 'Credenciales inválidas' });

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: expiresInENV });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};
