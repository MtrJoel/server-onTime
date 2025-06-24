const mongoose = require('mongoose');

const fichaSchema = new mongoose.Schema({
    ficha: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    location: {type: String, required: true},
    schools:[{
        institute: {type: String, require: true},
        amount: {type: Number, require: true}
    }]
});

module.exports = mongoose.model('Ficha', fichaSchema);