var Sequelize = require('sequelize');
var dbConfig = Config.get('Database');
// initialize database connection
var sequelize = new Sequelize(
        dbConfig.name,
        dbConfig.user,
        dbConfig.password,
        {
            dialect: dbConfig.driver,
            logging: console.log,
            define: {
                timestamps: false
            }
        }
        );
//Checking connection status
sequelize.authenticate().then(function () {
    console.log('Connection has been established successfully');
})
        .catch(function (err) {
            console.log(err);
        })
        .done();
// load models
var models = [
    'User'
];
models.forEach(function (model) {
    module.exports[model] = sequelize.import(__dirname + '/' + model);
});

// describe relationships
(function (m) {
//    m.PhoneNumber.belongsTo(m.User);
//    m.Task.belongsTo(m.User);
//    m.User.hasMany(m.Task);
//    m.User.hasMany(m.PhoneNumber);
})(module.exports);

// export connection
module.exports.sequelize = sequelize;

