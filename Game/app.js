import express from 'express';
import router from './config/router';


const sass = require('node-sass-middleware');
const handlebars = require("express-handlebars");
const morgan = require("morgan");
const app = express();
const PORT = 3000;

app.engine("handlebars", handlebars.engine());
app.set("view engine","handlebars");

app.set("views", `${__dirname}/app/views`);

app.use("/img", express.static(`${__dirname}/public/img`))

app.use(sass({
    src: __dirname + '/public/scss',
    dest: __dirname + '/public/css',
    outputStyle: 'compressed',
    prefix: '/css',
    }));
app.use('/css', express.static(__dirname + '/public/css'));
app.use('/js', [
    express.static(__dirname + '/node_modules/bootstrap/dist/js/'),
    express.static(__dirname + '/public/js')
    ]);


app.use(router); // informando as rotas

app.use(morgan("combined"));

app.listen(PORT, ()=>{
    console.log(`Escutando na porta ${PORT}`)
});