const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const Registrations = require('./routes/regRoutes');
const regservice = require('./services/regServices')
const postgres = require('pg')
const Pool = postgres.Pool
// const routs = require('./routes/greetings');
const app = express();
 app.use(express.static('public'));

const session = require('express-session');
const flash = require('express-flash');
let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
    useSSL = true;
}
// which db connection to use
const connectionString = process.env.DATABASE_URL || 'postgresql://coder:coder123@localhost:5432/my_registrations';

const pool = new Pool({
    connectionString,
    ssl: useSSL
});

const reg = regservice(pool)
const registrations = Registrations(reg);

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

  app.use(bodyParser.urlencoded({ extended: false }));
// it corvert data to be  usable
app.use(bodyParser.json());
app.use(session({
  secret : "<add a secret string here>",
  resave: false,
  saveUninitialized: true
}));
app.use(flash())
// initialise the flash middleware

app.get("/",registrations.toHomePage);
app.post('/registration',registrations.insertFunc);
app.get('/:filtered', registrations.filter)
  

let PORT = process.env.PORT || 3008;

app.listen(PORT, function(){
  console.log('App starting on port', PORT);
});