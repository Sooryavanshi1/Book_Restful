const mongoose = require('mongoose');

module.exports=()=>{
    mongoose.connect('mongodb://0.0.0.0:27017/BooksDataBase')
    .then(()=>{
        console.log("Mongoose is connected to MongoDB")
    })
    .catch((err)=>console.log(err.message));

    mongoose.connection.on('connected',()=>{
        console.log("Mongoose is connected to MongoDB")
    })
    mongoose.connection.on('disconnected',()=>{
        console.log("Mongoose is disconnected to MongoDB")
    })
    mongoose.connection.on('error',(err)=>{
        console.log(err.message);
    })
    process.on('SIGINT',()=>{
        console.log("Mongoose is disconnected on App termination");
    })
}