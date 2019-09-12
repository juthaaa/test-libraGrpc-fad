const express = require('express'); 
//const mysql = require('mysql'); 
const bodyParser = require('body-parser');
//var session = require('express-session');
const app = express();
var router = express.Router();

app.use( bodyParser.json() );      
app.use(bodyParser.urlencoded({     
  extended: true
})); 



//app.use(session({secret: 'ssshhhhh'}));
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); 
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); 
  res.setHeader('Access-Control-Allow-Credentials', true); 
  next();
}); 






// const database = mysql.createConnection({  
//     host: '127.0.0.1',
//     user: 'root',
//     password: '',
//     database: 'demo'
// });

//database.connect(); 

app.listen('3000', () => {     
    console.log('start port 3000')
});



app.post('/test', (req, res) => {   
 
  //   var sql = "SELECT * FROM users";				
  //   var query = database.query(sql, (err, results) => { 
  //      if (err) throw err  
	 	//		console.log(sess);  
  //    return  res.send(results);  
  var user=req.query.user;
  var pass=req.query.pass;
//console.log("User name = "+user+", password is "+pass); 
  //  });
  res.end(user+ " / "+ pass);
  console.log(req.session)
});

app.post('/login2', (req, res) => {   
	
  var user=req.query.user;
  var pass=req.query.pass;

		console.log("User name = "+user+", password is "+pass);
  res.end("completed post.");
});

app.get('/t' , (req,res) => {
  https://api-test.libexplorer.com/api?module=version&action=latest
  console.log("completed get api libra last.");
  //return  res.send(results); 
})

app.get('/login3', (req, res) => {   
	
  // var user=req.query.user;
  // var pass=req.query.pass;

	//	console.log("User name = "+user+", password is "+pass);
  console.log("completed post.");
});



