var test =require('tape');
var vw = require('../');

test('vw.width', function (t) {
    t.equals(vw.width('あいうえお'), 10);
    t.equals(vw.width('...'), 3);
    t.equals(vw.width('Shinjuku'), 8);
    t.equals(vw.width('…'), 2);
    t.equals(vw.width("\u2026"), 2); // ambiguous char should be full width
    t.end();
});

test('vw short for vw.width', function (t) {
    t.equals(vw('あいうえお'), 10);
    t.end();
})

test('vw.width/surrogate pair', function (t) {
    t.equals(vw.width(String.fromCharCode(0xD800, 0xDC00)), 1); // U+10000 LINEAR B SYLLABLE B008 A (first non-BMP code point)    ( half width )
    t.equals(vw.width(String.fromCharCode(0xD840, 0xDC0B)), 2);
    t.equals(vw.width(String.fromCharCode(0xD869, 0xDEB2)), 2);
    t.equals(vw.width(String.fromCharCode(0xD840, 0xDC0B) + String.fromCharCode(0xD869, 0xDEB2)), 4);
    t.end();
});

test('truncate', function (t) {
    t.equals(vw.truncate('DOUTOR 新宿アイランド店', 15, '...'), 'DOUTOR 新宿...');
    t.equals(vw.truncate('無印良品 アキバ・トリム', 20, '...'), '無印良品 アキバ・...');
    t.equals(vw.truncate('VILLAGE VANGUARD 渋谷宇田川', 15, '...'), 'VILLAGE VANG...');
    t.equals(vw.truncate('VILLAGE VANGUARD 渋谷宇田川', 15, '...').length, 15);
    t.equals(vw.truncate('Shinjuku', 15, '…'), 'Shinjuku');
    t.equals(vw.truncate('あいうえお', 12, '...'), 'あいうえお');
    t.equals(vw.truncate('あいうえお', 11, '...'), 'あいうえお');
    t.equals(vw.truncate('あいうえお', 10, '...'), 'あいうえお');
    t.equals(vw.truncate('あいうえお', 9,  '...'), 'あいう...');
    t.equals(vw.truncate('あいうえお', 8,  '...'), 'あい...');
    t.equals(vw.truncate('あいうえお', 7,  '...'), 'あい...');
    t.equals(vw.truncate('あいうえお', 6,  '...'), 'あ...');
    t.equals(vw.truncate('あいうえお', 5,  '…'), 'あ…');
    t.end();
});

test('terminal characters', function (t) {
    t.equals(vw.width('\x1B[0mH', true), 1);
    t.equals(vw.width('\x1B[0mH'), 5);
    t.equals(vw.width('\x1B[31mH\x1B[0m', true), 1);
    t.equals(vw.width('\x1B[31mあ\x1B[0m', true), 2);
    t.equals(vw.width('\x1B[31mあ\x1B[0mB', true), 3);
    t.end();
});

test('indexOf characters', function (t) {
    t.equals(vw.indexOf('abcdeabcde', 'a'), 0);
    t.equals(vw.indexOf('abcdeabcde', 'b'), 1);
    t.equals(vw.indexOf('abcdeabcde', 'f'), -1);
    t.equals(vw.indexOf('abcdeabcde', 'a', 1), 5);
    t.equals(vw.indexOf('あいうabcえおあ', 'あ'), 0);
    t.equals(vw.indexOf('あいうabcえおあ', 'い'), 2);
    t.equals(vw.indexOf('あいうabcえおあ', 'か'), -1);
    t.equals(vw.indexOf('あいうabcえおあ', 'え'), 9);
    t.equals(vw.indexOf('あいうabcえおあ', 'あ', 1), 13);
    t.equals(vw.indexOf('あいうabcえおあ', 'あ', 2), 13);
    t.equals(vw.indexOf('あい\x1B[31mabcdうえ', 'b'), 10);
    t.equals(vw.indexOf('あい\x1B[31mabcdうえ', 'b', null, true), 5);
    t.end();
});

test('lastIndexOf characters', function (t) {
    t.equals(vw.lastIndexOf('abcdeabcde', 'a'), 5);
    t.equals(vw.lastIndexOf('abcdeabcde', 'b'), 6);
    t.equals(vw.lastIndexOf('abcdeabcde', 'f'), -1);
    t.equals(vw.lastIndexOf('abcdeabcde', 'a', 1), 0);
    t.equals(vw.lastIndexOf('あいうabcえおあいうabcえお', 'あ'), 13);
    t.equals(vw.lastIndexOf('あいうabcえおあいうabcえお', 'い'), 15);
    t.equals(vw.lastIndexOf('あいうabcえおあいうabcえお', 'か'), -1);
    t.equals(vw.lastIndexOf('あいうabcえおあいうabcえお', 'え'), 22);
    t.equals(vw.lastIndexOf('あいうabcえおあいうabcえお', 'あ', 10), 0);
    t.equals(vw.lastIndexOf('あいうabcえおあいうabcえお', 'a', 10), 6);
    t.equals(vw.lastIndexOf('あい\x1B[31mabcdうえ', 'b'), 10);
    t.equals(vw.lastIndexOf('あい\x1B[31mabcdうえ', 'b', null, true), 5);
    t.equals(vw.lastIndexOf('あい\x1B[31mabcdうえ', '\x1B', null, true), 4);
    t.end();
});

test('substring characters', function (t) {
    t.equals(vw.substring('abcdeabcde', 1, 2), 'abcdeabcde'.substring(1, 2));
    t.equals(vw.substring('abcdeabcde', 1), 'abcdeabcde'.substring(1));
    t.equals(vw.substring('abcdeabcde', 1, 1), 'abcdeabcde'.substring(1, 1));
    t.equals(vw.substring('abcdeabcde', 20), 'abcdeabcde'.substring(20));
    t.equals(vw.substring('abcdeabcde', 5, 1), 'abcdeabcde'.substring(5, 1));
    t.equals(vw.substring('あいうabcえおあいうabcえお', 1, 2), 'あ');
    t.equals(vw.substring('あいうabcえおあいうabcえお', 1, 3), 'あい');
    t.equals(vw.substring('あいうabcえおあいうabcえお', 2), 'いうabcえおあいうabcえお');
    t.equals(vw.substring('あいうabcえおあいうabcえお', 2, 2), '');
    t.equals(vw.substring('あいうabcえおあいうabcえお', 2, 3), 'い');
    t.equals(vw.substring('あいうabcえおあいうabcえお', 4, 5), 'う');
    t.equals(vw.substring('あいうabcえおあいうabcえお', 4, 6), 'う');
    t.equals(vw.substring('あいうabcえおあいうabcえお', 4, 7), 'うa');
    t.equals(vw.substring('あいうabcえおあいうabcえお', 4, 8), 'うab');
    t.equals(vw.substring('あいうabcえおあいうabcえお', 4, 9), 'うabc');
    t.equals(vw.substring('あいうabcえおあいうabcえお', 4, 10), 'うabcえ');
    t.equals(vw.substring('あいうabcえおあいうabcえお', 4, 11), 'うabcえ');
    t.equals(vw.substring('あいうabcえおあいうabcえお', 4, 12), 'うabcえお');
    t.equals(vw.substring('あいうabcえおあいうabcえお', 4, 13), 'うabcえお');
    t.equals(vw.substring('あいうabcえおあいうabcえお', 4, 14), 'うabcえおあ');
    t.equals(vw.substring('あいうabcえおあいうabcえお', 4, 15), 'うabcえおあ');
    t.equals(vw.substring('あいうabcえおあいうabcえお', 4, 16), 'うabcえおあい');
    t.equals(vw.substring('あいうabcえおあいうabcえお', 4, 17), 'うabcえおあい');
    t.equals(vw.substring('あいうabcえおあいうabcえお', 4, 18), 'うabcえおあいう');
    t.equals(vw.substring('あいうabcえおあいうabcえお', 4, 19), 'うabcえおあいう');
    t.equals(vw.substring('あいうabcえおあいうabcえお', 4, 20), 'うabcえおあいうa');
    t.equals(vw.substring('あいうabcえおあいうabcえお', 3, 13), 'いうabcえお');
    t.end();
});

test('substr characters', function (t) {
    t.equals(vw.substring('abcdeabcde', 1, 2), 'abcdeabcde'.substring(1, 2));
    t.equals(vw.substring('abcdeabcde', 1), 'abcdeabcde'.substring(1));
    t.equals(vw.substring('abcdeabcde', 1, 1), 'abcdeabcde'.substring(1, 1));
    t.equals(vw.substring('abcdeabcde', 20), 'abcdeabcde'.substring(20));
    t.equals(vw.substring('abcdeabcde', 5, 1), 'abcdeabcde'.substring(5, 1));
    t.equals(vw.substring('あいうabcえおあいうabcえお', 1, 2), 'あ');
    t.equals(vw.substring('あいうabcえおあいうabcえお', 1, 3), 'あい');
    t.equals(vw.substring('あいうabcえおあいうabcえお', 2), 'いうabcえおあいうabcえお');
    t.equals(vw.substring('あいうabcえおあいうabcえお', 2, 2), '');
    t.equals(vw.substring('あいうabcえおあいうabcえお', 2, 3), 'い');
    t.equals(vw.substring('あいうabcえおあいうabcえお', 4, 5), 'う');
    t.equals(vw.substring('あいうabcえおあいうabcえお', 4, 6), 'う');
    t.equals(vw.substring('あいうabcえおあいうabcえお', 4, 7), 'うa');
    t.equals(vw.substring('あいうabcえおあいうabcえお', 4, 8), 'うab');
    t.equals(vw.substring('あいうabcえおあいうabcえお', 4, 9), 'うabc');
    t.equals(vw.substring('あいうabcえおあいうabcえお', 4, 10), 'うabcえ');
    t.equals(vw.substring('あいうabcえおあいうabcえお', 4, 11), 'うabcえ');
    t.equals(vw.substring('あいうabcえおあいうabcえお', 4, 12), 'うabcえお');
    t.equals(vw.substring('あいうabcえおあいうabcえお', 4, 13), 'うabcえお');
    t.equals(vw.substring('あいうabcえおあいうabcえお', 4, 14), 'うabcえおあ');
    t.equals(vw.substring('あいうabcえおあいうabcえお', 4, 15), 'うabcえおあ');
    t.equals(vw.substring('あいうabcえおあいうabcえお', 4, 16), 'うabcえおあい');
    t.equals(vw.substring('あいうabcえおあいうabcえお', 4, 17), 'うabcえおあい');
    t.equals(vw.substring('あいうabcえおあいうabcえお', 4, 18), 'うabcえおあいう');
    t.equals(vw.substring('あいうabcえおあいうabcえお', 4, 19), 'うabcえおあいう');
    t.equals(vw.substring('あいうabcえおあいうabcえお', 4, 20), 'うabcえおあいうa');
    t.equals(vw.substring('あいうabcえおあいうabcえお', 3, 13), 'いうabcえお');
    t.end();
});


test('truncate terminal characters', function (t) {
    t.equals(vw.truncate('\x1B[31mHello World', 10, '...', true), '\x1B[31mHello W...');
    t.equals(vw.truncate('\x1B[31mHello World\x1B[0m', 10, '...', true), '\x1B[31mHello W...');
    t.equals(vw.truncate('\x1B[31mHello World', 10, '\x1B[0m...', true), '\x1B[31mHello W\x1B[0m...');
    t.equals(vw.truncate('私の\x1B[31mモンスター\x1B[0mハンター', 12, '\x1B[0m…', true), '私の\x1b[31mモンス\x1b[0m…');
    t.end();
});