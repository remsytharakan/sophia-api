const roles = require('../config/roles.js')

exports.grantAccess = function (action, resource) {
    return async (req, res, next) => {
        console.log("user",req.user);
        try {
            console.log("Grant access: ", req.user.role);
            const permission = roles.can(req.user.role)[action](resource);
            if (!permission.granted) {
                return res.status(401).json({
                    error: "You don't have enough permission to perform this action"
                });
            }
            next()
        } catch (error) {
            next(error)
        }
    }
}