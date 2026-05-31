const { getAll, getById, insertOne, updateOne, deleteOne } = require('../utils/fileHelper');

const getAllEvents = async (req, res) => {
  const events = await getAll('events');
  res.json(events);
};

const getEventById = async (req, res) => {
  const event = await getById('events', 'id', req.params.id);
  if (!event) return res.status(404).json({ message: 'Event not found' });
  res.json(event);
};

const createEvent = async (req, res) => {
  const event = await insertOne('events', req.body);
  if (!event) return res.status(500).json({ message: 'Error creating event' });
  res.status(201).json(event);
};

const updateEvent = async (req, res) => {
  const event = await updateOne('events', 'id', req.params.id, req.body);
  if (!event) return res.status(404).json({ message: 'Event not found' });
  res.json(event);
};

const deleteEvent = async (req, res) => {
  const deleted = await deleteOne('events', 'id', req.params.id);
  if (!deleted) return res.status(404).json({ message: 'Event not found' });
  res.json({ message: 'Event deleted' });
};

module.exports = { getAllEvents, getEventById, createEvent, updateEvent, deleteEvent };