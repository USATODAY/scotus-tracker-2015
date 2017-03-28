define(
  [
    'jquery',
    'underscore',
    'backbone',
    'models/justices'
  ],
  function(jQuery, _, Backbone, justices) {

    var hostname = window.location.hostname;

    var dataURL;

    if ((hostname == "localhost" || hostname == "10.0.2.2")) {
        dataURL = 'data/data.json';
    } else {


        dataURL = "http://" + hostname + "/services/webproxy/?url=https://www.gannett-cdn.com/experiments/usatoday/2015/06/scotus-tracker-2015/data/data.json";

    }

    return {
        data: null,
        getData: function() {
            var _this = this;
            jQuery.getJSON(dataURL, function(data) {        
                
                //parse raw data from JSON
                _this.data = _this.parseData(data);

                // trigger the dataReady Backbone event which kicks off the app
                Backbone.trigger("dataReady", this);

            });
        },
        parseData: function(data) {
            var parsedCases = [];
            var _this = this;
            _.each(data.cases, function(caseObj) {

                caseObj.default_share_language = data.share_language;   
                parsedCases.push(caseObj);
            });
            data.cases = parsedCases;
            return data;
        },
        slugify: function(text) {
            return text.toString().toLowerCase()
                .replace(/\s+/g, '-')           // Replace spaces with -
                .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
                .replace(/\-\-+/g, '-')         // Replace multiple - with single -
                .replace(/^-+/, '')             // Trim - from start of text
                .replace(/-+$/, '');            // Trim - from end of text
        }
    };


});
