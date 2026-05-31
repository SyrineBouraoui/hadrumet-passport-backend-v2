const { getAll, getById, insertOne, updateOne, deleteOne } = require('../utils/fileHelper');

const getAllContacts = async (req, res) => {
  const contacts = await getAll('contacts');
  res.json(contacts);
};

const getContactById = async (req, res) => {
  const contact = await getById('contacts', 'id', req.params.id);
  if (!contact) return res.status(404).json({ message: 'Contact not found' });
  res.json(contact);
};

const createContact = async (req, res) => {
  const contact = await insertOne('contacts', req.body);
  if (!contact) return res.status(500).json({ message: 'Error creating contact' });
  res.status(201).json(contact);
};

const updateContact = async (req, res) => {
  const contact = await updateOne('contacts', 'id', req.params.id, req.body);
  if (!contact) return res.status(404).json({ message: 'Contact not found' });
  res.json(contact);
};

const deleteContact = async (req, res) => {
  const deleted = await deleteOne('contacts', 'id', req.params.id);
  if (!deleted) return res.status(404).json({ message: 'Contact not found' });
  res.json({ message: 'Contact deleted' });
};

module.exports = { getAllContacts, getContactById, createContact, updateContact, deleteContact };