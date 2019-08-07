const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('5d4b09ce1668a24a1b0d5415')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
 
app.use(errorController.get404);

mongoose
  .connect('mongodb://tester:test1234@ds143449.mlab.com:43449/node-commerce-mongodb-mongoose', { useNewUrlParser: true })
  .then(result => {
    User.findOne().then(user => {
      if (!user) {
        const user = new User({
          name: 'Rene',
          email: 'testing@test.com',
          cart: {
            items: []
          }
        });
        user.save();
      }
    });

    
    app.listen(3006); 
    console.log('Connected!');
  })
  .catch(err => {
    console.log(err); 
  });