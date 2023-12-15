sap.ui.define([
    'sap/base/util/deepExtend',
    "sap/ui/core/mvc/Controller",
    "sap/m/ColumnListItem",
    "sap/m/Text",
    "sap/m/Input",
    "sap/m/CheckBox",
    'sap/ui/model/json/JSONModel'
], function (Controller, ColumnListItem, Text, Input, CheckBox, JSONModel, deepExtend) {
    "use strict";
 
    return Controller.extend("project1.controller.View1", {

        onInit: function(evt) {
			this.oModel = new JSONModel(sap.ui.require.toUrl("project1/webapp/model/model.json"));
			this.oTable = this.byId("_IDGenTable2");
			this.getView().setModel(this.oModel);
			this.oReadOnlyTemplate = this.byId("_IDGenTable2").removeItem(0);
			this.rebindTable(this.oReadOnlyTemplate, "Navigation");
			this.oEditableTemplate = new ColumnListItem({
				cells: [
					new Input({
						value: "{ServiceParameter}"
					}), new Input({
						value: "{ParentId}"
					})
				]
			});
		},
        rebindTable: function(oTemplate, sKeyboardMode) {
			this.oTable.bindItems({
				path: "/Product",
				template: oTemplate,
				templateShareable: true,
				key: "ProductId"
			});
		},

		onEdit: function() {
			this.amodel = deepExtend([], this.oModel.getProperty("/Product"));
			this.byId("editButton").setVisible(false);
			this.byId("saveButton").setVisible(true);
			this.byId("cancelButton").setVisible(true);
			this.rebindTable(this.oEditableTemplate, "Edit");
		},

		onSave: function() {
			this.byId("saveButton").setVisible(false);
			this.byId("cancelButton").setVisible(false);
			this.byId("editButton").setVisible(true);
			this.rebindTable(this.oReadOnlyTemplate, "Navigation");
		},

		onCancel: function() {
			this.byId("cancelButton").setVisible(false);
			this.byId("saveButton").setVisible(false);
			this.byId("editButton").setVisible(true);
			this.oModel.setProperty("/Product", this.amodel);
			this.rebindTable(this.oReadOnlyTemplate, "Navigation");
		},

        onCreatePress: function () {
            var oTable = this.getView().byId("_IDGenTable2");
            var oNewRow = new ColumnListItem({
                cells: [
                    new Input({ text: " " }),
                    new Text({ text: " " }),
                    new Input({ width: "30px" }),
                    new CheckBox(),
                    new CheckBox(),
                    new CheckBox(),
                    new CheckBox(),
                    new CheckBox(),
                    new CheckBox(),
                    new CheckBox(),
                    new CheckBox(),
                    new CheckBox(),
                    new CheckBox()
                ]
            });
 
            // Add the new row to the table
            oTable.addItem(oNewRow);
        }
    });
});