Ext.define('Test.product.view.ProductListPanel', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.productListPanel',
	id : 'productListPanel',
	store : 'Test.product.store.Product',
	columns : [ {
		xtype : 'rownumberer'
	}, {
		dataIndex : 'code',
		text : 'Barcode',
		width : 200,
		editor : {
			allowBlank : false
		}
	}, {
		dataIndex : 'name',
		text : 'Name',
		width : 300,
		editor : {
			allowBlank : false
		}
	}, {
		dataIndex : 'desc',
		text : 'Description',
		width : 300,
		editor : {
			allowBlank : false
		}
	// 
	} ],
	plugins : [ {
		ptype : 'rowediting',
		pluginId : 'rowEditingPlugin',
		clicksToEdit : 2
	} ],

	tbar : [ {
		text : 'Add',
		itemId : 'addBtn',
		//disabled: true,
		action : 'addProduct'
	} ]
});
