var QUnit = require('./qunit').QUnit,
    qunitTap = require('qunit-tap').qunitTap,
    util = require('util'),
    fs = require('fs');

qunitTap(QUnit, util.puts, {noPlan: true});

QUnit.init();
QUnit.config.updateRate = 0;

var jutil = require('../jutil.js');
with ({is: QUnit.equal, subtest: QUnit.test, jlength: jutil.jlength, jtruncate: jutil.jtruncate}) {
    var content = fs.readFileSync('t/test.js', 'utf-8');
    eval(content);
}

QUnit.start();
