const express = require('express')
const app = express()
const port = 4000
const cors = require('cors');
const bodyParser = require('body-parser');
//import mongoose
const mongoose = require('mongoose');

app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
    next();
    });




// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//link needed for mongodb cluster
const myConnectionString = 'mongodb+srv://cathal:admin@cluster0.qrfkd.mongodb.net/movies?retryWrites=true&w=majority';
mongoose.connect(myConnectionString, {useNewUrlParser: true});

const Schema = mongoose.Schema;

//schema create new model
var movieSchema = new Schema ({
    title:String,
    year:String,
    poster:String
});

//connected server to database
var MovieModel = mongoose.model('movie', movieSchema);

app.get('/api/movies',(req, res)=>{
    
//     const mymovies = [{
//         "Title":"Avengers: Infinity War",
//         "Year":"2018",
//         "imdbID":"tt4154756",
//         "Type":"movie",
//         "Poster":"https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg"
//         },
//         {
//         "Title":"Captain America: Civil War",
//         "Year":"2016",
//         "imdbID":"tt3498820",
//         "Type":"movie",
//         "Poster":"https://m.media-amazon.com/images/M/MV5BMjQ0MTgyNjAxMV5BMl5BanBnXkFtZTgwNjUzMDkyODE@._V1_SX300.jpg"
//         }];
//     res.status(200).json({
//         message:"Everything is ok",
//         movies:mymovies});
// })
MovieModel.find((err, data)=>{
    res.json(data);
})

// res.status(200).json({
//     message: "Everything is ok",
//     movies:mymovies});
})

//can find movie by id
app.get('/api/movies/:id', (req,res)=>{
    console.log(req.params.id);

    MovieModel.findById(req.params.id, (err, data)=>{
        res.json(data);
    })
})

app.put('/api/movies/:id', (req, res)=>{
    console.log("Update movie: " + req.params.id);
    console.log(req.baby);

    //pulls id out and updates record
    MovieModel.findByIdAndUpdate(req.params.id,req.body, {new:true},
    (err,data)=>{
        res.send(data);
    })
})



app.post('/api/movies',( req, res)=>{
console.log('Movie Recieved');
console.log(req.body.title);
console.log(req.body.year);
console.log(req.body.poster);

MovieModel.create({
        title:req.body.title,
        year:req.body.year,
        poster:req.body.poster
    })
    res.send('Item Added');
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})