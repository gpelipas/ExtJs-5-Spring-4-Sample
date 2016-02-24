Ext.define('Test.product.model.Detail', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'code', type: 'string'},             
        {name: 'value',  type: 'string'} 
    ],
    belongsTo: 'Test.product.model.Product'
});
