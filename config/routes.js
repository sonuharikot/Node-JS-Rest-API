var Users = require('../app/controllers/users');

module.exports = function (app) {
    //=====Users Routes======//
    app.post('/login',Users.login)
    app.post('/register',Users.register)
    
}
