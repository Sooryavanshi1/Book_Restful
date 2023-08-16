const express = require('express');
const router = express.Router();
const bookController = require('../Controller/book.controller')

router.post("/",bookController.addABooksDetails)
router.get("/",bookController.getAllBooks)
router.get("/genre",bookController.getBooksOfAParticularGenre)
router.get("/:id",bookController.getBookById);
module.exports = router;