// http://tokuhirom.mit-license.org
(function () {
"use strict";

var global = this;

var JUtil;
if (typeof exports !== 'undefined') {
    JUtil = exports;
} else {
    global.JUtil = JUtil = {};
}
JUtil.jlength = jlength;
JUtil.jtruncate = jtruncate;

function jlength(string) {
    var counter=0,
        chars = string.split(''),
        i, l;

    for (i=0, l=chars.length; i<l; i++) {
        counter += chars[i].match(/[\u3000\uFF01-\uFF60\uFFE0-\uFFE6\u1100-\u115F\u2329-\u232A\u2E80-\u2FFB\u3001-\u303E\u3041-\u33FF\u3400-\u4DB5\u4E00-\u9FBB\uA000-\uA4C6\uAC00-\uD7A3\uF900-\uFAD9\uFE10-\uFE19\uFE30-\uFE6B\u20000-\u2A6D6\u2A6D7-\u2F7FF\u2F800-\u2FA1D\u2FA1E-\u2FFFD\u30000-\u3FFFD]/) ? 2 : 1;
    }
    return counter;
}

function jtruncate(string, length, suffix) {
    var ret = '',
        c, clen,
        counter=0,
        chars = string.split(''),
        i, l,
        slen = jlength(suffix);

    if (jlength(string) <= length) {
        return string;
    }

    for (i=0, l=chars.length; i<l && counter < length; i++) {
        c = chars[i];
        clen = jlength(c);
        if (counter + clen + slen > length) {
            return ret + suffix;
        }
        ret += c;
        counter += clen;
    }
    return ret; // maybe fatal
}

}).call(this);
