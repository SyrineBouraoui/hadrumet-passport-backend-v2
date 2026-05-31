const { getAll, getById, insertOne, updateOne, deleteOne } = require('../utils/fileHelper');

const getAllPlaces = async (req, res) => {
  const places = await getAll('places');
  res.json(places);
};

const getPlaceById = async (req, res) => {
  const place = await getById('places', 'id', req.params.id);
  if (!place) return res.status(404).json({ message: 'Place not found' });
  res.json(place);
};

const createPlace = async (req, res) => {
  const place = await insertOne('places', req.body);
  if (!place) return res.status(500).json({ message: 'Error creating place' });
  res.status(201).json(place);
};

const updatePlace = async (req, res) => {
  const place = await updateOne('places', 'id', req.params.id, req.body);
  if (!place) return res.status(404).json({ message: 'Place not found' });
  res.json(place);
};

const deletePlace = async (req, res) => {
  const deleted = await deleteOne('places', 'id', req.params.id);
  if (!deleted) return res.status(404).json({ message: 'Place not found' });
  res.json({ message: 'Place deleted' });
};

module.exports = { getAllPlaces, getPlaceById, createPlace, updatePlace, deletePlace };