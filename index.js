const express = require('express')
const app = express()
const port = 3000

// import middlewares
var middleware = require('./middlewares/middlewareIndex');
app.use('/', middleware)

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); 
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); 
    res.setHeader('Access-Control-Allow-Credentials', true); 
    next();
  }); 

// import router
var router = require('./routes/routeIndex');
app.use('/', router);


app.listen(port, () => console.log(`Example app listening on port ${port}!`))