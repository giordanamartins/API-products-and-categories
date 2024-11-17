const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
    res.send = ('OK')
});

require('./controllers/authController')(app);
require('./controllers/categoryController')(app);
require('./controllers/productController')(app);
require('./controllers/generalController')(app);

app.listen(3000);

