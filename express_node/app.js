const express = require('express')
const app = express();

const hbs = require('express-handlebars');
const path = require('path');

//Static folder
app.use(express.static(path.join(__dirname, 'public')));


// setup view engine
app.set('view engine', 'hbs');
app.engine('hbs', hbs.engine({
    extname: 'hbs',
    defaultView: 'default',
    layoutsDir: path.join(__dirname, 'views'),
    partialsDir: path.join(__dirname, 'views/partials')
}))



//ROUTES
app.use('/', require('./routes/index'));


// app.get("/", (req, res) => {
//     res.send("Hello World");
// });




app.listen(3000, () => {
    console.log('Server started on port 3000');
});