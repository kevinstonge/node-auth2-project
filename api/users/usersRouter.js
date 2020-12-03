const db = require("../../dbConfig.js");
const Users = require("./usersModel.js");
const router = require("express").Router();
const bcrypt = require("bcryptjs");
router.get("/", async (req, res) => {
  try {
    const users = await Users.getUsers();
    res.status(200).json({ users });
  } catch (error) {
    res
      .status(500)
      .json({ message: "error retrieving users data from the database" });
  }
});

router.post("/register", async (req, res) => {
  const { username, password, department } = req.body || null;
  if (!username || !password || !department) {
    res.status(401).json({
      message: "error: please provide username, password, and department",
    });
  } else {
    try {
      const hash = bcrypt.hashSync(password);
      const userObject = { username, hash, department };
      const newUserId = await Users.register(userObject);
      res
        .status(201)
        .json({ message: `new user created with id: ${newUserId}` });
    } catch (error) {
      console.log(error);
    }
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body || null;
  if (!username || !password) {
    res
      .status(401)
      .json({ message: "error: please provide username and password" });
  } else {
    const user = await Users.getUser(username);
    if (user && user.username) {
      if (bcrypt.compareSync(password, user.hash)) {
        console.log("logged in!");
        res.status(200).json({ message: "logged in!" });
      } else {
        console.log("incorrect password");
        res.status(401).json({ message: "incorrect password" });
      }
    } else {
      res
        .status(401)
        .json({ message: `error: username '${username}' does not exist` });
    }
  }
});

module.exports = router;
