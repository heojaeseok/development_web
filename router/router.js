/**
 * Created by ONLYHJS on 2015-07-17.
 */

var util = require('util');
var path = require('path');

var load, objError;

module.exports = function(app) {
    load = app.get('requireResult');

    app.all('/', handler);
    app.all('/:restfulPath', handler);
    app.all('/:restfulPath/:restfulApi', handler);
};

/**
 * 메인 역확을 한다.
 * @param req
 * @param res
 */
var handler = function(req, res) {
    var restfulPath = req.params.restfulPath ? req.params.restfulPath : '';
    var restfulApi = req.params.restfulApi ? req.params.restfulApi.replace('.html','') : 'index';
    var controllerPath = path.join('../controller', restfulPath, restfulApi);
    var controller, objNextData;

    var params = req[load.libs.methodCheck(req.method)];
    var method = load.libs.strToLowerCase(req.method);

    try {
        objNextData = {
            params: params,
            restfulPath: restfulPath,
            restfulApi: restfulApi,
            libs: load.libs,
            defines: load.defines,
            errorCodes: load.errorCodes
        };

        controller = require(controllerPath);
        controller[method](objNextData, function (err, result, redirect) {
            if (err) {
                errorHandler(err, res, restfulPath, restfulApi);
            }

            if(req.method === 'GET' || typeof redirect === 'string') {
                if(redirect == null) {
                    res.render(goToUrl(load.defines.RENDER, restfulPath, restfulApi), result);
                } else {
                    res.redirect(goToUrl(load.defines.REDIRECT, null, redirect));
                }
            } else {
                res.json(result);
            }
        });
    } catch (e) {
        errorHandler(e, res, restfulPath, restfulApi);
    }
};


/**
 * URL을 만든다...
 * @param type
 * @param path
 * @param api
 * @returns {*}
 */
function goToUrl(type, path, api) {
    var strResult;
    switch (type) {
        case load.defines.RENDER:
            strResult = path + '/' + api;
            break;
        case load.defines.REDIRECT:
            strResult = '/' + api;
            break;
        default :
            break;
    }

    return strResult;
}



/**
 * 에러는 모두 json 형태로 보여준다.
 * @param err
 * @param res
 * @param restfulPath
 * @param restfulApi
 */
// todo 어느파일의 몇번째 줄에서 에러가 났는지 알 수 있도록 해야한다.
function errorHandler(err, res, restfulPath, restfulApi) {
    objError = {
        errorCode: 1,
        errorStatus: 404,
        errorPath: util.format('path error = /controller/%s/%s', restfulPath, restfulApi),
        errorMessage: err.toString(),
        errorDetailMessage: err
    };

    res.json(objError);
}


// todo test
global.todoItems = [
    {id:1, desc:11},
    {id:2, desc:22}
];