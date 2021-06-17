const User = require('../model/auth/user')

exports.getUsers = async (req, res, next) => {
	const users = await User.find()
	return res.status(200).json({
		users
	})
}
