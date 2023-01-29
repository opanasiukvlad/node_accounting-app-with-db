'use strict';

const { client } = require('../db');

client.connect((err) => {
  if (err) {
    // eslint-disable-next-line no-console
    console.error('connection error', err.stack);
  } else {
    // eslint-disable-next-line no-console
    console.log('connected');
  }
});

async function create(name) {
  const qty = await client.query(`SELECT COUNT(*) FROM users`);
  const newId = +qty.rows[0]['count'] + 1;

  await client.query(`
    INSERT INTO users (id, name)
    VALUES ($1, $2)
  `, [newId, name]);

  const newUser = await getById(newId);

  return newUser;
}

async function getAll() {
  const result = await client.query(`
    SELECT *
    FROM users
    ORDER BY id
  `);

  return result.rows;
}

async function getById(userId) {
  const result = await client.query(`
    SELECT *
    FROM users
    WHERE id = $1
  `, [userId]);

  return result.rows[0] || null;
}

async function remove(userId) {
  await client.query(`
    DELETE FROM users
    WHERE id = $1
  `, [userId]);
};

async function update(userId, name) {
  await client.query(`
    UPDATE users
    SET name = $2
    WHERE id = $1
  `, [userId, name]);

  const newUser = await getById(userId);

  return newUser;
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
