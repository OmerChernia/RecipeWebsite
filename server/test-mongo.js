const mongoose = require('mongoose');

const uri = 'mongodb+srv://omer12899:aa1234@recepieweb.tq7l6.mongodb.net/RecepieWeb?retryWrites=true&w=majority'; // Use the same URI as in app.yaml

mongoose.connect(uri)
  .then(() => {
    console.log('Connected successfully');
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Connection error:', err);
  });