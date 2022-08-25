const express = require('express');
require('dotenv').config();
const path = require('path');
const hbs = require('hbs');
const mysql = require('mysql2');
const nodemailer = require('nodemailer');
const app = express();
const PORT = process.env.PORT || 8080;


app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(path.join(__dirname, 'views/partials'));

app.get('/',  (req,res,next) =>{
res.render('index', {

style:'estilos.css'  
})  
});

app.get('/prosupuesto',  (req,res,next) =>{
    res.render('prosupuesto', {
    titulo: 'Genera tu prosupuesto',
    style:'estilos.css'
    })  
    });
    











app.listen(PORT, () => {
    console.log(`El servidor está trabajando en el Puerto ${PORT}`);
});