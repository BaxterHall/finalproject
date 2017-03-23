const mongoose = require('mongoose');
const Schema = mongoose.Schema;
Object_Id = Schema.Object_Id

// Create a schema.
const grocerySchema = new Schema({
    title: String,
    ingredients: String,
    created_at: Date,
    updated_at: Date,
    
});
grocerySchema.pre('save', function (next) {
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
const Groceries = mongoose.model('groceries', grocerySchema);


module.exports = Groceries;
