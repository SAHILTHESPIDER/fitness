const { default: mongoose } = require('mongoose');
const Mongoose= require('mongoose');

const Mongo_url = process.env.MONGO_CONN;

// MongoDB connection
mongoose
  .connect(Mongo_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB...'))
  .catch((err) => console.error('Could not connect to MongoDB', err));
