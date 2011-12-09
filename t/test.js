subtest('width', function () {
    is(width('あいうえお'), 10);
    is(width('...'), 3);
    is(width('Shinjuku'), 8);
});
subtest('width/surrogate pair', function () {
    is(width(String.fromCharCode(0xD840, 0xDC0B)), 2);
    is(width(String.fromCharCode(0xD869, 0xDEB2)), 2);
    is(width(String.fromCharCode(0xD840, 0xDC0B) + String.fromCharCode(0xD869, 0xDEB2)), 4);
});

subtest('truncate', function () {
    is(truncate('無印良品 アキバ・トリム', 20, '...'), '無印良品 アキバ・...');
    is(truncate('Shinjuku', 15, '…'), 'Shinjuku');
    is(truncate('あいうえお', 12, '...'), 'あいうえお');
    is(truncate('あいうえお', 11, '...'), 'あいうえお');
    is(truncate('あいうえお', 10, '...'), 'あいうえお');
    is(truncate('あいうえお', 9,  '...'), 'あいう...');
    is(truncate('あいうえお', 8,  '...'), 'あい...');
    is(truncate('あいうえお', 7,  '...'), 'あい...');
    is(truncate('あいうえお', 6,  '...'), 'あ...');
    is(truncate('あいうえお', 5,  '...'), 'あ...');
});

