var User = Models.User;
module.exports = {
    login: function (req, res, next) {
        User.findOne({where: {email: req.fields.email, status: 1}}).then(function (user) {
            if (user) {
                if (Auth.isValidUser(req.fields.password, user.password)) {
                    User.update({device_id: req.fields.device_id}, {where: {id: user.id}});
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
        //console.log(req.files);
        User.build(req.fields).save({skip: ['token'],validate: true}).then(function (data) {
            var user = {};
            user.id = data.id;
            user.name = data.name;
            user.email = data.email;
            user.city = data.city;
            user.token = Auth.createToken(user);
            var newPath='./tmp/img/'+Date.now()+'.png'
            Func.moveFile(req.files['image']['path'],newPath).then(data=>{
              User.update({token: user.token}, {where: {id: data.id}});
              res.json({data: user, message: 'Registration successfully completed.'});  
            }).catch(function(err){
                 res.status(400).send(err);
            });            
        }).catch(function (err) {
            res.status(400).send(err.errors);
        });
    },
    detail: function(req, res, next){
        async function action() {
            const user = await User.findById(req.params.id)
            res.json(user)
        }
        action().catch(next)
    }
    
};
