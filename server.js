const express = require('express');
const db = require('./config/db');
const userRoute = require('./routes/userRoute');
const contactRoute = require('./routes/contactRoute');
const multer = require('multer');
const upload = multer();
const app = express();

const port = 4200;

app.use(express.json())
app.use(upload.any());


app.use('/', userRoute)
app.use('/', contactRoute)

app.listen(port, ()=>{
    console.log(`your app is running on port ${port}`)
})

