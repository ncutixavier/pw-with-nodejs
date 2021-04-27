const { promisify } = require('util')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const signToken = id => {
    return jwt.sign(
        { id },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN
        }
    )
}

exports.signup = async (req, res) => {
    try {
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            passwordConfirm: req.body.passwordConfirm,
            role: req.body.role
        })

        const token = signToken(newUser._id)

        res.status(201).json({
            status: 'success',
            // token,
            data: { newUser }
        })
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error._message
        })
    }
}

exports.login = async (req, res, next) => {
    const { email, password } = req.body

    //Check if email and password exist
    if (!email || !password) {
        return next(
            res.status(400).json({
                status: 'failed',
                message: 'Please provide a valid email and password'
            })
        )
    }

    //Check is user exist && Password is correct
    const user = await User.findOne({ email: email }).select('+password')

    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(
            res.status(401).json({
                status: 'failed',
                message: 'Incorrect email or password'
            })
        )
    }
    //If everything ok, send token to the client
    const token = signToken(user._id)

    res.status(200).json({
        status: 'success',
        token,
        user
    })
}


exports.protect = async (req, res, next) => {
    // 1. Getting Token and check if it exists
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]
    }
    // console.log(token)
    if (!token) {
        return next(
            res.status(401).json({
                status: 'failed',
                message: 'Please you may log in to get access'
            })
        )

    }
    // 2. Verifying Token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)

    // 3. Check if user still exists
    const freshUser = await User.findById(decoded.id)

    try {
        if (!freshUser) {
            return next(
                res.status(401).json({
                    status: 'failed',
                    message: "The user belong to this token is no longer exist"
                })
            )
        }


    } catch (error) {
        let message
        if (error.name == "JsonWebTokenError") {
            message = "Invalid Token, Please log in again!"
        } else if (error.name == "TokenExpiredError") {
            message = "Your token has expired, Please log in again!"
        } else {
            message = error
        }
        return next(
            res.status(401).json({
                status: 'failed',
                message
            })
        )
    }
    req.user = freshUser
    next()
}

exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                res.status(403).json({
                    status: 'failed',
                    message: "You do not have permission to perform this action"
                })
            )
        }
        next()
    }
}