const port = 7777;
const express = require('express');
const app = express();
app.use(express.json());


const bodyParser = require('body-parser');
const path = require("path");
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'style')));

var cookieParser = require('cookie-parser');
app.use(cookieParser());
global.jwt = require('jsonwebtoken');

let db_M = require('./database');
global.db_pool = db_M.pool;

app.set("view engine", "ejs");
app.set('views', path.join(__dirname, "./views"));

global.addSlashes    = require('slashes').addSlashes;
global.stripSlashes  = require('slashes').stripSlashes;


const user_Mid = require("./middleware/user_Mid");

const usr_R = require('./routers/users_R');
app.use('/U',[user_Mid.isLogged],usr_R);
const task_R = require('./routers/task_R');
app.use('/A',[user_Mid.isLogged],task_R);
const cat_R = require('./routers/cat_R');
app.use('/cat',[user_Mid.isLogged],cat_R);
const auth_R = require('./routers/auth_R');
app.use('/',auth_R);




app.get('/', (req, res) => {
    res.render("index", {});
})

app.listen(port, () => {
    console.log(`Now listening on port http://localhost:${port}`);
});