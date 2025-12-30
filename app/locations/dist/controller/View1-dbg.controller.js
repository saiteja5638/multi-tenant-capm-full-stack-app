sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";
    var that;
    return Controller.extend("locations.controller.View1", {
        onInit: function () {
            that = this;

            if (!that.create) {
                that.create = sap.ui.xmlfragment("locations.view.createlocation", that);
            }
            that.callData();
        },
        callData: async function () {
            try {
                const response = await fetch("/odata/v4/catalog/LOCATION", {
                    method: "GET",
                    headers: { "Accept": "application/json" },
                    credentials: "include"
                });

                if (!response.ok) {
                    throw new Error(`HTTP error ${response.status}`);
                }

                const data = await response.json();


                let oModel = new sap.ui.model.json.JSONModel({
                    items: data.value
                })

                that.byId("_IDGenTable").setModel(oModel)

            } catch (err) {
                console.error("Fetch failed:", err);
            }
        },
        onOpenLocation: function () {
            that.create.open()
        },
        onCloseLocation: function () {
            that.create.close()
        },
        onCreateLocation: async function () {
            const newLocation = {
                LOCATION_ID: sap.ui.getCore().byId("inputLocationId").getValue(),
                LOCATION_DESC: sap.ui.getCore().byId("inputLocationDesc").getValue(),
                LOCATION_TYPE: sap.ui.getCore().byId("inputLocationType").getValue(),
                LATITUDE: parseFloat(sap.ui.getCore().byId("inputLatitude").getValue()),
                LONGITUTE: parseFloat(sap.ui.getCore().byId("inputLongitude").getValue())
            };

            try {

                const tokenResponse = await fetch("/odata/v4/catalog/LOCATION", {
                    method: "GET",
                    headers: { "X-CSRF-Token": "Fetch" },
                    credentials: "include"
                });
                const csrfToken = tokenResponse.headers.get("x-csrf-token");

                const response = await fetch("/odata/v4/catalog/LOCATION", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRF-Token": csrfToken
                    },
                    body: JSON.stringify(newLocation),
                    credentials: "include"
                });
                that.create.close()
                that.callData();
            } catch (err) {
                console.error('Error adding location:', err);
                that.create.close()
                alert('Failed to add location. Check console for details.');
            }
        }
    });
});