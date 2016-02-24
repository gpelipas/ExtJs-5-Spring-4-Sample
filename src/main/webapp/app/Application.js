// load fix for serialization issue on structured model
Ext.define('Overrides.JsonWriter', {
	override : 'Ext.data.writer.Json',

	getRecordData : function(record, operation) {
		// console.log("using JsonWriter override!!!!!!");
		record.data = this.callParent(arguments);
		
		console.log(record.data);
		console.log(record.getAssociatedData());
		
		Ext.apply(record.data, record.getAssociatedData());

		return record.data;
	}
});

Ext.application({
	
    name: 'Test',

    controllers: [
        'Test.product.controller.Product'
    ],
    
    autoCreateViewport: 'Test.product.view.ProductDeck',    
    
    launch: function () {
        try {
        	//
        } catch (e) { }
    }
});
