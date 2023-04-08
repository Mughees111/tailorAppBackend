const User = require('../models/tailors');

const UserController = {
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      console.error(`Error getting users: ${err.message}`);
      res.status(500).json({ error: 'Server error' });
    }
  },

  async createUser(req, res) {
    try {
      const { name, email, password } = req.body;
      const newUser = new User({ name, email, password });
      await newUser.save();
      res.json(newUser);
    } catch (err) {
      console.error(`Error creating user: ${err.message}`);
      res.status(500).json({ error: 'Server error' });
    }
  },

  async getUserById(req, res) {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch (err) {
      console.error(`Error getting user: ${err.message}`);
      res.status(500).json({ error: 'Server error' });
    }
  },

  async updateUser(req, res) {
    try {
      const { name, email, password } = req.body;
      const updatedUser = await User.findByIdAndUpdate(req.params.id, { name, email, password }, { new: true });
      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(updatedUser);
    } catch (err) {
      console.error(`Error updating user: ${err.message}`);
      res.status(500).json({ error: 'Server error' });
    }
  },

  async deleteUser(req, res) {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);
      if (!deletedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(deletedUser);
    } catch (err) {
      console.error(`Error deleting user: ${err.message}`);
      res.status(500).json({ error: 'Server error' });
    }
  }
};

module.exports = UserController;
