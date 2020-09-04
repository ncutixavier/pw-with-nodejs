const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')


const userSchema = new mongoose.Schema({

    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },

    name: {
        type: String,
        required: [true, 'Please tell us your name']
    },

    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },

    photo: String,

    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8,
        select: false
    },

    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password'],
        //This only work on CREATE and SAVE
        validate: {
            validator: function (el) {
                return el === this.password
            },
            message: "Passwords do not match"
        }
    }
})

userSchema.pre('save', async function (next) {
    //only run if password is modified
    if (!this.isModified('password')) return next()

    //Hash the password
    this.password = await bcrypt.hash(this.password, 12)

    //Delete PasswordConfirm field
    this.passwordConfirm = undefined;

    next()
})

userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword)
}

const User = mongoose.model('User', userSchema)

module.exports = User