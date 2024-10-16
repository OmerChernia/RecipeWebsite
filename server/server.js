const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { Storage } = require('@google-cloud/storage'); // Import GCS
require('dotenv').config();

const app = express();

// Middleware
const allowedOrigins = [
  'https://fascinating-seahorse-c7f0dd.netlify.app',
  'http://localhost:3000',
  'https://pickleswithpickles.oa.r.appspot.com'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

// Initialize Google Cloud Storage
const storage = new Storage({
  projectId: 'pickleswithpickles', // Replace with your actual project ID
  // No need to specify credentials; default service account will be used
});

const bucket = storage.bucket(process.env.GCS_BUCKET_NAME);

// Serve static files from the React app
const publicPath = path.join(__dirname, 'public');
console.log('Public path:', publicPath);
console.log('Files in public directory:', fs.readdirSync(publicPath));

app.use(express.static(publicPath));

// Serve the uploads directory as static
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/recipes', require('./routes/recipes')(bucket));
app.use('/api/categories', require('./routes/categories')); // Add this line
app.use('/api/auth', require('./routes/auth')); // Ensure auth routes are included

const PORT = process.env.PORT || 8081;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));
