Ext.define('Test.product.controller.Product', {
	extend : 'Ext.app.Controller',
	views : [ 'Test.product.view.ProductDeck' ],

	models : [ 'Test.product.model.Product' ],
	stores : [ 'Test.product.store.Product', 'Test.product.store.Details' ],

	refs : [ {
		ref : 'productDeck',
		selector : '#productDeck'
	}, {
		ref : 'productListPanel',
		selector : '#productListPanel'
	}, {
		ref : 'productDetailPanel',
		selector : '#productDetailPanel'
	} ],
	//

	init : function() {
		this.control({
			'#productListPanel' : {
				itemclick : this.productClicked,
				canceledit : this.cancelProduct,
				edit : this.updateProduct,
				beforeedit : this.beforeProductEdit,
			},
			'#productDetailPanel' : {
				beforeedit : this.beforeProductDtlEdit,
			},
			'#productDetailPanel button[action=addDetail]' : {
				click : this.addDetail
			},
			'#productListPanel button[action=addProduct]' : {
				click : this.addProduct
			}
		});
	},
	
	isProductEditMode: false,	
	
	beforeProductDtlEdit : function(editor, ctx, opts) {
		// alert('beforeProductDtlEdit ' + this.isProductEditMode);
		
		if (!Ext.isEmpty(ctx.record.get('code') )) {
            if (ctx.colIdx == 1) return false;			
		}
		
		return this.isProductEditMode; 
	},

	beforeProductEdit : function(editor, ctx, opts) {
		// alert('beforeProductEdit');
		this.isProductEditMode = true;
		
		var addDetailBtn = this.getProductDetailPanel().down('#addDetailBtn');
		
		// console.log(addDetailBtn);
		
		addDetailBtn.enable();
		
		return true;
	},	
	
	productClicked : function(vwRef, record, item, index, e, eOpts) {		
		// var newAttrStore = Ext.create('Test.product.store.Details');
		// newAttrStore.add(record.attributes().getRange());
		// this.getProductListPanel().getStore()['_prevAttribs'] = newAttrStore;
		
		this.getProductDetailPanel().setStore(record.details());
	},

	addDetail : function() {
		var r = Ext.create('Test.product.model.Detail', {
			code : '',
			value : ''
		});
		var count = this.getProductDetailPanel().getStore().getCount();
		this.getProductDetailPanel().getStore().insert(count, r);
		
		var cellEditingPlugin = this.getProductDetailPanel().getPlugin('cellEditingPlugin');
		cellEditingPlugin.startEditByPosition({row: count, column: 1});	
	},

	updateProduct : function(editor, ctx) {
		//alert('update btn is click');
		
		this.isProductEditMode = false;	
		
		var addDetailBtn = this.getProductDetailPanel().down('#addDetailBtn');
		
		// console.log(addDetailBtn);
		
		addDetailBtn.disable();			
		
		var r = ctx.record;
		
		var dtls = r.details(); 
		
		dtls.commitChanges( );
		// console.log(r);
		
 		r.save({
	        success: function(record, operation) {
	        	// alert('success!!');
	        	console.log(record);
	        	console.log(operation);
	        	
	        	console.log(record.data.changes);
	        	
	        	var changes = record.data.changes;
	        	if (changes && changes.length > 0) {
		        	var msg = "";
		        	for (var i = 0; i < changes.length; i++) {
		        		msg += "<div>" + changes[i] + "</div>";
		        	}
		        	
		        	Ext.Msg.alert('Status', msg);    		        		
	        	}
	        	
	        },
        	failure: function(record, operation) {
        		// alert('ooopppss!!');
        		record.reject(true); // revert changes if error occurs
	        }
	    });
	},

	cancelProduct : function(editor, ctx) {
		// alert('cancel');
		
		this.isProductEditMode = false;		
		
		var addDetailBtn = this.getProductDetailPanel().down('#addDetailBtn');
				
		addDetailBtn.disable();		
		
		ctx.grid.getStore().reload();
		
		var r = this.getProductListPanel().getStore().getAt(ctx.rowIdx);
		
		var selection = this.getProductListPanel().getSelectionModel().getSelection();
		this.getProductListPanel().getStore().remove(selection); 
		this.getProductDetailPanel().getStore().removeAll();  
	},

	addProduct : function() {
		var r = Ext.create('Test.product.model.Product', {
			id : '', code : '', name : '',
			desc : ''
		});
		
		var count = this.getProductListPanel().getStore().getCount();
		this.getProductListPanel().getStore().insert(count, r);
		
		var rowEditing = this.getProductListPanel().getPlugin('rowEditingPlugin');
		rowEditing.startEdit(count, 1);
		
		var addDetailBtn = this.getProductDetailPanel().down('#addDetailBtn');		
		addDetailBtn.disable();
		
		this.getProductDetailPanel().getStore().removeAll(); 
		
		this.getProductListPanel().getView().refresh();
	},
	
	getListView : function() {
		var l = this.getProductDeck();
		// console.log('>>>getProductDeck =' + l);
		return l;
	},

	onLaunch : function(a) {
		// console.log('>>>ProductListPanel =' + this.getProductListPanel());
		// console.log(Ext.data.StoreManager.lookup('productDtlStore'));
	}
});
