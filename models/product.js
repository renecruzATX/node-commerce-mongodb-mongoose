const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    required: true  
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true  
  },
  imageUrl: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Product', productSchema);

// const ObjectId = require('mongodb').ObjectID;
// const getDb= require('../util/database').getDb;

// class Product {
//   constructor(title, price, description, imageUrl, _id, userId) {
//     this.title = title;
//     this.price = price;
//     this.description = description;
//     this. imageUrl = imageUrl;
//     this._id = _id ? ObjectId(_id) : null;
//     this.userId = userId; 
//   }

//   save() {
//     const db = getDb();
//     let dbOp;

//     if (this._id) {
//       //Update the product
//       dbOp = db.collection('products').updateOne({_id: this._id}, {$set: this});
//     } else {
//       dbOp = db.collection('products').insertOne(this);
//     }
//     return dbOp
//       .then(result => {
//         console.log(result);
//       })
//       .catch(err => console.log(err));
//   }

//   static findById(prodId) {
//     const db = getDb();
//     return db
//       .collection('products')
//       .find({_id: ObjectId(prodId)})
//       .next()
//       .then(product => {
//         console.log(product);
//         return product;
//       })
//       .catch(err => console.log(err));
//   }

//   static fetchAll() {
//     const db = getDb();
//     return db
//       .collection('products')
//       .find()
//       .toArray()
//       .then()
//       .catch(err => console.log(err));
//   }

//   static deleteById (prodId) {
//     const db = getDb();
//     return db
//       .collection('products')
//       .deleteOne({_id: ObjectId(prodId)})
//       .then(result => {
//         console.log('Deleted');
//       })
//       .catch(err => console.log(err));
//   }
// };

// module.exports = Product;