Properties = new Meteor.Collection('properties');

if (Meteor.isClient) {


    Template.ifEven.isEven = function(value) {
        return (value % 2) === 0;
    }

    UI.registerHelper('maybeDiv', function() {
        // extract boolean value from data context. the data context is
        // always an object -- in this case it's a wrapped boolean object.
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean
        var isBlock = this.valueOf();

        if (isBlock)
            return Template._maybeDiv_wrapInDiv;
        else
            return Template._maybeDiv_noop;
    });


    UI.registerHelper('mayNotBeDiv', function() {
        var isBlock = this.inDiv;

        if (isBlock)
            return Template._maybeDiv_wrapInDiv;
        else
            return Template._maybeDiv_noop;
    });

    Template.propertiesListing.input = function() {
      if(this.tmpl){
        return Template[this.tmpl];
      }
    };  

    Template.propertiesListing.properties = function(){
      return Properties.find();
    }
}

if (Meteor.isServer) {
    Meteor.startup(function() {
        if (Properties.find().count() === 0) {
            var errCallback = function(err, result) {
                if (err) {
                    console.log("Error " + err.message);
                } else {
                    console.log("Success " + result);
                }
            };
            for (var i = properties.length - 1; i >= 0; i--) {
                Properties.insert(properties[i], errCallback);
            };
        }
    });
}
