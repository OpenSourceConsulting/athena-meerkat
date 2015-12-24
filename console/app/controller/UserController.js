/*
 * File: app/controller/UserController.js
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

Ext.define('webapp.controller.UserController', {
    extend: 'Ext.app.Controller',
    alias: 'controller.UserController',

    onNewUserButtonClick: function(button, e, eOpts) {
        this.showUserWindow("new", 0);
    },

    onContainerActivate: function(component, eOpts) {
        Ext.getStore("UserStore").load();
        Ext.getStore("UserRoleStore").load();
    },

    onSubmitButtonClick: function(button, e, eOpts) {
        var form = Ext.getCmp("userForm");			// user form
        var formWindow = Ext.getCmp('UserWindow');	// Add user window

        var userName = form.getForm().findField("UserIDTextField");
        var password = form.getForm().findField("PasswordTextField");
        var retypePassword = form.getForm().findField("RetypePasswordTextField");
        var fullName = form.getForm().findField("FullNameTextField");
        var email = form.getForm().findField("EmailTextField");
        var userRole = form.getForm().findField("UserRoleDropdownList");
        var _id = form.getForm().findField("IDHiddenField");

        var userNameVal = userName.getValue().trim();
        var passwordVal = password.getValue().trim();
        var retypePasswordVal = retypePassword.getValue().trim();
        var fullNameVal = fullName.getValue().trim();
        var emailVal = email.getValue().trim();
        var userRoleVal = userRole.getValue();
        var _idVal = _id.getValue();

        if (!this.validate(userNameVal, passwordVal, retypePasswordVal, fullNameVal, emailVal, userRoleVal)) {
            return;
        }

        //submit new user request
        if (_idVal === "") {
            _idVal = 0;

        }

        this.save({"id" : _idVal, "userName" : userNameVal,"password" : passwordVal, "fullName" : fullNameVal, "email":emailVal, "userRole":userRoleVal});



    },

    onTextfieldChange: function(field, newValue, oldValue, eOpts) {
        var store = Ext.getStore("UserStore");
        var url = GlobalData.urlPrefix + "user/search";
        Ext.Ajax.request({
             url: url,
            params: {"userID":newValue},
             success: function(resp, ops) {

                    var response = Ext.decode(resp.responseText);
                    Ext.getStore("UserStore").loadData(response, false);
             }
            });
    },

    showUserWindow: function(type, user_id) {

        var userWindow = Ext.create("widget.UserWindow");
        var submitButton = Ext.getCmp("btnSubmit");
        if (type === "edit"){
            userWindow.setTitle("Edit User");
            submitButton.setText("Save");
            var form = Ext.getCmp("userForm");			// user form

            var userName = form.getForm().findField("UserIDTextField");
            var fullName = form.getForm().findField("FullNameTextField");
            var email = form.getForm().findField("EmailTextField");
            var userRole = form.getForm().findField("UserRoleDropdownList");
            var _id = form.getForm().findField("IDHiddenField");
            //load data to user form

             Ext.Ajax.request({
                    url: GlobalData.urlPrefix + "user/edit",
                    params: {"id":user_id},
                    success: function(resp, ops) {
                        var response = Ext.decode(resp.responseText);
                        userName.setValue(response.userName);
                        fullName.setValue(response.fullName);
                        email.setValue(response.email);
                        userRole.setValue(response.userRole.id);
                        _id.setValue(user_id);
                    }
                });

        }

        userWindow.show();
    },

    validate: function(userName, password, retype_password, fullName, email, userRole) {
        if (password !== retype_password){
            Ext.Msg.show({
                title: "Message",
                msg: "Password and Retype password are not match.",
                buttons: Ext.Msg.OK,
                fn: function(choice) {
                    password.focus();
                },
                icon: Ext.Msg.WARNING
            });
            return false;
        }

        if (userName === "" || password === "" || retype_password === ""||fullName === "" ||email === ""||userRole < 0){
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
        var url = GlobalData.urlPrefix + "user/save";
        var userWindow = Ext.getCmp('UserWindow');	// Add user window
        Ext.Ajax.request({
             url: url,
             params: params,
             success: function(resp, ops) {

                    var response = Ext.decode(resp.responseText);
                    if(response===true){
                        Ext.getStore("UserStore").reload();
                        userWindow.close();
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

    deleteUser: function(id) {
         Ext.MessageBox.confirm('Confirm', 'Are you sure you want to delete this user?', function(btn){

             if(btn == "yes"){
                Ext.Ajax.request({
                    url: GlobalData.urlPrefix+ "/user/delete",
                    params: {"id":id},
                    success: function(resp, ops) {

                        var response = Ext.decode(resp.responseText);
                        if(response===true){
                            Ext.getStore("UserStore").reload();
                        }
                        else {
                            Ext.Msg.show({
                                title: "Message",
                                msg: "User is not existed",
                                buttons: Ext.Msg.OK,
                                icon: Ext.Msg.WARNING
                            });
                        }

                    }
                });


             }
         });
    },

    init: function(application) {
        this.control({
            "#createBtn": {
                click: this.onNewUserButtonClick
            },
            "#mycontainer38": {
                activate: this.onContainerActivate
            },
            "#btnSubmit": {
                click: this.onSubmitButtonClick
            },
            "#mytextfield": {
                change: this.onTextfieldChange
            }
        });
    }

});
