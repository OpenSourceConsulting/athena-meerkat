/*
 * File: app/store/MachineStore.js
 *
 * This file was generated by Sencha Architect version 3.2.0.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 4.2.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 4.2.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('webapp.store.MachineStore', {
    extend: 'Ext.data.Store',

    requires: [
        'webapp.model.MachineModel',
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            model: 'webapp.model.MachineModel',
            storeId: 'MachineStore',
            proxy: {
                type: 'ajax',
                url: '/machine/list',
                reader: {
                    type: 'json'
                }
            }
        }, cfg)]);
    }
});