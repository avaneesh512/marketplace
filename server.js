const express = require('express')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const bodyParser = require('body-parser')
const fs = require('fs');
var mysql = require('mysql')
const Sequelize = require('sequelize');
const app = express()

app.use(cors())
app.use(bodyParser.json())

const sequelize = new Sequelize('shopping_cart', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'shopping_cart'
})
const accessTokenSecret = 'istoreaccesstokensecretkey';

connection.connect(function(err){
  if(!err) {
      console.log("Database is connected ...");
  } else {
      console.log("Error connecting database ...");
  }
  });

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the API.'
  })
})

app.post('/login', (req, res) => {
  var email = req.body.email;
  var password = req.body.password;
  var sql = 'SELECT * FROM users WHERE email = ? AND password = ?';

  connection.query(sql, [email, password], function (err, rows, fields) {
    if (rows.length) {
      var userDetails = rows[0];
      const token = jwt.sign({ userDetails }, accessTokenSecret)
      res.json({
        token,
        email: userDetails.email,
        name: userDetails.name
      })
    }else {
      res.status(401).json({ error: 'Invalid login. Please try again.' })
    }    
  })
})

//register
app.post('/register', (req, res) => {
  if (req.body) {
    const userDetails = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password
      // In a production app, you'll want to encrypt the password
    }

    var sql = 'SELECT * FROM users WHERE email = ?';

    connection.query(sql, [userDetails.email], function (err, rows, fields) {
      if(err) {
        connection.end();
        return console.log(err);
      }

      if (!rows.length) {
        connection.query('INSERT INTO users SET ?',userDetails, function (error, results, fields) {
          if (error) {
            res.status(400).json({
              message:"error ocurred",
              error: true
            })
          } else {  
            const token = jwt.sign({ userDetails }, accessTokenSecret)
              res.status(200).json({               
                message:"user registered sucessfully",
                token: token,
                email: userDetails.email,
                name: userDetails.name,
                error: false
              })         
            }
        });
      }else {        
        res.json({
          error: true,
          message: "User already exists"
        })     
      }    
    })
  } else {
    res.sendStatus(400)
  }
})

app.get('/profile', verifyToken, function(req, res){
  const userEmail = req.user.userDetails.email;
  if(userEmail) {
    var sql = 'SELECT * FROM users WHERE email = ?';

    connection.query(sql, [userEmail], function (err, rows, fields) {
      if(err) {
        connection.end();
        return console.log(err);
      }

      if (rows.length) {
        var userData = rows[0];
        res.status(200).json(userData);
      }  
    })
  }else {
    res.sendStatus(400);
  }
});

app.post('/updateUser', verifyToken, function(req, res){
  let userDetails = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
    state: req.body.state,
    pincode: req.body.pincode
  }
  var sql = 'UPDATE users set name=?, email=?, phone=?, address=?, state=?, pincode=? WHERE users.email=?';
  connection.query(sql ,[
    userDetails.name, userDetails.email, userDetails.phone, userDetails.address, userDetails.state, userDetails.pincode, req.user.userDetails.email
  ], function (error, results, fields) {
    if (error) throw error;      
      const token = jwt.sign({ userDetails }, accessTokenSecret)
        res.status(200).json({               
          message:"user data updated sucessfully",
          token: token,
          email: userDetails.email,
          name: userDetails.name,          
        })               
  });
});

app.post('/logContactInfo', function(req, res){
  var sql = 'INSERT INTO usercontacts SET name=?, email=?, phone=?, message=?';
  connection.query(sql, [
    req.body.name, req.body.email, req.body.phone, req.body.message
  ], function(error, results, fields) {
    if(error) throw error;
    res.status(200).json({
      status: 'success',
      message: 'Details Submitted Successfully'
    })
  })
})

// MIDDLEWARE
function verifyToken (req, res, next) {
  const bearerHeader = req.headers['authorization']

  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ')
    const bearerToken = bearer[1]
    jwt.verify(bearerToken, accessTokenSecret, (err, user) => {
      if (err) {
          return res.sendStatus(403);
      }
      req.user = user;      
      next();
  });
  } else {
    res.sendStatus(401)
  }
}

app.listen(3000, () => {
  console.log('Server started on port 3000')
})
