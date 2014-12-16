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
  t.equals(vw.width('あいうえお'), 10);
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
    t.equals(vw.truncate('あいうえお', 5,  '...'), 'あ...');
    t.end()
});

