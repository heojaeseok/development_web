/**
 * Created by ONLYHJS on 2015-07-25.
 */

/**
 * 테스트 용
 * @returns {string}
 */
exports.testFunction = function () {
    return 'testFunction';
};


/**
 * 메서드 체크후 문자열 리턴
 * @param method
 * @returns {string}
 */
exports.methodCheck = function (method) {
    return method === 'GET' ? 'query' : 'body';
};

/**
 * 대문자를 소문자로 변경
 * @param str
 * @returns {string}
 */
exports.strToLowerCase = function (str) {
    return str.toLowerCase();
};