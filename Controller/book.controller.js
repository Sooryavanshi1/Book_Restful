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
           
            const book = await Book.findById(id);
            if(!book){
                throw (createError(404,"no book by this Id"));
            }
            res.send(book);
        }catch(error){
            if(error instanceof mongoose.CastError){
                next(createError(400,"Invalid Id"));
                return;
            }
            next(error);
        }
    },
    updateAbooksGenreById:async(req,res,next)=>{
        try{
            const id = req.params.id;
            const updates = req.body.book_Genre;
            const options = {new:true};
            const book = await Book.findById(id);
            if(book.book_Genre.includes(updates)){
                throw (createError(401,"Genre Already Present"))
            }
            const result = await Book.findByIdAndUpdate(id,{$push:{book_Genre:updates}},options);
            if(!result){
                throw (createError(404,"No Book Found"));
            }
            res.send(result)
        }catch(error){
            if(error instanceof mongoose.CastError){
                next(createError(400,"Inavlid Id"));
            }
            next(error);
        }
    },
    updateGenreOfAll:async(req,res,next)=>{
        try{
            const oldGenre = req.query.old_Genre;
            const newGenre = req.body.book_Genre;
            const options = {new:true};
            const check = await Book.find({book_Genre:{$in:[oldGenre]}});
            if(check.length===0){
                throw(createError(404,"No book by this Genre"));
            }
            const pushUpdateResult = await Book.updateMany(
                { book_Genre: { $in: [oldGenre] } },
                { $push: { book_Genre: newGenre } },
                options
            );
        
            // Update by pushing the new genre
            const pullUpdateResult = await Book.updateMany(
                { book_Genre: { $in: [oldGenre] } }, // Use oldGenre in the query
                { $pull: { book_Genre: oldGenre } },
                options
            );
           const books = await Book.find({book_Genre:{$in:[newGenre]}});
            res.send(books);
        }catch(error){
            next(error);
        }
    },
    deleteABook:async(req,res,next)=>{
        try{
            const id = req.params.id;
           
            const result = await Book.findByIdAndDelete(id);
            if(!result){
                throw(createError(404,"No book by this Id"));
            }
            res.send(result);
        }catch(error){
            if(error instanceof mongoose.CastError){
                next(createError(400,'Inavlid Id'));
            }
            next(error)
        }
    }
}