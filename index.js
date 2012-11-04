var xmlrpc = require('xmlrpc');

var iSDK = module.exports = function (appname, apikey, handler) {

	this.appName = appname;
	this.apiKey = apikey;
	this.responseHandler = handler;
	this.client = xmlrpc.createSecureClient('https://' + this.appName + '.infusionsoft.com/api/xmlrpc');
	
};

iSDK.prototype.methodCaller = function(service, data, callback) {
	var cb = (typeof(callback) === 'function') ? callback : function(){};
	this.client.methodCall(service, data, function(error, value){
		cb(error, value);
	});
};

iSDK.prototype.appEcho = function(txt, callback) {
	var ca = [txt];
	this.methodCaller('DataService.echo', ca, callback);
};

iSDK.prototype.addCon = function(cMap, callback) {
	var ca = [this.apiKey, cMap];
	
	this.methodCaller('ContactService.add', ca, callback);
};

iSDK.prototype.updateCon = function(cId, cMap, callback){
	var ca = [this.apiKey, cId, cMap];
	this.methodCaller('ContactService.update', ca, callback);
};

iSDK.prototype.findByEmail = function(email, fMap, callback) {
	var ca = [this.apiKey, email, fMap];
	this.methodCaller('ContactService.findByEmail', ca, callback);
};

iSDK.prototype.findCon = function(cId, rFields, callback) {
	var ca = [this.apiKey, cId, rFields];
	this.methodCaller("ContactService.load", ca, callback);
};

iSDK.prototype.campAssign = function (cId, campId, callback) {
	var ca = [this.apiKey, cId, campId]
	this.methodCaller("ContactService.addToCampaign", ca, callback);
};

iSDK.prototype.grpAssign = function(cId, gId, callback) {
	var ca = [this.apiKey, cId, gId];
	this.methodCaller('ContactService.addToGroup', ca, callback);
};

iSDK.prototype.grpRemove = function(cId, gId, callback) {
	ca = [this.apiKey, cId, gId];
	this.methodCaller('ContactService.removeFromGroup', ca, callback);
};

iSDK.prototype.optIn = function(email, reason, callback) {
	reason = reason || 'API opt-in';
	var ca = [this.apiKey, email, reason];
   	this.methodCaller('APIEmailService.optIn', ca, callback);
};

iSDK.prototype.optOut = function(email, reason, callback) {
	reason = reason || 'API opt-out';
	var ca = [this.apiKey, email, reason];
	this.methodCaller('APIEmailService.optOut', ca, callback);
};

iSDK.prototype.dsGetSetting = function(module, setting, callback) {
	var ca = [this.apiKey, module, setting];
	this.methodCaller('DataService.getAppSetting', ca, callback);
};

iSDK.prototype.dsAdd = function(tableName, fields, callback) {
	var ca = [this.apiKey, tableName, fields];
	this.methodCaller('DataService.add', ca, callback);
};

iSDK.prototype.dsDelete = function(tableName, id, callback){
	var i;
	if (!(i = parseInt(id))) {callback('ID should be numerical'); return;}
	var ca = [this.apiKey, tableName, i];
	this.methodCaller('DataService.delete', ca, callback);
};

iSDK.prototype.dsUpdate = function(tableName, id, uFields, callback) {
	var i;
	if (!(i = parseInt(id))) {callback('ID should be numerical'); return;}
	var ca = [this.apiKey, tableName, i, uFields];
	this.methodCaller('DataService.update', ca, callback);
};

iSDK.prototype.dsLoad = function(tableName, id, callback) {
	var i;
	if (!(i = parseInt(id))) {callback('ID should be numerical'); return;}
	var ca = [this.apiKey, tableName, i];
	this.methodCaller('DataService.load', ca, callback);
};

iSDK.prototype.dsFind = function(tableName, limit, page, field, value, rFields, callback) {
	var ca = [this.apiKey, tableName, limit, page, field, value, rFields];
	this.methodCaller('DataService.findByField', ca, callback);
};

iSDK.prototype.dsQuery = function(tableName, limit, page, query, rFields, callback) {
	var ca = [this.apiKey,tableName, limit, page, query, rFields];
	this.methodCaller('DataService.query', ca, callback);
};

iSDK.prototype.findProduct = function(id, rFields, callback) {
	this.dsQuery('Product', 1, 0, {'Id': id}, rFields, callback);
};

iSDK.prototype.runAS = function(cid, asid, callback) {
	var ca = [this.apiKey, cid, asid];
	this.methodCaller('ContactService.runActionSequence', ca, callback);
};
