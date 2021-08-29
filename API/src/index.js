// import express framework
const express = require('express');
const app = express();

// listening port
const port = 3000;


// listening
app.listen(port, () => {
    console.log(`Jangseung Test API 1.0`);
    console.log(`Server is listening (port: ${port})`);
});