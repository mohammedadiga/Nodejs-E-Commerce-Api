const express = require('express');
const dbConnect = require('./config/dbConnect');
const bodyParser = require('body-parser');
const app = express();
const dotenv = require('dotenv').config();
const cookieParser = require('cookie-parser');

// My Hokies
const {notFound, errorHandler} = require('./middleware/errorHandler');


// Host Port
const PORT = process.env.PORT || 4000;

// Routes
const authRouter = require('./routes/authRoute');

// mongo database connection
dbConnect();

// API body request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Cookie Parser
app.use(cookieParser());

// App routes
app.use('/api/user', authRouter);

// App Error Handler
app.use(notFound);
app.use(errorHandler);

// App statar
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})