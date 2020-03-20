const express = require('express');

const app = express();

const bodyParser = require('body-parser');

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const db = require('./config/keys').MongoURI;

app.use(bodyParser.urlencoded());

app.use(bodyParser.json());

mongoose.connect(db,{ useNewUrlParser:true})
.then(()=>console.log('Mongodb connected'))
.catch(err =>console.log(err));

require('./models/Employee');


app.set('views', './views');
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
var employees = require('./routes/Employee');

app.use('/employees', employees);

// app.use('/users',require('./routes/Employee'));

var port = 5000 || process.env.PORT;
app.listen(port , console.log(`server started on ${port}`));