const mongoose = require('mongoose');
const uniqid = require('uniqid');
var Schema = mongoose.Schema;

const _GroupModel = new mongoose.Schema({
    _id: String,
    items: {
        type: [String],
        ref: 'Item',
        default: []
    },
    name: {type: String, required: true},
},  { collection: "Group"});

_GroupModel.pre('save', function (next) {
    const group = this;
    if (!group._id)
        group._id = uniqid('id-');
    next();
});

const GroupModel = mongoose.model('Group', _GroupModel);

module.exports = GroupModel;