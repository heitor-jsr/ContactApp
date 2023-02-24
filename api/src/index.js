const express = require('express');
require('express-async-errors');
const app = express();

const routes = require('./routes');
app.use(express.json());

const cors = require('./app/middlewares/cors')
const error = require('./app/middlewares/errorHandler')

app.use(cors);

app.use(routes);
app.use(error);
app.listen(3001, () => console.log('Server started at http://localhost:3001'));


// container docker name: pg