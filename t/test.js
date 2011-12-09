subtest('jlength', function () {
    is(jlength('あいうえお'), 10);
    is(jlength('...'), 3);
    is(jlength(String.fromCharCode(0xD840, 0xDC0B)), 2); // サロゲートペア
});

subtest('jtruncate', function () {
    is(jtruncate('あいうえお', 12, '...'), 'あいうえお');
    is(jtruncate('あいうえお', 11, '...'), 'あいうえお');
    is(jtruncate('あいうえお', 10, '...'), 'あいうえお');
    is(jtruncate('あいうえお', 9,  '...'), 'あいう...');
    is(jtruncate('あいうえお', 8,  '...'), 'あい...');
    is(jtruncate('あいうえお', 7,  '...'), 'あい...');
    is(jtruncate('あいうえお', 6,  '...'), 'あ...');
    is(jtruncate('あいうえお', 5,  '...'), 'あ...');
});

