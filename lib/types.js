var CustomType = require('xmlrpc').CustomType;
var util = require('util');

var types = module.exports = {};

//double
types.Double = function (raw, significance) {
	raw = (typeof(raw) === 'number') ? raw : parseFloat(raw, 10);
	this.significance = significance;
	CustomType.call(this, raw);
};

util.inherits(types.Double, CustomType);
types.Double.prototype.serialize = function (xml) {
	var value = this.significance ? this.raw.toFixed(this.significance) : this.raw.toString();
	xml.ele('double').txt(value);
};

// integer
types.Integer = function (raw) {
	raw = (typeof(raw) === 'number') ? raw : parseInt(raw, 10);
	CustomType.call(this, raw);
};

util.inherits(types.Integer, CustomType);
types.Integer.prototype.tagName = 'int';
