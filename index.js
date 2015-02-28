var xmlrpc = require('xmlrpc');
var types = require('./lib/types');

var iSDK = module.exports = function (appname, apikey, handler) {

	this.appName = appname;
	this.apiKey = apikey;
	this.responseHandler = handler || function () {};
	this.client = xmlrpc.createSecureClient('https://' + this.appName + '.infusionsoft.com/api/xmlrpc');

};

iSDK.prototype.methodCaller = function (service, data, callback) {
	var cb = (typeof(callback) === 'function') ? callback : this.responseHandler;
	this.client.methodCall(service, data, cb);
};

iSDK.prototype.appEcho = function (txt, callback) {
	var ca = [txt];
	this.methodCaller('DataService.echo', ca, callback);
};

iSDK.prototype.addCon = function (cMap, callback) {
	var ca = [this.apiKey, cMap];
	this.methodCaller('ContactService.add', ca, callback);
};

iSDK.prototype.updateCon = function (cId, cMap, callback){
	var ca = [this.apiKey, cId, cMap];
	this.methodCaller('ContactService.update', ca, callback);
};

iSDK.prototype.addWithDupCheck = iSDK.prototype.upsertCon = function (data, dupCheckType, callback) {
	var ca = [this.apiKey, data, dupCheckType];
	this.methodCaller('ContactService.addWithDupCheck', ca, callback);
};

iSDK.prototype.findByEmail = function (email, fMap, callback) {
	var ca = [this.apiKey, email, fMap];
	this.methodCaller('ContactService.findByEmail', ca, callback);
};

iSDK.prototype.findCon = function (cId, rFields, callback) {
	var ca = [this.apiKey, cId, rFields];
	this.methodCaller("ContactService.load", ca, callback);
};

iSDK.prototype.campAssign = function (cId, campId, callback) {
	var ca = [this.apiKey, cId, campId];
	this.methodCaller("ContactService.addToCampaign", ca, callback);
};

iSDK.prototype.grpAssign = function (cId, gId, callback) {
	var ca = [this.apiKey, cId, gId];
	this.methodCaller('ContactService.addToGroup', ca, callback);
};

iSDK.prototype.grpRemove = function (cId, gId, callback) {
	var ca = [this.apiKey, cId, gId];
	this.methodCaller('ContactService.removeFromGroup', ca, callback);
};

iSDK.prototype.mergeCon = function (cId, dupId, callback) {
	var ca = [this.apiKey, cId, dupId];
	this.methodCaller('ContactService.merge', ca, callback);
};

iSDK.prototype.optIn = function (email, reason, callback) {
	var ca = [this.apiKey, email, reason || 'API opt-in'];
	this.methodCaller('APIEmailService.optIn', ca, callback);
};

iSDK.prototype.optOut = function (email, reason, callback) {
	var ca = [this.apiKey, email, reason || 'API opt-out'];
	this.methodCaller('APIEmailService.optOut', ca, callback);
};

iSDK.prototype.dsGetSetting = function (module, setting, callback) {
	var ca = [this.apiKey, module, setting];
	this.methodCaller('DataService.getAppSetting', ca, callback);
};

iSDK.prototype.dsAdd = function (tableName, fields, callback) {
	var ca = [this.apiKey, tableName, fields];
	this.methodCaller('DataService.add', ca, callback);
};

iSDK.prototype.dsCount = function(tableName, query, callback) {
    var ca = [this.apiKey, tableName, query];
    this.methodCaller('DataService.count', ca, callback);
};

iSDK.prototype.dsDelete = function (tableName, id, callback){
	id = (typeof(id) === 'number') ? id : parseInt(id, 10);
	if (isNaN(id)) return callback(new Error('id should be an integer'));

	var ca = [this.apiKey, tableName, id];
	this.methodCaller('DataService.delete', ca, callback);
};

iSDK.prototype.dsUpdate = function (tableName, id, uFields, callback) {
	id = (typeof(id) === 'number') ? id : parseInt(id, 10);
	if (isNaN(id)) return callback(new Error('id should be an integer'));

	var ca = [this.apiKey, tableName, id, uFields];
	this.methodCaller('DataService.update', ca, callback);
};

iSDK.prototype.dsLoad = function (tableName, id, rFields, callback) {
	id = (typeof(id) === 'number') ? id : parseInt(id, 10);

	if (isNaN(id)) return callback(new Error('id should be an integer'));

	var ca = [this.apiKey, tableName];

	// if rFields is a function, it is actually callback
	// if rFields is an array, it is rFields
	// otherwise the api call is invalid
	if (!Array.isArray(rFields)) {
		if (typeof(rFields) === 'function' && !callback) {
			callback = rFields;
			rFields = undefined;
		} else return callback(new Error('rFields should be an Array'));
	} else ca.push(rFields);

	ca.push(id);

	this.methodCaller('DataService.load', ca, callback);
};

iSDK.prototype.dsFind = function (tableName, limit, page, field, value, rFields, callback) {
	var ca = [this.apiKey, tableName, limit, page, field, value, rFields];
	this.methodCaller('DataService.findByField', ca, callback);
};

iSDK.prototype.dsQuery = function (tableName, limit, page, query, rFields, orderBy, ascending, callback) {
	switch (arguments.length){
		case 8:
			var ca = [this.apiKey,tableName, limit, page, query, rFields, orderBy, ascending];
			break;
		case 6:
			var ca = [this.apiKey,tableName, limit, page, query, rFields];
			callback = orderBy;
			break;
	}
	this.methodCaller('DataService.query', ca, callback);
};

iSDK.prototype.createBlankOrder = function (contactId, description, date, leadAffiliateId, saleAffiliateId, callback) {
	var ca = [this.apiKey, contactId, description, date, leadAffiliateId || 0, saleAffiliateId || 0];
	this.methodCaller('InvoiceService.createBlankOrder', ca, callback);
};

iSDK.prototype.addOrderItem = function (invoiceId, productId, type, price, quantity, description, notes, callback) {
	var ca = [this.apiKey, invoiceId, productId, type, new types.Double(price), quantity, description || '', notes || ''];
	this.methodCaller('InvoiceService.addOrderItem', ca, callback);
};

iSDK.prototype.addManualPayment = function (invoiceId, amt, paymentDate, paymentType, paymentDescription, bypassCommissions, callback) {
	var ca = [this.apiKey, invoiceId, new types.Double(amt), paymentDate, paymentType, paymentDescription, bypassCommissions || false];
	this.methodCaller('InvoiceService.addManualPayment', ca, callback);
};

iSDK.prototype.createInvoiceForRecurring = function (recurringOrderId, callback) {
	var ca = [this.apiKey, recurringOrderId];
	this.methodCaller('InvoiceService.createInvoiceForRecurring', ca, callback);
};

iSDK.prototype.calculateAmountOwed = function (invoiceId, callback) {
	var ca = [this.apiKey, invoiceId];
	this.methodCaller('InvoiceService.calculateAmountOwed', ca, callback);
};

iSDK.prototype.placeOrder = function (contactId, creditCardId, payPlanId, productIds, subscriptionIds, processSpecials, promocodes, callback) {
	var ca = [this.apiKey, contactId, creditCardId, payPlanId, productIds || [], subscriptionIds || [], (processSpecials === true), promocodes || []];
	this.methodCaller('OrderService.placeOrder', ca, callback);
};

iSDK.prototype.findProduct = function (id, rFields, callback) {
	this.dsQuery('Product', 1, 0, {'Id': id}, rFields, callback);
};

iSDK.prototype.runAS = function (cid, asid, callback) {
	var ca = [this.apiKey, cid, asid];
	this.methodCaller('ContactService.runActionSequence', ca, callback);
};

iSDK.prototype.getEmailTemplate = function (id, callback) {
	var ca = [this.apiKey, id];
	this.methodCaller('APIEmailService.getEmailTemplate', ca, callback);
};

iSDK.prototype.sendEmail = function (clist, fromAddr, toAddr, ccAddr, bccAddr, contentType, subject, htmlBody, textBody, templateId, callback) {
	var ca = [this.apiKey, clist, fromAddr, toAddr, ccAddr, bccAddr, contentType, subject, htmlBody, textBody];
	if (typeof(templateId) === 'number') ca.push(templateId);
	this.methodCaller('APIEmailService.sendEmail', ca, callback);
};

iSDK.prototype.optStatus = function (email, callback) {
	var ca = [this.apiKey, email];
	this.methodCaller('APIEmailService.getOptStatus', ca, callback);
};

iSDK.prototype.validateCard = function (card, callback) {
	var t = typeof(card);
	if (!card || (t !== 'number' && t !== 'object')) callback(new Error('Expect first argument to be a number or an object'));
	var ca = [this.apiKey, card];
	this.methodCaller('InvoiceService.validateCreditCard', ca, callback);
};

iSDK.prototype.locateCard = function (contactId, lastFour, callback) {
	var ca = [this.apiKey, contactId, lastFour];
	this.methodCaller('InvoiceService.locateExistingCard', ca, callback);
};

iSDK.prototype.fsGoal = function(integration, name, contactId, callback){
	var ca = [this.apiKey, integration, name, contactId];
	this.methodCaller('FunnelService.achieveGoal', ca, callback);
}

iSDK.types = types;
