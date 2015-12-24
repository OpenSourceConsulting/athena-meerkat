/*
 * File: app/view/UserMntContainer.js
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

Ext.define('webapp.view.UserMntContainer', {
    extend: 'Ext.container.Container',
    alias: 'widget.usermntcontainer',

    height: 497,
    itemId: 'mycontainer38',
    width: 1111,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'gridpanel',
                    height: 349,
                    title: 'User List',
                    forceFit: true,
                    store: 'UserStore',
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            width: 156,
                            dataIndex: 'userName',
                            hideable: false,
                            text: 'UserID'
                        },
                        {
                            xtype: 'gridcolumn',
                            width: 156,
                            dataIndex: 'fullName',
                            text: 'Full Name'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'userRoleName',
                            text: 'User Role'
                        },
                        {
                            xtype: 'gridcolumn',
                            width: 208,
                            dataIndex: 'email',
                            text: 'Email'
                        },
                        {
                            xtype: 'gridcolumn',
                            width: 133,
                            dataIndex: 'createdDateString',
                            text: 'Created Date'
                        },
                        {
                            xtype: 'gridcolumn',
                            width: 133,
                            dataIndex: 'lastLoginDateString',
                            text: 'Last Login'
                        }
                    ],
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'top',
                            items: [
                                {
                                    xtype: 'button',
                                    itemId: 'createBtn',
                                    text: 'New'
                                },
                                {
                                    xtype: 'tbseparator'
                                },
                                {
                                    xtype: 'textfield',
                                    itemId: 'mytextfield',
                                    fieldLabel: 'Filtering',
                                    name: 'SearchTextField',
                                    emptyText: 'User ID'
                                }
                            ]
                        },
                        {
                            xtype: 'toolbar',
                            dock: 'bottom',
                            items: [
                                {
                                    xtype: 'pagingtoolbar',
                                    width: 1099,
                                    displayInfo: true,
                                    store: 'UserStore'
                                }
                            ]
                        }
                    ],
                    listeners: {
                        itemcontextmenu: {
                            fn: me.onGridpanelItemContextMenu,
                            scope: me
                        }
                    }
                },
                {
                    xtype: 'gridpanel',
                    height: 349,
                    margin: '5 0 0 0 ',
                    title: 'User Role',
                    forceFit: true,
                    store: 'UserRoleStore',
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'name',
                            text: 'Name'
                        },
                        {
                            xtype: 'gridcolumn',
                            width: 133,
                            dataIndex: 'userCount',
                            text: 'User Count'
                        }
                    ],
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'bottom',
                            items: [
                                {
                                    xtype: 'pagingtoolbar',
                                    width: 1099,
                                    displayInfo: true,
                                    store: 'UserRoleStore'
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    },

    onGridpanelItemContextMenu: function(dataview, record, item, index, e, eOpts) {
        var mnuContext = Ext.create("Ext.menu.Menu",{

            items: [{
                id: 'edit-user',
                text: 'Edit'
            },
            {
                id: 'delete-user',
                text: 'Delete'
            }
                   ],
            listeners: {

                click: function( _menu, _item, _e, _eOpts ) {
                   switch (_item.id) {
                        case 'edit-user':
                           webapp.app.getController("UserController").showUserWindow("edit", record.get("id"));
                            break;
                        case 'delete-user':
                            webapp.app.getController("UserController").deleteUser(record.get("id"));
                            break;
                        default:
                            break;
                   }
                },
                hide:function(menu){
                    menu.destroy();
                }
            },
            defaults: {
               clickHideDelay: 1
            }
        });

        mnuContext.showAt(e.getXY());
        e.stopEvent();

    }

});