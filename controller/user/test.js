/**
 * Created by ONLYHJS on 2015-07-27.
 */

var path = require('path');

exports.post = function (data, callback) {
    var params = data.params;
    var libs = data.libs;

    var testJson = {};
    testJson.name = 'hjs post123123';
    testJson.age = Math.random();

    callback(null, testJson, null);
};


exports.get = function (params, libs, callback) {
    var testJson = {};
    testJson.title = 'test get ';
    testJson.age = Math.random();

    callback(null, testJson, null);
};
