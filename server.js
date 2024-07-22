const cors = require('cors');
const jsonServer = require('json-server');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Middleware
server.use(bodyParser.json());
server.use(middlewares);
server.use(cors({
  origin: '*', // Allow any origin, but you may want to restrict this in a production environment
}));

// Connect to MongoDB
mongoose.connect('mongodb://atlas-sql-669d685f5b489d06457064bc-kpgvt.a.query.mongodb.net/sample_mflix?ssl=true&authSource=admin');

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model('User', UserSchema);

// POST endpoint for /api/users
server.post('/api/users', async (req, res) => {
  const { username, password } = req.body;

  const newUser = new User({ username, password });
  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save user' });
  }
});

// Use the default router for other routes
server.use('/api', router);

server.listen(process.env.PORT || 5000, () => {
  console.log("JSON Server is running");
});
