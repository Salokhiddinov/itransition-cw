const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const { secret } = require("../config");

const generateAccestoken = (id, roles) => {
  const payload = {
    id,
    roles,
  };
  return jwt.sign(payload, secret, { expiresIn: "1h" });
};

class authRouter {
  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { username, password, role } = req.body;
      const candidate = await User.findOne({ username });
      if (candidate) {
        return res.status(400).json({ message: "User already exists" });
      }
      const salt = bcrypt.genSaltSync(10);
      const hashPassword = bcrypt.hashSync(password, salt);
      const user = new User({
        username: username,
        password: hashPassword,
        role: role,
      });
      await user.save();
      return res.json({ message: "User created" });
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: err });
    }
  }

  async login(req, res) {
    try {
      const { username, password } = req.body;
      console.log("======================");
      console.log(req.body);
      console.log("======================");

      const user = await User.findOne({ username: username });
      console.log(user);
      
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: "Invalid password" });
      }
      const token = generateAccestoken(user._id, user.roles);
      user.lastLogin = Date.now();
      await user.save();
      const result = { token: token, user: user };
      return res.json(result);
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: "Login Error" });
    }
  }

  async getUsers(req, res) {
    try {
      const users = await User.find({});
      res.json(users);
    } catch (err) {
      console.log(err);
    }
  }
  async changeStatus(req, res) {
    try {
      const { username, role } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }
      user.role = role;
      await user.save();
      res.status(200).json({ message: "Status changed" });
    } catch (err) {
      console.log(err);
    }
  }
  async deleteUser(req, res) {
    try {
      const { username } = req.body;
      const user = await User.findOne({ username: username });
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }
      await user.remove();
      res.status(204).json({ message: "User deleted" });
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = new authRouter();
