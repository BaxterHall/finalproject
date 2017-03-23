const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const grocerySchema = new Schema({
    title: String,
    ingredients: String,
    created_at: Date,
    updated_at: Date,
})

// Create a schema.
const userSchema = new Schema({
  username: {
      type: String,
      required: true,
      unique: true
  },
  password: String,
  created_at: Date,
  updated_at: Date,
  grocerylist: [grocerySchema]
});
userSchema.pre('save', function(next) {
    // Get the current date.
    const currentDate = new Date();

    // Change the updated_at field to current date.
    this.updated_at = currentDate;

    // If created_at doesn't exist, add to that field
    if (!this.created_at) {
        this.created_at = currentDate;
    }

    // Continue.
    next();
});
const User = mongoose.model('user', userSchema);


module.exports = User;
