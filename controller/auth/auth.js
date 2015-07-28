/**
 * Created by ONLYHJS on 2015-07-17.
 */

var path = require('path');
var async = require('async');

exports.post = function (data, callback) {
    async.waterfall([
        function first(next) {

            next(null);
        }
    ], function final(err) {
        // <i> redirect 홈페이지 전용입니다. callback(null, null, redirect)
        callback(err, null, 'user/index');
    });
};