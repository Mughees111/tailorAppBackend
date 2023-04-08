const mongoose = require('mongoose');


const connectDB = async () => {

    mongoose.connect('mongodb://localhost/tailor_app', { useNewUrlParser: true })
        .then(() => console.log('Connected to MongoDB'))
        .catch(err => {
            console.error('Error connecting to MongoDB', err)
            process.exit(1);
        });


}

module.exports = connectDB;
