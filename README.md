infusionsoft
============

InfusionSoft node.js SDK.

[![npm](https://nodei.co/npm/infusionsoft.png?downloads=true)](https://npmjs.org/package/infusionsoft)

[![Travis](https://travis-ci.org/patricklodder/infusionsoft.png)](https://travis-ci.org/patricklodder/infusionsoft)

### Installation ###
```bash
npm install infusionsoft 
```

### Usage ###
```javascript
var iSDK = require('infusionsoft');
var client = new iSDK('app_name', 'api_key');
```

### Implemented methods ###
*see [help.infusionsoft.com](http://help.infusionsoft.com/api-docs) for more information*



**APIEmailService.getEmailTemplate**: ```client.getEmailTemplate(templateId, callback)```

**APIEmailService.getOptStatus**: ```client.optStatus(email, callback)```

**APIEmailService.optIn**: ```client.optIn(email, reason, callback)```

**APIEmailService.optOut**: ```client.optOut(email, reason, callback)```

**APIEmailService.sendEmail**: ```client.sendEmail(contactList, fromAddr, toAddr, ccAddr, bccAddr, contentType, subject, html, text, templateId, callback)```



**ContactService.add**: ```client.addCon(contactData, callback)```

**ContactService.addToCampaign**: ```client.campAssign(contactId, campaignId, callback)```

**ContactService.addToGroup**: ```client.grpAssign(contactId, groupId, callback)```

**ContactService.addWithDupCheck**: ```client.addWithDupCheck(data, dupCheckType, callback)```

**ContactService.findByEmail**: ```client.findByEmail(email, fMap, callback)```

**ContactService.load**: ```client.findCon(contactId, fieldList, callback)```

**ContactService.merge**: ```client.mergeCon(contactId, duplicateId, callback)```

**ContactService.removeFromGroup**: ```client.grpRemove(contactId, groupId, callback)```

**ContactService.runActionSequence**: ```client.runAS(contactId, seqId, callback)```

**ContactService.update**: ```client.updateCon(contactId, contactData, callback)```



**DataService.add**: ```client.dsAdd(tableName, data, callback)```

**DataService.count**: ```client.dsCount(tableName, query, callback)```

**DataService.delete**: ```client.dsDelete(tableName, id, callback)```

**DataService.echo**: ```client.appEcho(text, callback)```

**DataService.findByField**: ```client.dsFind(tableName, limit, page, field, value, fieldMap, callback)```

**DataService.getAppSetting**: ```client.dsGetSetting(module, setting, callback)```

**DataService.load**: ```client.dsLoad(tableName, id, fieldMap, callback)```

**DataService.update**: ```client.dsUpdate(tableName, id, data, callback)```

**DataService.query**: ```client.dsQuery(tableName, limit, page, query, fieldMap, callback)```

**DataService.query**: ```client.dsQuery(tableName, limit, page, query, fieldMap, orderBy, ascending, callback)```



**FunnelService.achieveGoal**: ```client.fsGoal(integration, callName, contactId, callback)```



**InvoiceService.addManualPayment**: ```client.addManualPayment(invoiceId, amount, paymentDate, paymentType, paymentDescription, bypassCommissions, callback)```

**InvoiceService.addOrderItem**: ```client.addOrderItem(invoiceId, productId, type, price, quantity, description, notes, callback)```

**InvoiceService.calculateAmountOwed**: ```client.calculateAmountOwed(invoiceId, callback)```

**InvoiceService.createBlankOrder**: ```client.createBlankOrder(contactId, description, date, leadAffiliateId, saleAffiliateId, callback)```

**InvoiceService.createInvoiceForRecurring**: ```client.createInvoiceForRecurring(recurringOrderId, callback)```

**InvoiceService.locateExistingCard**: ```client.locateCard(contactId, lastFour, callback)```

**InvoiceService.validateCreditCard**: ```client.validateCard(card, callback)```



**OrderService.placeOrder**: ```client.placeOrder(contactId, creditCardId, payPlanId, productIds, subscriptionIds, processSpecials, promocodes, callback)```
