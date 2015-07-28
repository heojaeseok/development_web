/**
 * Created by ONLYHJS on 2015-07-17.
 */

var path = require('path');
var async = require('async');

exports.get = function (data, callback) {
    async.waterfall([
        function first(next) {
            var content = {};
            content.title1 = 'Login';

            next(null, content);
        }
    ], function final(err, result) {
        callback(err, result, null);
    });
};