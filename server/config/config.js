/**
 * Created by asafamir Vardi LTD. on 29/05/2017.
 */
var _ = require('lodash');//
var configValues = {"uname":"ariel","pwd":"123456"};
var config = {
    dev : 'development',
    test:'testing',
    prod:'production',
    port :process.env.PORT || 3200,
    //ten days in minutes
    expireTime : 24*60*10,
    getDbConnectionString : function () {
        return 'mongodb://' + configValues.uname + ":" +
            configValues.pwd + '@ds135956.mlab.com:35956/ex4';
    },
    secrets:{
        jwt : process.env.JWT || 'gumball'
    }

};

process.env.NODE_ENV = process.env.NODE_ENV || config.dev;
config.env = process.env.NODE_ENV;

var envConfig;

try {
    envConfig = require('./' + config.env);
    envConfig = envConfig || {};
}catch (e){

    envConfig = {}
}

module.exports = _.merge(config, envConfig);