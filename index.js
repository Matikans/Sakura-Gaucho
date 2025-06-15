const express = require('express');
const path = require('path');
const fs = require('fs');
const app =  express();
const PORT = 3000;
const session = require('express-session');
require('dotenv').config();

sessionSecret = process.env.SESSION_SECRET

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: true,
}));


app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) =>{
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use('/reserve', require('./routes/reserve'));
app.use('/login', require('./routes/login'));
app.use('/admin', require('./routes/admin'));
app.use('/logout', require('./routes/logout'));

app.listen(PORT, () => {
  console.log(`server te quiere en on http://localhost:${PORT}`);
});