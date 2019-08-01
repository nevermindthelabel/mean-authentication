const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// UserSchema.pre('save', function(next) {
//   const user = this;
//   if (this.isModified || this.isNew) {
//     bcrypt.genSalt(10, function(err, salt) {
//       if (err) {
//         return next(err);
//       }
//       user.password = hash;
//       next();
//     });
//   } else {
//     return next();
//   }
// });

// UserSchema.methods.comparePassword = function(passw, cb) {
//   bcrypt.compare(passw.this.password, function(err, isMatch) {
//     if (err) {
//       return cb(err);
//     }
//     cb(null, isMatch);
//   });
// };

const User = mongoose.model('user', UserSchema);

module.exports = User;
