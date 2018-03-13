const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public')); //format to use a middleware. __dirname return the current directory path from the hard drive

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFileSync('server.log', log + '\n', (err) => {
    if(err){
      console.log('Unable to append to server.log.');
    }
  });
  next();

});

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) =>{
  res.render('home.hbs', {
    title: 'Home Page',
    pageTitle: 'Welcome Home!',
    welcomeMess: 'I like U'
  })
} );

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Pageee',
  })
})

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to think'
  });
})
app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
