const sendEmail = require('../utils/email')

exports.sendEmail = async (req, res, next) => {
    try {
        await sendEmail({
            name: req.body.name,
            email: req.body.email,
            message: req.body.message
        })
        res.status(200).json({
            status: 'success',
            message: "Message Sent!"
        })
    } catch (error) {
        return next(
            res.status(404).json({
                status: 'fail',
                message: error
            })
        )
    }
    next()
}