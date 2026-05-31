const supabase = require('./supabase');

async function getAll(table) {
  const { data, error } = await supabase.from(table).select('*');
  if (error) { console.error(error); return []; }
  return data;
}

async function getById(table, column, value) {
  const { data, error } = await supabase.from(table).select('*').eq(column, value).maybeSingle();
  if (error) { console.error(error); return null; }
  return data;
}

async function insertOne(table, obj) {
  const { data, error } = await supabase.from(table).insert([obj]).select().single();
  if (error) { console.error(error); return null; }
  return data;
}

async function updateOne(table, column, value, updates) {
  const { data, error } = await supabase.from(table).update(updates).eq(column, value).select().single();
  if (error) { console.error(error); return null; }
  return data;
}

async function deleteOne(table, column, value) {
  const { error } = await supabase.from(table).delete().eq(column, value);
  if (error) { console.error(error); return false; }
  return true;
}

module.exports = { getAll, getById, insertOne, updateOne, deleteOne };