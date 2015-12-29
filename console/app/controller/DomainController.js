/*
 * File: app/controller/DomainController.js
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

Ext.define('webapp.controller.DomainController', {
    extend: 'Ext.app.Controller',

    onSubmitNewDomainClick: function(button, e, eOpts) {

        var form = Ext.getCmp('domainForm');			// domain form

        var name = form.getForm().findField("domainNameTextField");
        var domainType = form.getForm().findField("DomainType");
        var serverGroup = form.getForm().findField("DatagridServerGroupComboBox");
        var _id = form.getForm().findField("IDHiddenField");

        var nameVal = name.getValue().trim();
        var domainTypeVal = domainType.getValue();
        var serverGroupVal = serverGroup.getValue();
        var _idVal = _id.getValue();

        if (!this.validate(nameVal, domainTypeVal, serverGroupVal)) {
            return;
        }

        //submit new domain request
        if (_idVal === "") {
            _idVal = 0;

        }

        this.save({"id" : _idVal, "name" : nameVal,"isClustering" : domainTypeVal, "datagridServerGroupId" : serverGroupVal});

    },

    showDomainWindow: function(type, id) {

        var domainWindow = Ext.create("widget.DomainWindow");
        var submitButton = Ext.getCmp("btnSubmitNewDomain");
        //load server group list
        Ext.getStore("DatagridServerGroupStore").load();

        if (type === "edit"){
            domainWindow.setTitle("Edit Domain");
            submitButton.setText("Save");
            var form = Ext.getCmp("domainForm");			// domain form

            var name = form.getForm().findField("domainNameTextField");
            var domainTypeClustering = Ext.getCmp("domainTypeClustering");
            var domainTypeNoneClustering = Ext.getCmp("domainTypeNoneClustering");
            var serverGroup = form.getForm().findField("DatagridServerGroupComboBox");
            var _id = form.getForm().findField("IDHiddenField");

            var nameVal = name.getValue().trim();
            var domainTypeVal = domainTypeClustering.getValue();
            var serverGroupVal = serverGroup.getValue();
            var _idVal = _id.getValue();

             Ext.Ajax.request({
                    url: GlobalData.urlPrefix + "domain/edit",
                    params: {"id": id},
                    success: function(resp, ops) {
                        var response = Ext.decode(resp.responseText);
                        name.setValue(response.name);
                        if(response.clustering) {
                            domainTypeClustering.setValue(true);
                            domainTypeNoneClustering.setValue(false);
                        } else{
                            domainTypeClustering.setValue(false);
                            domainTypeNoneClustering.setValue(true);
                        }
                        serverGroup.setValue(response.serverGroup.id);
                        _id.setValue(id);
                    }
                });
        }

        domainWindow.show();
    },

    validate: function(name, groupId) {
        if (name === "" || groupId === 0){
             Ext.Msg.show({
                title: "Message",
                msg: "Invalid data.",
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.WARNING
            });
            return false;
        }
        return true;
    },

    save: function(params) {
        var url = GlobalData.urlPrefix + "domain/save";
        var domainWindow = Ext.getCmp("domainWindow");	// domain window
        Ext.Ajax.request({
             url: url,
             params: params,
             success: function(resp, ops) {

                    var response = Ext.decode(resp.responseText);
                    if(response===true){
                        webapp.app.getController("MenuController").loadDomainList();
                        Ext.getStore("DomainStore").reload();
                        domainWindow.close();
                    }
                    else {
                             Ext.Msg.show({
                                title: "Message",
                                msg: "Invalid information.",
                                buttons: Ext.Msg.OK,
                                icon: Ext.Msg.WARNING
                            });
                    }

                }
            });
    },

    loadDomainInfo: function(domainId) {
        var nameField = Ext.getCmp("domainNameField");
        var tomcatCountField = Ext.getCmp("tomcatInstancesField");
        var domainTypeField  = Ext.getCmp("domainTypeField");
        var dataGridServerGroupField = Ext.getCmp("datagridServerGroupField");

        Ext.Ajax.request({
            url: GlobalData.urlPrefix + "domain/get",
            params: {"id":domainId},
            method:'GET',
            success: function(resp, ops) {
                var response = Ext.decode(resp.responseText);
                nameField.setValue(response.name);
                tomcatCountField.setValue(response.tomcatInstancesCount);
                domainTypeField.setValue(response.clustering===true?"Clustering":"None clustering");
                dataGridServerGroupField.setValue(response.datagridServerGroupName);
            }
        });
    },

    init: function(application) {
        this.control({
            "#btnSubmitNewDomain": {
                click: this.onSubmitNewDomainClick
            }
        });
    }

});
