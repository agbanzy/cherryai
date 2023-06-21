// server.js

const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const app = express();

// MongoDB connection
mongoose.connect('mongodb://localhost/cherry', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(express.json()); // for parsing application/json

// Middleware for logging each request
app.use((req, res, next) => {
    console.log(`${req.method} request for '${req.url}'`);
    next();
});

// User Schema
const userSchema = new mongoose.Schema({
  googleId: String,
  appleId: String,
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  learningData: mongoose.Schema.Types.Mixed, // Can store any data type here
  date: { type: Date, default: Date.now }
});

// Password hashing middleware
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    return next(err);
  }
});

// User Model
const User = mongoose.model('User', userSchema);

// Authentication middleware
const authenticate = async (req, res, next) => {
  // Check if Authorization header is present
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).send('Authorization header missing');

  const token = authHeader.split(' ')[1];
  
  // Here we should verify the token with our secret key and fetch the user from database, 
  // but for simplicity we just decode it
  const { username, password } = JSON.parse(Buffer.from(token, 'base64').toString());

  // Find the user and compare passwords
  const user = await User.findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(403).send('Invalid username or password');
  }

  req.user = user; // Store user in request
  next();
};

// Authorization middleware
const authorize = roles => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).send('Access denied');
  }
  next();
};

app.get('/users', authenticate, authorize(['admin']), async (req, res) => {
  const users = await User.find();
  res.send(users);
});

app.post('/users', async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.put('/users/:id', authenticate, authorize(['admin', 'user']), async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send('User not found');

    if (req.user._id.toString() !== user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).send('Access denied');
    }

    Object.assign(user, req.body);
    await user.save();

    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.delete('/users/:id', authenticate, authorize(['admin']), async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).send('User not found');

    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(3000, () => console.log('Server started on port 3000'));
