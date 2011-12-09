// http://tokuhirom.mit-license.org
(function () {
"use strict";

var global = this;

var VisualWidth;
if (typeof exports !== 'undefined') {
    VisualWidth = exports;
} else {
    global.VisualWidth = VisualWidth = {};
}
VisualWidth.truncate = truncate;
VisualWidth.width = width;

function width(string) {
    var counter=0,
        chars = string.split(''),
        i, l;

    for (i=0, l=chars.length; i<l; i++) {
        var c = chars[i].charAt(0);
        if (0xD800 <= c && c <= 0xD8FF) { // surrogate pair
            // only [\u20000-\u2A6D6\u2A6D7-\u2F7FF\u2F800-\u2FA1D\u2FA1E-\u2FFFD\u30000-\u3FFFD] is full width.
            // but i think japanese chars in surrogate pair is always full width.
            counter += 2;
            i++;
        } else {
            // normal chars
            // Note: I made ambiguous character is 'full-width'. since I'm Japanese.
            counter += chars[i].match(/[\u3000\uFF01-\uFF60\uFFE0-\uFFE6\u1100-\u115F\u2329-\u232A\u2E80-\u2FFB\u3001-\u303E\u3041-\u33FF\u3400-\u4DB5\u4E00-\u9FBB\uA000-\uA4C6\uAC00-\uD7A3\uF900-\uFAD9\uFE10-\uFE19\uFE30-\uFE6B\u00A1\u00A4\u00A7-\u00A8\u00AA\u00AD-\u00AE\u00B0-\u00B4\u00B6-\u00BA\u00BC-\u00BF\u00C6\u00D0\u00D7-\u00D8\u00DE-\u00E1\u00E6\u00E8-\u00EA\u00EC-\u00ED\u00F0\u00F2-\u00F3\u00F7-\u00FA\u00FC\u00FE\u0101\u0111\u0113\u011B\u0126-\u0127\u012B\u0131-\u0133\u0138\u013F-\u0142\u0144\u0148-\u014B\u014D\u0152-\u0153\u0166-\u0167\u016B\u01CE\u01D0\u01D2\u01D4\u01D6\u01D8\u01DA\u01DC\u0251\u0261\u02C4\u02C7\u02C9-\u02CB\u02CD\u02D0\u02D8-\u02DB\u02DD\u02DF\u0300-\u036F\u0391-\u03A9\u03B1-\u03C1\u03C3-\u03C9\u0401\u0410-\u044F\u0451\u2010\u2013-\u2016\u2018-\u2019\u201C-\u201D\u2020-\u2022\u2024-\u2027\u2030\u2032-\u2033\u2035\u203B\u203E\u2074\u207F\u2081-\u2084\u20AC\u2103\u2105\u2109\u2113\u2116\u2121-\u2122\u2126\u212B\u2153-\u2154\u215B-\u215E\u2160-\u216B\u2170-\u2179\u2190-\u2199\u21B8-\u21B9\u21D2\u21D4\u21E7\u2200\u2202-\u2203\u2207-\u2208\u220B\u220F\u2211\u2215\u221A\u221D-\u2220\u2223\u2225\u2227-\u222C\u222E\u2234-\u2237\u223C-\u223D\u2248\u224C\u2252\u2260-\u2261\u2264-\u2267\u226A-\u226B\u226E-\u226F\u2282-\u2283\u2286-\u2287\u2295\u2299\u22A5\u22BF\u2312\u2460-\u24E9\u24EB-\u254B\u2550-\u2573\u2580-\u258F\u2592-\u2595\u25A0-\u25A1\u25A3-\u25A9\u25B2-\u25B3\u25B6-\u25B7\u25BC-\u25BD\u25C0-\u25C1\u25C6-\u25C8\u25CB\u25CE-\u25D1\u25E2-\u25E5\u25EF\u2605-\u2606\u2609\u260E-\u260F\u2614-\u2615\u261C\u261E\u2640\u2642\u2660-\u2661\u2663-\u2665\u2667-\u266A\u266C-\u266D\u266F\u273D\u2776-\u277F\uE000-\uF8FF\uFE00-\uFE0F\uFFFD]/) ? 2 : 1;
        }
    }
    return counter;
}

function truncate(string, length, suffix) {
    var ret = '',
        c, clen,
        counter=0,
        chars = string.split(''),
        i, l,
        slen = width(suffix);

    if (width(string) <= length) {
        return string;
    }

    for (i=0, l=chars.length; i<l && counter < length; i++) {
        c = chars[i];
        clen = width(c);
        if (counter + clen + slen > length) {
            return ret + suffix;
        }
        ret += c;
        counter += clen;
    }
    return ret; // maybe fatal
}

}).call(this);
