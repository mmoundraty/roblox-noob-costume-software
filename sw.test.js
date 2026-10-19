// Run: node sw.test.js
// Checks the audio byte-range slicing and that every file the offline cache needs exists
// (one missing/misspelled file makes the whole offline save fail).
const fs = require('fs'), vm = require('vm'), path = require('path'), assert = require('assert');
const read = f => fs.readFileSync(path.join(__dirname, f), 'utf8');

const ctx = vm.createContext({ self: { addEventListener() {} }, importScripts: f => vm.runInContext(read(f), ctx) });
vm.runInContext(read('sw.js'), ctx);
const swParse = vm.runInContext('parseRange', ctx);
const parseRange = (h, size) => { const r = swParse(h, size); return r && [...r]; }; // copy out of the vm realm

assert.deepStrictEqual(parseRange('bytes=0-', 100), [0, 99]);
assert.deepStrictEqual(parseRange('bytes=10-19', 100), [10, 19]);
assert.deepStrictEqual(parseRange('bytes=0-1000', 100), [0, 99]);
assert.deepStrictEqual(parseRange('bytes=-10', 100), [90, 99]);
assert.strictEqual(parseRange('bytes=100-', 100), null);
assert.strictEqual(parseRange('nonsense', 100), null);

for (const f of vm.runInContext('FILES', ctx)) {
  assert.ok(fs.existsSync(path.join(__dirname, f === './' ? 'index.html' : f)), `missing file: ${f}`);
}
console.log('ok');
