
Ext.define('Test.product.model.Product', {
	extend : 'Ext.data.Model',
	// requires : [ 'Test.product.model.Detail' ],
	fields : [ {
		name : 'id',
		type : 'string'
	}, {
		name : 'code',
		type : 'string'
	}, {
		name : 'name',
		type : 'string'
	}, {
		name : 'desc',
		type : 'string'
	}, {
		name : 'details',
		persist : true
	}

	],
	hasMany : [ {
		name : 'details',
		model : 'Test.product.model.Detail'
	} ],

	proxy : {
		// type: 'ajax',
		// url : 'app/products.json',
		// reader: 'json'

		writer : {
			writeAllFields : true
		},
		type : 'rest',
		url : 'product/',
		reader : {
			idProperty : 'id',
			type : 'json'
		},
		// appendId : true,
		actionMethods : {
			create : 'POST',
			read : 'GET',
			update : 'POST',
			destroy : 'DELETE'
		},
		listeners : {
			exception : function(proxy, response, operation, eOpts) {
				console.log('on Proxy exception...');
			}
		}
	}

});