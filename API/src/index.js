// import express framework
const express = require('express');
const app = express();

// import body-parser
const bodyParser = require('body-parser');

// import cors
const cors = require('cors');

// import router
const main = require('./router/main');
const image = require('./router/image');

// listening port
const port = 3000;

// use body-parser
app.use(bodyParser());

// use cors
app.use(cors());

//use router
app.use('/api', main);
app.use('/api/image', image);


// listening
app.listen(port, () => {
    console.log(`Jangseung Test API 1.0`);
    console.log(`Server is listening (port: ${port})`);
});
