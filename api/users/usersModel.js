const db = require("../../dbConfig.js");

const getUsers = async () => {
  try {
    return await db("users");
  } catch (error) {
    throw error;
  }
};

const register = async (userObject) => {
  try {
    return await db("users").insert(userObject);
  } catch (error) {
    throw error;
  }
};

const getUser = async (username) => {
  try {
    return await db("users").where({ username }).first();
  } catch (error) {
    throw error;
  }
};

module.exports = { getUsers, register, getUser };
