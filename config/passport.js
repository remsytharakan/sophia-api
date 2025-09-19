const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const SuperAdminModel = require('../models/superAdmin');

require('dotenv').config();
module.exports = function (passport) {
    let token = ExtractJwt.fromAuthHeaderAsBearerToken();
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = process.env.SECRET;
    opts.passReqToCallback = true;
    passport.use(new JwtStrategy(opts, (req, jwtpayload, done) => {
        User.findOne({ phoneNumber: jwtpayload.phoneNumber }, (err, user) => {
            if (err) {
                return done(err, false);
            }
            if (user) {
                // Checking two device login
                let isMatched = false;
                let tokenRecieved = req.header('authorization').split(' ')[1];
                console.log('token 1: ', user.jwtToken1);
                console.log('token 2: ', user.jwtToken2);
                console.log('tokenRecieved ', tokenRecieved);
                if (user.jwtToken1 == tokenRecieved) isMatched = true;
                else if (user.jwtToken2 == tokenRecieved) isMatched = true;
                if (isMatched) return done(null, user);
                else return done(err, false);
            } else {
                SuperAdminModel.findOne({ phoneNumber: jwtpayload.phoneNumber }, (err, user) => {
                    if (err) {
                        return done(err, false);
                    }
                    if (user) {

                        return done(null, user);
                    }
                    else {
                        return done(null, false);
                    }

                });
            }
        });
    }));
    
};
