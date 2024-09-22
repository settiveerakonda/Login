import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import User from './Models/User';
import Address from './Models/Address';

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb+srv://settiveera9652:H5bypsDMVWzzOkaW@cluster0.qvbwjlp.mongodb.net/Login?retryWrites=true&w=majority')
  .then(() => app.listen(4000))
  .then(() => console.log("Connected to MongoDB & listening on port 4000"))
  .catch((err) => console.log(err));

// Register user and store address
app.post('/register', async (req, res) => {
  const { name, address, password } = req.body;

  try {
    // Create new user with password
    const newUser = new User({ name, password });
    const savedUser = await newUser.save();

    // Create new address associated with user
    const newAddress = new Address({
      userId: savedUser._id,
      address,
    });
    await newAddress.save();

    res.status(201).json({ message: 'User and Address created successfully', userId: savedUser._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error registering user', error: err });
  }
});

// Login user
app.post('/login', async (req, res) => {
  const { name, password } = req.body;

  try {
    const user = await User.findOne({ name });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.password === password) {
      return res.status(200).json({ message: 'Login successful', userId: user._id });
    } else {
      return res.status(400).json({ message: 'Invalid password' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error logging in', error: err });
  }
});
