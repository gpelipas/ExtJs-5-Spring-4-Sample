//var values = Ext.create('Ext.data.Store', {
//    fields: ['cd', 'name'],
//    data : [
//        {"cd":"XX", "name":"XUXA"},
//        {"cd":"VV", "name":"VUVA"},
//        {"cd":"AA", "name":"AAAAAA"}
//    ]
//});

Ext.define('Test.product.view.ProductDetailPanel', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.productDetailPanel',
	id : 'productDetailPanel',
	store : 'Test.product.store.Details',
	columns : [ {
		xtype : 'rownumberer'
	}, {
		dataIndex : 'code',
		text : 'Name',
		width : 200,
		editor : {
			allowBlank : false
		}
	}, {
		dataIndex : 'value',
		text : 'Value',
		width : 300,
		editor : {
			allowBlank : false
//			xtype: 'combo',
//			store: values,
//			displayField : 'name',
//            valueField : 'cd'
		}
	} ],
	plugins : [ {
		ptype : 'cellediting',
		pluginId : 'cellEditingPlugin',		
		clicksToEdit : 2
	} ],

	tbar : [ {
		text : 'Add',
		itemId : 'addDetailBtn',
		disabled: true,		
		action : 'addDetail'
	} ]
});
