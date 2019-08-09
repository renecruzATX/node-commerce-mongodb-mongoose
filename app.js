const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const errorController = require('./controllers/error');
const User = require('./models/user');

const MONGODB_URI = 'mongodb://tester:test1234@ds143449.mlab.com:43449/node-commerce-mongodb-mongoose';

const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'total secret', 
  resave: false, 
  saveUninitialized: false,
  store: store
}));

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);
 
app.use(errorController.get404);

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true })
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