const express = require('express');
const dbConnect = require('./config/dbConnect');
const bodyParser = require('body-parser');
const app = express();
const dotenv = require('dotenv').config();
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

// My Hokies
const {notFound, errorHandler} = require('./middleware/errorHandler');


// Host Port
const PORT = process.env.PORT || 4000;

// Routes
const authRoute = require('./routes/authRoute');
const productRoute = require('./routes/productRoute');

// mongo database connection
dbConnect();

// API body request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Cookie Parser
app.use(cookieParser());

// Morgan API
app.use(morgan("dev"));

// App routes
app.use('/api/user', authRoute);
app.use('/api/product', productRoute);

// App Error Handler
app.use(notFound);
app.use(errorHandler);

// App statar
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})