var vows = require('vows');
var assert = require('assert');
var fs = require('fs');
var path = require('path');
var ISDK = require('../index.js');

var Serializer = require('../node_modules/xmlrpc/lib/serializer');
var DateFormatter = require('../node_modules/xmlrpc/lib/date_formatter');

// override methodCaller to send serialized data through callback;
ISDK.prototype.methodCaller = function(service, data, callback) {
  var out = Serializer.serializeMethodCall(service, data);
  callback(null, out);
};

vows.describe('ISDK Calls').addBatch({
  "When calling": {
    topic: new ISDK('app', 'key'),
    "appEcho": {
      topic: function (isdk) {
        isdk.appEcho('testText', this.callback);
      },
      "must match xml": assertXml('appEcho_call')
    },
    "addCon": {
      topic: function (isdk) {
        isdk.addCon({Email: 'test@email.com', FirstName: 'testFirstName', LastName: 'testLastName'}, this.callback);
      },
      "must match xml": assertXml('addCon_call')
    },
        "updateCon": {
      topic: function (isdk) {
        isdk.updateCon(1, {Email: 'test@email.com', FirstName: 'testFirstName', LastName: 'testLastName'}, this.callback);
      },
      "must match xml": assertXml('updateCon_call')
    },
    "addWithDupCheck": {
      topic: function (isdk) {
        isdk.addWithDupCheck({Email: 'test@email.com', FirstName: 'testFirstName', LastName: 'testLastName'}, 'Email', this.callback);
      },
      "must match xml": assertXml('upsertCon_call')
    },
    "upsertCon": {
      topic: function (isdk) {
        isdk.upsertCon({Email: 'test@email.com', FirstName: 'testFirstName', LastName: 'testLastName'}, 'Email', this.callback);
      },
      "must match xml": assertXml('upsertCon_call')
    },
    "findByEmail": {
      topic: function (isdk) {
        isdk.findByEmail('test@email.com', ['Id', 'FirstName', 'LastName'], this.callback);
      },
      "must match xml": assertXml('findByEmail_call')
    },
    "findCon": {
      topic: function (isdk) {
        isdk.findCon(1, ['Id', 'FirstName', 'LastName'], this.callback);
      },
      "must match xml": assertXml('findCon_call')
    },
    "campAssign": {
      topic: function (isdk) {
        isdk.campAssign(1,2,this.callback);
      },
      "must match xml": assertXml('campAssign_call')
    },
    "grpAssign": {
      topic: function (isdk) {
        isdk.grpAssign(1,3,this.callback);
      },
      "must match xml": assertXml('grpAssign_call')
    },
    "grpRemove": {
      topic: function (isdk) {
        isdk.grpRemove(1,3,this.callback);
      },
      "must match xml": assertXml('grpRemove_call')
    },
    "optIn": {
      topic: function (isdk) {
        isdk.optIn('test@email.com', 'Test OptIn', this.callback);
      },
      "must match xml": assertXml('optIn_call')
    },
    "optOut": {
      topic: function (isdk) {
        isdk.optOut('test@email.com', 'Test OptOut', this.callback);
      },
      "must match xml": assertXml('optOut_call')
    },
    "dsGetSetting": {
      topic: function (isdk) {
        isdk.dsGetSetting('Contact', 'optiontypes', this.callback);
      },
      "must match xml": assertXml('dsGetSetting_call')
    },
    "dsAdd": {
      topic: function (isdk) {
        isdk.dsAdd('Product', {ProductName: 'TestProduct', ProductPrice: 120.99}, this.callback);
      },
      "must match xml": assertXml('dsAdd_call')
    },
    "dsCount": {
      topic: function (isdk) {
          isdk.dsCount('Contact', {Email: 'test@example.com'}, this.callback);
      },
      "must match xml": assertXml('dsCount_call')
    },
    "dsDelete": {
      topic: function (isdk) {
        isdk.dsDelete('Product', 4, this.callback);
      },
      "must match xml": assertXml('dsDelete_call')
    },
    "dsUpdate": {
      topic: function (isdk) {
        isdk.dsUpdate('Product', 4, {ProductName: 'UpdatedTestProduct'}, this.callback);
      },
      "must match xml": assertXml('dsUpdate_call')
    },
    "dsLoad": {
      topic: function (isdk) {
        isdk.dsLoad('Product', 4, ['Id', 'ProductPrice'], this.callback);
      },
      "must match xml": assertXml('dsLoad_call')
    },
    "dsLoad (without field spec)": {
      topic: function (isdk) {
        isdk.dsLoad('Product', 4, this.callback);
      },
      "must match xml": assertXml('dsLoadNoSpec_call')
    },
    "dsFind": {
      topic: function (isdk) {
        isdk.dsFind('Product', 1, 0, 'ProductName', 'UpdatedTestProduct', ['Id', 'ProductPrice'], this.callback);
      },
      "must match xml": assertXml('dsFind_call')
    },
    "dsQuery": {
      topic: function (isdk) {
        isdk.dsQuery('Product', 1, 0, {ProductName: 'UpdatedTestProduct'}, ['Id', 'ProductPrice'], this.callback);
      },
      "must match xml": assertXml('dsQuery_call')
    },
    "createBlankOrder": {
      topic: function (isdk) {
        isdk.createBlankOrder(1, 'TestBlankOrder', null, 0, 0, this.callback);
      },
      "must match xml": assertXml('createBlankOrder_call')
    },
    "addOrderItem": {
      topic: function (isdk) {
        isdk.addOrderItem(5, 4, 4, 120, 1, 'TestBlankOrderWithDiscount', null, this.callback);
      },
      "must match xml": assertXml('addOrderItem_call')
    },
    "addManualPayment": {
      topic: function (isdk) {
        isdk.addManualPayment(5, 120, null, 'Cash', 'TestPayment', true, this.callback);
      },
      "must match xml": assertXml('addManualPayment_call')
    },
    "createInvoiceForRecurring": {
      topic: function (isdk) {
        isdk.createInvoiceForRecurring(6, this.callback);
      },
      "must match xml": assertXml('createInvoiceForRecurring_call')
    },
    "calculateAmountOwed": {
      topic: function (isdk) {
        isdk.calculateAmountOwed(5, this.callback);
      },
      "must match xml": assertXml('calculateAmountOwed_call')
    },
    "placeOrder": {
      topic: function (isdk) {
        isdk.placeOrder(1, 7, 8, [4], [9], true, null, this.callback);
      },
      "must match xml": assertXml('placeOrder_call')
    },
    "runAS": {
      topic: function (isdk) {
        isdk.runAS(1,10,this.callback);
      },
      "must match xml": assertXml('runAS_call')
    },
    "validateCard (by cardId)": {
      topic: function (isdk) {
       isdk.validateCard(11, this.callback);
      },
      "must match xml": assertXml('validateCard-byId_call')
    },
    "validateCard": {
      topic: function (isdk) {
        isdk.validateCard({CardNumber: '7357', ContactId: 1, ExpirationMonth: '13', ExpirationYear: '1991', CVV2: '123', CardType: 'MasterCard'}, this.callback);
      },
      "must match xml": assertXml('validateCard_call')
    },
    "locateCard": {
      topic: function (isdk) {
        isdk.locateCard(1, '7357', this.callback);
      },
      "must match xml": assertXml('locateCard_call')
    },
    "getEmailTemplate": {
      topic: function (isdk) {
        isdk.getEmailTemplate(12, this.callback);
      },
      "must match xml": assertXml('getEmailTemplate_call')
    },
    "sendEmail": {
      topic: function (isdk) {
        isdk.sendEmail([1],'test1@email.com','~Contact.Email~','test2@email.com','test3@email.com','Multipart','subject','<html />', 'text', 1, this.callback);
      },
      "must match xml": assertXml('sendEmail_call')
    },
    "optStatus": {
      topic: function (isdk) {
        isdk.optStatus('test1@email.com', this.callback);
      },
      "must match xml": assertXml('optStatus_call')
    },
    "mergeCon": {
      topic: function (isdk) {
        isdk.mergeCon(1, 13, this.callback);
      },
      "must match xml": assertXml('mergeCon_call')
    },
    "achieveGoal": {
      topic: function(isdk){
        isdk.fsGoal('intname', 'callname', 1, this.callback);
      },
      "must match xml": assertXml('achieveGoal_call')
    }
  }
}).export(module);

function assertXml(fileName) {
  return function(result) {
    var file = path.join(__dirname, 'data', fileName + '.xml');
    var xml = fs.readFileSync(file, 'utf8').trim();
    assert.strictEqual(result, xml);
  };
}
