'use strict';

const usersService = require('../services/users');

const create = async(req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = await usersService.create(name);

  res.statusCode = 201;
  res.send(newUser);
};

const getAll = async(req, res) => {
  const users = await usersService.getAll();

  res.send(users);
};

const getById = async(req, res) => {
  const { userId } = req.params;
  const foundUser = await usersService.getById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(foundUser);
};

const remove = async(req, res) => {
  const { userId } = req.params;
  const foundUser = await usersService.getById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  };

  usersService.remove(userId);
  res.sendStatus(204);
};

const update = async(req, res) => {
  const { userId } = req.params;
  const { name } = req.body;

  const foundUser = await usersService.getById(userId);

  if (!userId || !name) {
    res.sendStatus(400);

    return;
  };

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  const updatedUser = await usersService.update(userId, name);

  res.send(updatedUser);
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
