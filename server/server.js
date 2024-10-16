const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { Storage } = require('@google-cloud/storage'); // Import GCS
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
    origin: [
        'https://fascinating-seahorse-c7f0dd.netlify.app', 
        'http://localhost:3000', 
        'https://pickleswithpickles.oa.r.appspot.com'
    ],
    credentials: true
}));
app.use(express.json());

// Initialize Google Cloud Storage
const storage = new Storage({
  projectId: 'your-google-cloud-project-id', // Replace with your project ID
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
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
app.use('/api/recipes', require('./routes/recipes')(bucket)); // Pass bucket to routes
app.use('/api/categories', require('./routes/categories'));
app.use('/api/auth', require('./routes/auth'));

// Catchall handler to serve React's index.html
app.get('*', (req, res) => {
  const indexPath = path.join(publicPath, 'index.html');
  console.log('Serving index.html from:', indexPath);
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    console.error('index.html not found at:', indexPath);
    res.status(404).send('index.html not found');
  }
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
