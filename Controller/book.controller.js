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
    }
}