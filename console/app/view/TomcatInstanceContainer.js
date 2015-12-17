/*
 * File: app/view/TomcatInstanceContainer.js
 *
 * This file was generated by Sencha Architect version 3.0.0.
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

Ext.define('webapp.view.TomcatInstanceContainer', {
    extend: 'Ext.container.Container',
    alias: 'widget.tomcatinstancecontainer',

    layout: {
        type: 'border'
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'panel',
                    flex: 2,
                    region: 'north',
                    height: 389,
                    layout: {
                        align: 'stretch',
                        type: 'hbox'
                    },
                    manageHeight: false,
                    title: 'Overview',
                    items: [
                        {
                            xtype: 'displayfield',
                            width: 164,
                            fieldLabel: 'Host name:',
                            value: 'Display Field'
                        },
                        {
                            xtype: 'displayfield',
                            width: 249,
                            fieldLabel: 'Status',
                            value: 'Display Field'
                        },
                        {
                            xtype: 'displayfield',
                            width: 249,
                            fieldLabel: 'IP Address',
                            value: 'Display Field'
                        },
                        {
                            xtype: 'displayfield',
                            width: 249,
                            fieldLabel: 'Ports:',
                            value: 'Display Field'
                        },
                        {
                            xtype: 'displayfield',
                            width: 164,
                            fieldLabel: 'Web server',
                            value: 'Display Field'
                        },
                        {
                            xtype: 'displayfield',
                            width: 164,
                            fieldLabel: 'JVM Version',
                            value: 'Display Field'
                        },
                        {
                            xtype: 'displayfield',
                            width: 164,
                            fieldLabel: 'OS Name',
                            value: 'Display Field'
                        },
                        {
                            xtype: 'displayfield',
                            width: 164,
                            fieldLabel: 'Domain',
                            value: 'Display Field'
                        }
                    ],
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'top',
                            items: [
                                {
                                    xtype: 'button',
                                    disabled: true,
                                    text: 'Start'
                                },
                                {
                                    xtype: 'button',
                                    text: 'Stop'
                                },
                                {
                                    xtype: 'button',
                                    text: 'Restart'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'gridpanel',
                    flex: 7,
                    region: 'center',
                    margin: '5 0 0 0 ',
                    title: 'Data sources',
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
                            text: 'JDBC URL'
                        },
                        {
                            xtype: 'datecolumn',
                            dataIndex: 'date',
                            text: 'Servers'
                        },
                        {
                            xtype: 'booleancolumn',
                            dataIndex: 'bool',
                            text: 'Min Connection Pool'
                        },
                        {
                            xtype: 'booleancolumn',
                            dataIndex: 'bool',
                            text: 'Max Connection Pool'
                        },
                        {
                            xtype: 'booleancolumn',
                            dataIndex: 'bool',
                            text: 'Timeout'
                        }
                    ],
                    dockedItems: [
                        {
                            xtype: 'pagingtoolbar',
                            dock: 'bottom',
                            width: 360,
                            displayInfo: true
                        },
                        {
                            xtype: 'toolbar',
                            dock: 'top',
                            items: [
                                {
                                    xtype: 'button',
                                    id: 'btnLinkNewDatasource',
                                    text: 'Link new Datasource'
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});