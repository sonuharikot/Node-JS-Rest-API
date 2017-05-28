var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var secret = Config.get('App.secret');
var tokenExpiresTime = Config.get('App.tokenExpiresTime');
var authUser={};
module.exports = {
    isLogin: function (req, res, next) {
        var token = req.headers['x-access-token'];
        if (token) {
            // verifies secret and checks exp
            jwt.verify(token,secret, function (err, decoded) {
                if (err) {
                    return res.status(403).send('Failed to authenticate token.');
                } else { 
                    Auth.setUser(decoded);    
                    // if everything is good, save to request for use in other routes
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            return res.status(403).send('No token provided.');
        }
    },
    isValidUser: function (password, existPassword) {
        return bcrypt.compareSync(password, existPassword)
    },
    setUser: function(user){
       authUser=user; 
    },
    getUser: function(key=null){
        if(key==null){
         return authUser;    
        }else{   
         return (_.isUndefined(authUser[key]))?'':authUser[key];    
        }        
    },
    password: function (password) {
        var salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(password, salt)
    },
    createToken: function (user) {
        var token = jwt.sign(user, secret, {
            expiresIn: tokenExpiresTime // expires in 24 hours
        });
        return token;
    }
};
