const cors = require('cors');
const jsonServer = require('json-server');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Define the ListItem schema
const ListItemSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  number: { type: String, required: true },
});

// Create the ListItem model
const ListItem = mongoose.model('ListItem', ListItemSchema);

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model('User', UserSchema);

// Middleware
server.use(bodyParser.json());
server.use(middlewares);
server.use(cors({
  origin: '*', // Allow any origin, but you may want to restrict this in a production environment
}));

// Connect to MongoDB
mongoose.connect('mongodb://atlas-sql-669d685f5b489d06457064bc-kpgvt.a.query.mongodb.net/sample_mflix?ssl=true&authSource=admin');

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

// GET endpoint to fetch all users
server.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users', details: error });
  }
});

// POST endpoint to register a vehicle
server.post('/api/list', async (req, res) => {
  const { id, number } = req.body;
  const newListItem = new ListItem({ id, number });

  try {
    const savedListItem = await newListItem.save();
    res.status(201).json(savedListItem);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save list item', details: error });
  }
});

// GET endpoint to fetch all vehicles
server.get('/api/list', async (req, res) => {
  try {
    const list = await ListItem.find();
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch list items', details: error });
  }
});

// Use the default router for other routes
server.use('/api', router);

server.listen(process.env.PORT || 5000, () => {
  console.log("JSON Server is running");
});
