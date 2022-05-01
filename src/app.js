const { hasSubscribers } = require('diagnostics_channel');
const express = require('express');
const { rmdirSync } = require('fs');
const hbs = require('hbs');
const app = express();
const port = process.env.PORT || 8080;
const path = require('path');
const staticPath = path.join(__dirname, "../public")

const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.use(express.static(staticPath));
app.set("view engine", "hbs");
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

app.use(express.json());
express.urlencoded({extended:false})

app.get("/", (req,res)=>{
    res.render('index');
})

app.get("/details", (req,res)=>{
    res.render('details');
})

app.get("/checkout", (req,res)=>{
    res.render('checkout');
})

app.get("/thankyou", (req,res)=>{
    res.render('thankyou')
})


app.listen(port, ()=>{
    console.log(`port start running at ${port}`)
})