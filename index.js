const express = require('express');
require('dotenv').config();
const path = require('path');
const hbs = require('hbs');
const mysql = require('mysql2');
const nodemailer = require('nodemailer');
const app = express();
const PORT = process.env.PORT || 8080;



const conexion = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
}); 

conexion.connect((err) => {
    if (err) {
        console.error(`Error en la conexión: ${err.stack}`)
        return;
    }
    console.log(`Conectado a la Base de Datos ${process.env.DATABASE}`);
}); 

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

    app.get('/registro',  (req,res,next) =>{
        res.render('registro', {
        titulo1: 'Crea una cuenta nueva',
        style:'estilos.css'
        })  
        });

    app.get('/prosupuesto',  (req,res,next) =>{
    res.render('prosupuesto', {
    titulo: 'Genera tu prosupuesto',
    style:'estilos.css'
    })  
    });

    

        
app.post('/prosupuesto', (req,res) =>{

    const { email, celular, descripciondefalla} = req.body;

        console.log(email, celular, descripciondefalla);
        

    if(email == '' || celular == ''|| descripciondefalla == '') {

        let validacion = 'Introduzca los campos obligatorios';
        
        res.render('prosupuesto',{
            titulo: 'Genera tu prosupuesto',
            style:'estilos.css',
            validacion
        });

    }else{
    
        let datos = {
   
    email: email,
    celular: celular,
    descripciondefalla: descripciondefalla
        };

let sql ='INSERT INTO prosupuesto.miprosupuesto SET ?';

conexion.query(sql, datos, (err, result ) => {
    
    if (err) throw err;
    res.render('prosupuesto', {
    titulo: 'Genera tu prosupuesto',
    style:'estilos.css'
}); 
});

    } 
    });

    app.post('/registro', (req,res) =>{

            const { email, contraseña} = req.body;
            let fecha = new Date();

        
        if(email == '' ||contraseña == '') {
        
            let validacion = 'introduzca los campos obligatorios para registrarse';
            
            res.render('registro',{
                titulo:'crear una nueva cuenta',
                style:'estilos.css',
                validacion
            });

            
            }else{
        
                console.log(email);
                console.log(contraseña);

        async function enviomail() {

            let transporter = nodemailer.createTransport ({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.USEREMAIL,
                pass: process.env.PASSWORDEMAIL
            }
        }); 

        let envio = await transporter.sendMail({
            from: process.env.USEREMAIL,
            to: `${email}`,
            subject: 'Gracias por enviar su prosupuesto',
            html: `Muchas gracias por contactarse con TECNO-OESTE servicio tecnico, estaremos respondiendo su pedido de prosupuesto <br>
            Le enviareos su pedido por via mail o telefonicamente a la brevedad.<br>
            ${fecha}`
        });

        res.render('enviado',{
            tituloenviado:'Tu registro fue cargado correctamente',
            style:'estilos.css',
            email,
            contraseña,
    
            })
        }
        enviomail();  

        }
    })   
    



app.listen(PORT, () => {
    console.log(`El servidor está trabajando en el Puerto ${PORT}`);
});

