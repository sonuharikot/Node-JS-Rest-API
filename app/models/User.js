module.exports = function (sequelize, Sequelize) {
    var User = sequelize.define('users', {
        role_id: {
            type: Sequelize.INTEGER(3),
            allowNull: false,
            defaultValue: '2'
        },
        token: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        device_id: {
            type: Sequelize.STRING,
            allowNull: true
        },
        signup_type: {
            type: Sequelize.ENUM('site', 'facebook', 'mobile'),
            allowNull: false,
            defaultValue: 'mobile'
        },
        first_name: {
            type: Sequelize.STRING,
            //allowNull: false,
            validate: {
                notEmpty: {
                    notEmpty: true,
                    msg: "Please enter first name."
                }
            }
        },
        last_name: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    notEmpty: true,
                    msg: "Please enter last name."
                }
            }
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: ''
        },
        city: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    notEmpty: true,
                    msg: "Please enter city."
                }
            }
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: '',
            unique: true,
            validate: {
                isEmail: {
                    isEmail: true,
                    msg: "Please enter valid email."
                },
                isUnique: function (value, next) {
                    var self = this;
                    User.find({where: {email: value}})
                            .then(function (user) {
                                // reject if a different user wants to use the same email
                                if (user && self.id !== user.id) {
                                    return next('Email already in use!');
                                }
                                return next();
                            })
                            .catch(function (err) {
                                return next(err);
                            });
                }
            }
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    notEmpty: true,
                    msg: "Please enter password."
                }
            }
        },
        created: {
            type: Sequelize.DATE,
            allowNull: true
        },
        updated: {
            type: Sequelize.DATE,
            allowNull: true
        }
    }, {
        timestamps: true,
        createdAt: 'created',
        updatedAt: 'updated',
        tableName: 'users',
        hooks: {
            beforeCreate: (user, options) => {
                user.password=Auth.password(user.password);                
                user.name = user.first_name + ' ' + user.last_name;
            }
        }
    });
    return User;
};
