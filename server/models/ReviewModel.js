const mongoose = require('mongoose');
const uniqid = require('uniqid');
var Schema = mongoose.Schema

const _ReviewModel = new mongoose.Schema({
    _id: String,
    stars: {type: Number, required: true},
    comment: {type: String, required: false},
    clientId: {
        type: String,
        required:true,
        ref: "User"
    },
    itemId: {
        type: String,
        required:true,
        ref: "Item"
    }
},  { collection: "Review"});

_ReviewModel.pre('save', function (next) {
    const rev = this;
    if (!rev._id)
        rev._id = uniqid('id-');
    next();
});

const ReviewModel = mongoose.model('Review', _ReviewModel);

module.exports = ReviewModel;