const { string, number } = require('joi');
const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/biblioteca", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

const libroSchema = new mongoose.Schema({
    titulo: String,
    autor: String
}, 
{
    collection: 'libros'});

const libro = mongoose.model('libro', libroSchema);

module.exports = libro;
