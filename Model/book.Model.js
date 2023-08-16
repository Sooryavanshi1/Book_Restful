const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookSchema = new Schema({
    book_Name:{
        type:String,
        required:true,
    },
    book_Author:{
        type:String,
        required:true,
    },
    book_Genre:{
        type:Array,
        required:true,
    }
})

const Book = mongoose.model('Books',bookSchema);
module.exports = Book