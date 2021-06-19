const User = require('../model/auth/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = process.env.SECRETKEY;

/** New User Registration Controller */
exports.registerUser = async (req, res, next) => {
	const { username, password } = req.body;
	try {
		let user = await User.findOne({ username });
		if (user) {
			res.status(400).json({
				msg: "User already exists.",
			});
			return
		}
		user = new User({
			username,
			password,
		});

		// Encrypting Password
		const salt = await bcrypt.genSalt(10);
		user.password = await bcrypt.hash(password, salt);

		await user.save();

		res.json({
			msg: "New user is successfully registered."
		});
	} catch (error) {
		console.log(error.message);
		res.status(500).send("Error in Saving");
	}
};

/** User Login Controller */
exports.loginUsers = async (req, res, next) => {
	const { username, password } = req.body;
	// Find if the email is in the DB
	try {
		const user = await User.findOne({ username });
		if (!user) {
			return res.status(400).json({
				success: false,
				msg: "Email or Password is not correct"
			});
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(400).json({
				success: false,
				msg: "Email or Password is not correct."
			});
		}

		const payload = {
			user: {
				_id: user._id,
			}
		};

		jwt.sign(
			payload,
			secret,
			{
				expiresIn: 3600,
			}, (err, token) => {
				if (err) throw err;
				res.status(200).json({
					success: true,
					message: "Successfully logged in",
					token: `Bearer ${ token }`,
					user,
				});
			}
		);
	} catch (error) {
		console.log(error.message);
		res.status(500).send("Error in Saving");
	}
};

// Logged In User Page
exports.loggedInUser = (req, res, next) => {
	return res.json({
		msg: "User is Logged in"
	});
};
