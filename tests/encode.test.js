var assert = require("assert");
var bencode = require('../bencode.js');

describe("bencode", function() {
	describe("#encode()", function() {
		it('should always return a Buffer', function() {
			assert.ok(Buffer.isBuffer(bencode.encode({})), "its not a buffer for empty dicts");
			assert.ok(Buffer.isBuffer(bencode.encode("test")), "its not a buffer for strings");
			assert.ok(Buffer.isBuffer(bencode.encode([3, 2])), "its not a buffer for lists");
			assert.ok(Buffer.isBuffer(bencode.encode({"a": "b", 3: 6})), "its not a buffer for big dicts");
			assert.ok(Buffer.isBuffer(bencode.encode(123)), "its not a buffer for numbers");
		});

		it('should be able to encode a number', function() {
			assert.equal(bencode.encode(123), 'i123e');
			assert.equal(bencode.encode(123.5), 'i123.5e');
		})
		it('should be able to encode a negative number', function() {
			assert.equal(bencode.encode(-123), 'i-123e');
			assert.equal(bencode.encode(-123.5), 'i-123.5e');
		})
		it('should be able to encode a string', function() {
			assert.equal(bencode.encode("asdf"), '4:asdf');
			assert.equal(bencode.encode(":asdf:"), '6::asdf:');
		})
		it('should be able to encode a unicode string', function() {
			assert.equal(bencode.encode("ö±sdf"), '7:ö±sdf');
			assert.equal(bencode.encode(new Buffer("ö±sdf")), '7:ö±sdf');
		})
		it('should be able to encode a buffer', function() {
			assert.equal(bencode.encode(new Buffer("asdf")), '4:asdf');
			assert.equal(bencode.encode(new Buffer(":asdf:")), '6::asdf:');
		})
		it('should be able to encode an array', function() {
			assert.equal(bencode.encode([32, 12]), 'li32ei12ee');
			assert.equal(bencode.encode([":asdf:"]), 'l6::asdf:e');
		})
		it('should be able to encode an object', function() {
			assert.equal(bencode.encode({"a": "bc"}), 'd1:a2:bce')
			assert.equal(bencode.encode({"a": "45", "b": 45}), 'd1:a2:451:bi45ee')
			assert.equal(bencode.encode({"a": new Buffer("bc")}), 'd1:a2:bce')
		})
	})
});