const express = require('express')
const createError = require('http-errors')
const BookRoute = require('./Route/book.Routes')
const app = express();

//parsing happens before initializing database
app.use(express.json());

require('./initialize.Database')()

app.use("/Books",BookRoute)

app.use((req,res,next)=>{
    next(createError(404,"Route Not Found"))
})

app.use((err,req,res,next)=>{
    res.status(err.status||500);
    res.send({
        error:{
            status:err.status||500,
            message:err.message
        }
    });
});

app.listen(3000,()=>{
    console.log("Server is Started on port 3000");
})