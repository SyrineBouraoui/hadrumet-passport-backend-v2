const { getAll, getById, insertOne, updateOne, deleteOne } = require('../utils/fileHelper');

const getAllRealizedEps = async (req, res) => {
  const eps = await getAll('realized_eps');
  res.json(eps);
};

const getRealizedEpById = async (req, res) => {
  const ep = await getById('realized_eps', 'id', req.params.id);
  if (!ep) return res.status(404).json({ message: 'EP not found' });
  res.json(ep);
};

const createRealizedEp = async (req, res) => {
  const ep = await insertOne('realized_eps', req.body);
  if (!ep) return res.status(500).json({ message: 'Error creating EP' });
  res.status(201).json(ep);
};

const updateRealizedEp = async (req, res) => {
  const ep = await updateOne('realized_eps', 'id', req.params.id, req.body);
  if (!ep) return res.status(404).json({ message: 'EP not found' });
  res.json(ep);
};

const deleteRealizedEp = async (req, res) => {
  const deleted = await deleteOne('realized_eps', 'id', req.params.id);
  if (!deleted) return res.status(404).json({ message: 'EP not found' });
  res.json({ message: 'EP deleted' });
};

module.exports = { getAllRealizedEps, getRealizedEpById, createRealizedEp, updateRealizedEp, deleteRealizedEp };