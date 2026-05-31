const { getAll, getById, insertOne, updateOne, deleteOne } = require('../utils/fileHelper');
const bcrypt = require('bcrypt');

const getAllUsers = async (req, res) => {
  const users = await getAll('users');
  res.json(users);
};

const getUserById = async (req, res) => {
  const user = await getById('users', 'application_id', req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
};

const addUser = async (req, res) => {
  const { appID, fullName, email, password, role } = req.body;

  if (!appID || !password || !email) {
    return res.status(400).json({ message: 'appID, email and password are required' });
  }

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
  res.status(201).json({ message: 'User added successfully', user: newUser });
};

const updateUser = async (req, res) => {
  const updates = { ...req.body };
  if (updates.password) {
    updates.password = await bcrypt.hash(updates.password, 10);
  }
  const user = await updateOne('users', 'application_id', req.params.id, updates);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
};

const deleteUser = async (req, res) => {
  const deleted = await deleteOne('users', 'application_id', req.params.id);
  if (!deleted) return res.status(404).json({ message: 'User not found' });
  res.json({ message: 'User deleted' });
};

module.exports = { getAllUsers, getUserById, addUser, updateUser, deleteUser };