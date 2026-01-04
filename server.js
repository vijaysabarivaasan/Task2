const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
mongoose.connect('mongodb://localhost:27017/libraryDB',
{ useNewUrlParser:true, useUnifiedTopology:true
}).then(()=>console.log('MongoDB connected'))
.catch(err=>console.log(err));
const bookSchema = new mongoose.Schema({
title:String, author:String, category:String,
publishedYear:Number, availableCopies:Number
});
const Book = mongoose.model('Book', bookSchema);
// CRUD APIs
app.post('/books', async (req,res)=>{ const book=new Book(req.body); 
await book.save(); res.send(book); });
app.get('/books', async (req,res)=>{ const books=await Book.find(); 
res.send(books); });
app.get('/books/:id', async (req,res)=>{ const book=await 
Book.findById(req.params.id); res.send(book); });
app.put('/books/:id', async (req,res)=>{ const book=await 
Book.findByIdAndUpdate(req.params.id,req.body,{new:true}); 
res.send(book); });
app.delete('/books/:id', async (req,res)=>{ await 
Book.findByIdAndDelete(req.params.id); res.send({message:"Book 
deleted"}); });
app.listen(5000, ()=>console.log('Backend running on port
5000'));