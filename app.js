//WE SHOULD ALWAYS USE SOME REFERENSE CODE THROUGH WHICH WE CAN COPY SOME THINGS FROM THAT CODE TO OUR CODE
//WHEN WE MAKE A NEW PROJECT LIKE THIS  THEN WE HAVE TO DO:
// 1. MAKE A APP.JS
// 2. IMPORT ALL THE MODULES
// 3. WRITE npm init
// 4. INSTALL EXPRESS AND PUG
// 5. INSTALL MONGNOOSE
// 6. INSTALL BODYPARSER
// 5. MAKE TWO FOLDERS VIEWS AND STATIC
// 6. INSIDE STATIC MALE IMG FOLDER, INDEX.JS ,  JAVASCRIPT FILE ,CSS FILE
// 7. INSIDE VIEWS MAKE ALL PUG FILE


const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 8000;

//IMPORTING MONGOOSE
const mongoose = require('mongoose');
const bodyparser = require('body-parser')
mongoose.connect('mongodb://localhost/contactdance', {useNewUrlParser: true, useUnifiedTopology: true});

//DEFINE MONGOOSE SCHEMA
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String,
  });

  //CONVERTING SCHMEA INTO MODULE
  const contact = mongoose.model('contact', contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
// ENDPOINTS
app.get('/', (req, res)=>{
    const params = {}
    res.status(200).render('home.pug', params);
})

app.get('/contact', (req, res)=>{
    const params = {}
    res.status(200).render('contact.pug', params);
})

app.post('/contact', (req, res)=>{
    var mydata = new contact(req.body);
    mydata.save().then(()=>{
        res.send("this item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("item was not saved to your database")
    })

    // res.status(200).render('contact.pug');
})

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});