if (process.env.USER) require("dotenv").config();
const express = require("express");
const cors = require('cors');
const errorHandler = require('../errors/errorHandler');

const app = express();

const moviesRouter = require("./routes/movies.router");
const reviewsRouter = require('./routes/reviews.router');
const theatersRouter = require('./routes/theaters.router');

app.use(express.json());
app.use(cors());

app.use("/movies", moviesRouter);
app.use('/reviews', reviewsRouter);
app.use('/theaters', theatersRouter);

// app.use(notFound);
app.use(errorHandler); 

module.exports = app;