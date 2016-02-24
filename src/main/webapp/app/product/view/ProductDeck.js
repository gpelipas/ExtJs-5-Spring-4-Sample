Ext.define('Test.product.view.ProductDeck', {
	extend : 'Ext.container.Container',
	requires : [ 'Test.product.view.ProductListPanel', 'Test.product.view.ProductDetailPanel', 'Ext.panel.Panel' ],
	id : 'productDeck',
	xtype : 'maindeck',
	width : '100%',
	height : 500, 
	items : [ {
		xtype : 'panel',
		border : 1,
		layout: {
		    type: 'vbox' 
		},
		width : '100%', 
		height : '100%',
		items : [ {
			xtype : 'productListPanel',
			itemId : 'productListPanel',
			width : '100%',
			height : 400,
			title : 'Products' 
		},
		{
			xtype : 'productDetailPanel',
			itemId : 'productDetailPanel',
			width : '100%',
			height : 500,
			title : 'Details' 
		}]
	} ]

	
});
