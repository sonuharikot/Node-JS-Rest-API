var User = Models.User;
module.exports = {
    login: function (req, res, next) {
        User.findOne({where: {email: req.body.email, status: 1}}).then(function (user) {
            if (user) {
                if (Auth.isValidUser(req.body.password, user.password)) {
                    User.update({device_id: req.body.device_id}, {where: {id: user.id}});
                    var login = {};
                    login.id = user.id;
                    login.name = user.name;
                    login.email = user.email;
                    login.city = user.city;
                    login.token = Auth.createToken(login);
                    res.json(login)
                } else {
                    res.status(401).send({error: 'Email or password incorrect.'});
                }
            } else {
                res.status(401).send({error: 'Email or password incorrect.'});
            }
        });
    },
    register: function (req, res, next) {       
        User.build(req.body).validate().then(function (err) {
            if (err == null) {                
                User.create(req.body).then(function (data) {
                    var user = {};
                    user.id = data.id;
                    user.name = data.name;
                    user.email = data.email;
                    user.city = data.city;
                    user.token=Auth.createToken(user);                   
                    User.update({token: user.token},{ where:{id: data.id}});
                    res.json({data: user, message: 'Registration successfully completed.'});
                }).catch(function (err) {
                    res.status(400).send(err.errors);
                });
            } else {
                   res.status(400).send(err.errors);
            }
        })
    }
};
