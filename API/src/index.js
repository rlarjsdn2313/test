// import express framework
const express = require('express');
const app = express();

// import body-parser
const bodyParser = require('body-parser');

// import router
const main = require('./router/main');

// listening port
const port = 3000;

// use body-parser
app.use(bodyParser());

//use router
app.use('/api', main);


// listening
app.listen(port, () => {
    console.log(`Jangseung Test API 1.0`);
    console.log(`Server is listening (port: ${port})`);
});
