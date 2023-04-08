const express = require('express');
const app = express();
const connectDB = require('./config/database');
const userRoutes = require('./routes/routes');
const path = require('path');

connectDB();
app.use(express.json()); // middleware to parse request body as JSON
app.use('/api', userRoutes); // Mount the userRoutes on the '/api' URL prefix
app.use('/resources/orders', express.static(path.join(__dirname, 'resources/orders')));


//   const Person = mongoose.model('employees', personSchema);

//   const person = new Person({
//     name: 'Ahitisham',
//   });

//   person.save()
//     .then(() => console.log('Person saved to database'))
//     .catch(err => console.error('Error saving person to database', err));

// const newUser = new User({
//     name: 'Mughees from model',
//     email: 'johndoe@example.coam',
//     password: 'password123'
// });

// newUser.save()
//     .then(user => {
//         console.log(`New user created: ${user}`);
//     })
//     .catch(err => {
//         console.error(`Error creating user: ${err.message}`);
//     });

// const query = User.find({ email: 'johndoe@example.coam' });

// query.then((docs) => {
//     console.log(docs);
// }).catch((err) => {
//     console.error(err);
// });

// const user = {
//     id: 1,
//     username: 'myusername',
//     password: '12345678' // hashed password
// };

// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });


app.listen(3000, () => {
    console.log('Server listening on port 3000');
});