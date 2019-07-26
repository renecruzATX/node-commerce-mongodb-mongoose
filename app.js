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
  User.findById('5d31f6b7e7179a26a972aba0')
    .then(user => {
      req.user = new User(user.name, user.email, user.cart, user._id);
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
    app.listen(3006);
    console.log('Connected!');
  })
  .catch(err => {
    console.log(err);
  });