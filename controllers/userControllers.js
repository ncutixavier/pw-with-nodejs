const User = require('./../models/userModel')

exports.getAllUsers = async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json({
        status: "Success",
        Results: users.length,
        data: { users }
      })
    } catch (error) {
      res.status(404).json({
        status: 'fail',
        message: error
      })
      console.log(error)
    }
  }