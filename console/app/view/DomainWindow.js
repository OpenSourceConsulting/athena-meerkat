/*
 * File: app/view/DomainWindow.js
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

Ext.define('webapp.view.DomainWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.DomainWindow',

    requires: [
        'Ext.form.Panel',
        'Ext.form.RadioGroup',
        'Ext.form.field.Radio',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Hidden',
        'Ext.grid.Panel',
        'Ext.grid.column.Number',
        'Ext.grid.View',
        'Ext.grid.plugin.RowEditing',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button'
    ],

    height: 435,
    id: 'domainWindow',
    width: 440,
    layout: 'fit',
    title: 'New Domain',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    height: 168,
                    id: 'domainForm',
                    itemId: 'domainForm',
                    bodyPadding: 10,
                    frameHeader: false,
                    header: false,
                    title: 'My Form',
                    items: [
                        {
                            xtype: 'textfield',
                            id: 'domainNameTextField',
                            itemId: 'domainNameTextField',
                            width: 388,
                            fieldLabel: 'Name',
                            name: 'UserIDTextField',
                            allowBlank: false,
                            allowOnlyWhitespace: false,
                            emptyText: '',
                            validateBlank: true
                        },
                        {
                            xtype: 'radiogroup',
                            id: 'domainTypeRadioButtonField',
                            fieldLabel: 'Type',
                            items: [
                                {
                                    xtype: 'radiofield',
                                    id: 'domainTypeClustering',
                                    name: 'DomainType',
                                    value: true,
                                    boxLabel: 'Clustering',
                                    checked: true,
                                    listeners: {
                                        change: {
                                            fn: me.onDomainTypeClusteringChange,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'radiofield',
                                    id: 'domainTypeNoneClustering',
                                    name: 'DomainType',
                                    value: false,
                                    boxLabel: 'Non-clustering',
                                    listeners: {
                                        change: {
                                            fn: me.onDomainTypeNoneClusteringChange,
                                            scope: me
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'combobox',
                            id: 'dataGridServerGroupComboBoxField',
                            width: 390,
                            fieldLabel: 'Datagrid server group',
                            name: 'DatagridServerGroupComboBox',
                            allowBlank: false,
                            allowOnlyWhitespace: false,
                            displayField: 'name',
                            store: 'DatagridServerGroupStore',
                            valueField: 'id'
                        },
                        {
                            xtype: 'hiddenfield',
                            id: 'domainIdHiddenField',
                            fieldLabel: 'Label',
                            name: 'IDHiddenField'
                        },
                        {
                            xtype: 'gridpanel',
                            height: 230,
                            id: 'domainClusteringConfigurationGridView',
                            title: 'Clustering Configuration',
                            forceFit: true,
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'string',
                                    text: 'Name'
                                },
                                {
                                    xtype: 'numbercolumn',
                                    dataIndex: 'number',
                                    text: 'Value'
                                }
                            ],
                            plugins: [
                                Ext.create('Ext.grid.plugin.RowEditing', {

                                })
                            ],
                            dockedItems: [
                                {
                                    xtype: 'toolbar',
                                    dock: 'top',
                                    items: [
                                        {
                                            xtype: 'button',
                                            text: 'New'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            height: 38,
                            layout: {
                                type: 'hbox',
                                align: 'middle',
                                defaultMargins: {
                                    top: 0,
                                    right: 10,
                                    bottom: 10,
                                    left: 0
                                },
                                pack: 'center'
                            },
                            items: [
                                {
                                    xtype: 'button',
                                    margins: '10 10 10 10',
                                    id: 'btnSubmitNewDomain',
                                    itemId: 'btnSubmitNewDomain',
                                    text: 'Create'
                                },
                                {
                                    xtype: 'button',
                                    handler: function(button, e) {
                                        Ext.MessageBox.confirm('Confirm', '작업을 취소하시겠습니까?', function(btn){

                                            if(btn == "yes"){
                                                button.up("window").close();
                                            }
                                        });
                                    },
                                    text: 'Cancel'
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    },

    onDomainTypeClusteringChange: function(field, newValue, oldValue, eOpts) {
        //alert(newValue);
        //Ext.getCmp("domainClusteringConfigurationGridView").show();
        //alert(newValue);
        var grid =  Ext.getCmp("domainClusteringConfigurationGridView");

        //else{
        //   Ext.getCmp("domainClusteringConfigurationGridView").hide();
        //}
        if(grid.isVisible()){
           grid.hide();
        }
    },

    onDomainTypeNoneClusteringChange: function(field, newValue, oldValue, eOpts) {
        var grid =  Ext.getCmp("domainClusteringConfigurationGridView");
        if(!grid.isVisible()){
           grid.show();
        }
    }

});