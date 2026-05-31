const { getAll, getById, insertOne, updateOne, deleteOne } = require('../utils/fileHelper');

const getAllLocalApps = async (req, res) => {
  const apps = await getAll('local_apps');
  res.json(apps);
};

const getLocalAppById = async (req, res) => {
  const app = await getById('local_apps', 'id', req.params.id);
  if (!app) return res.status(404).json({ message: 'App not found' });
  res.json(app);
};

const createLocalApp = async (req, res) => {
  const app = await insertOne('local_apps', req.body);
  if (!app) return res.status(500).json({ message: 'Error creating app' });
  res.status(201).json(app);
};

const updateLocalApp = async (req, res) => {
  const app = await updateOne('local_apps', 'id', req.params.id, req.body);
  if (!app) return res.status(404).json({ message: 'App not found' });
  res.json(app);
};

const deleteLocalApp = async (req, res) => {
  const deleted = await deleteOne('local_apps', 'id', req.params.id);
  if (!deleted) return res.status(404).json({ message: 'App not found' });
  res.json({ message: 'App deleted' });
};

module.exports = { getAllLocalApps, getLocalAppById, createLocalApp, updateLocalApp, deleteLocalApp };