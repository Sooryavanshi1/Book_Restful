const express = require('express');
const router = express.Router();
const bookController = require('../Controller/book.controller')

router.post("/",bookController.addABooksDetails)

module.exports = router;