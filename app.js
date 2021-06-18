require('dotenv').config()

const express = require('express')

const app = express()

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const cors = require('cors');

const passport = require('passport');

const PORT = process.env.PORT || 4000

/** Middlewares */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(passport.initialize());


/** Routes */
const registerRoute = require('./route/api/register')
const loginRoute = require('./route/api/login')
const getUsersRoute = require('./route/api/users')

app.use(registerRoute)
app.use(loginRoute)
app.use(getUsersRoute)

mongoose.connect(
	process.env.DB,
	{ useNewUrlParser: true , useUnifiedTopology: true },
	() => console.log('Connected to DB')
)

app.listen(PORT, () => {
	console.log('Server running on port ' + PORT)
})
