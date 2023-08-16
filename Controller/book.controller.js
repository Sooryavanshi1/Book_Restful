const mongoose = require('mongoose');
const createError = require('http-errors');
const Book = require('../Model/book.Model');

module.exports={
    addABooksDetails:async(req,res,next)=>{
        try {
            const book = new Book(req.body);
            const result = await book.save();
            res.send(result)
        } catch (error) {
            if(error.name==='ValidationError'){
                next(createError(422,error.message))
                return;
            }
            next(error);
        }
    },
    getAllBooks:async(req,res,next)=>{
        try{
        const books = await Book.find({},{"__v":0});
        if(books.length===0){
            throw (createError(404,"No Books found"));
        }
        res.send(books);
    }catch(error){
        next(error);
    }
    },
    getBooksOfAParticularGenre:async(req,res,next)=>{
        try{
            const genre = req.query.book_Genre;
            const books = await Book.find({book_Genre:{$in:genre}});
            if(books.length===0){
                throw (createError(404,"No Book by This Genre"));
            }
            res.send(books)
        }catch(error){
            next(error);
        }
    },
    getBookById:async(req,res,next)=>{
        try{
            const id = req.params.id;
            if(id instanceof mongoose.CastError){
                throw(createError(400,"Invalid Id"));
            }
            const book = await Book.findById(id);
            if(!book){
                throw (createError(404,"no book by this Id"));
            }
            res.send(book);
        }catch(error){
            next(error);
        }
    }
}