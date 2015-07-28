/**
 * Created by ONLYHJS on 2015-07-17.
 */

var async = require('async');

exports.post = function (data, callback) {
    var params = data.params;
    var libs = data.libs;

    async.waterfall([
        function aa(next) {
            var ScheduleTestData = new ScheduleTestModel();
            //ScheduleTestData.start_date = 'start';
            ScheduleTestData.start_date = _s;
            ScheduleTestData.end_date = 'end';
            ScheduleTestData.msg = 'a';
            ScheduleTestData.flag = false;
            ScheduleTestData.save(function (err)
            {
                if(err) {
                    callback(err, null, null);
                    return;
                }

                var aaaa = params.aaaa;

                var testJson = {};
                testJson.name = 'hjs post';
                testJson.age = Math.random();
                testJson.aaaa = aaaa;

                next(null, testJson);
            });
        }
    ], function final(err, result) {
        callback(err, result, null);
    });
};


var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var zeus_user_data_options = {
    user : 'root',
    pass : '12311231',
    server : { auto_reconnect : true }
};

var create_zeus_user_data = mongoose.createConnection(
    'mongodb://192.168.0.22:27017/zeus_user_data', zeus_user_data_options
);

var ScheduleTestSchema = new Schema({
    id : ObjectId,
    start_date: { type: String, enum: ['aa']},
    end_date: String,
    msg: String,
    flag: Boolean
}, { versionKey: false });

var ScheduleTestCollection = 'schedule_test';
var ScheduleTestModel = create_zeus_user_data.model(ScheduleTestCollection, ScheduleTestSchema);