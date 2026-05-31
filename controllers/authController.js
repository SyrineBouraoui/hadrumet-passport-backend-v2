require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { getById, insertOne } = require('../utils/fileHelper');

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

const loginEP = async (req, res) => {
  const { appID, password } = req.body;

  const user = await getById('users', 'application_id', appID);
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign(
    { applicationId: user.application_id },
    JWT_SECRET,
    { expiresIn: '3d' }
  );

  const { full_name, email, role, application_id } = user;
  res.json({
    message: 'Login successful',
    token,
    user: { full_name, email, role, application_id }
  });
};

const registerEP = async (req, res) => {
  const { appID, fullName, email, password, role } = req.body;

  if (!appID || !password || !email) {
    return res.status(400).json({ message: 'appID, email and password are required' });
  }

  // Check if user already exists
  const existing = await getById('users', 'application_id', appID);
  if (existing) return res.status(409).json({ message: 'User already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await insertOne('users', {
    application_id: appID,
    full_name: fullName,
    email: email,
    password: hashedPassword,
    role: role || 'EP'
  });

  if (!newUser) return res.status(500).json({ message: 'Error creating user' });

  res.status(201).json({
    message: 'User created successfully',
    user: {
      application_id: newUser.application_id,
      full_name: newUser.full_name,
      email: newUser.email,
      role: newUser.role
    }
  });
};

module.exports = { loginEP, registerEP };