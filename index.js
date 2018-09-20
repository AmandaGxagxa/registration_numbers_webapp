const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const Registrations = require('./registration_number');
// const routs = require('./routes/greetings');
const app = express();
 app.use(express.static('public'));

const session = require('express-session');
const flash = require('express-flash');

const registrations = Registrations();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

  app.use(bodyParser.urlencoded({ extended: false }));
// it corvert data to be  usable
app.use(bodyParser.json());
app.get("/", function(req, res){
  
  res.render('home', {regNums:registrations.getMapArray()});
});
app.post('/registration', function(req, res){

  
});
let PORT = process.env.PORT || 3008;

app.listen(PORT, function(){
  console.log('App starting on port', PORT);
});