define(
  [
    'jquery',
    'underscore',
    'backbone',
    'dataManager',
    'router',
    'templates',
    'api/analytics'
  ],
  function(jQuery, _, Backbone, dataManager, router, templates, Analytics) {

    return Backbone.View.extend({
        initialize: function() {
            var status = this.model.get("status");
            if (status == "decided") {
                this.template = templates["decidedcase.html"];
            } else if(status == "argued"){
                this.template = templates["undecidedcase.html"];
            } else if (status == "granted"){
                this.template = templates["not-argued-case.html"];
            } else if (status == "divided"){
                this.template = templates["divided-case.html"];
            } else {
                this.template = templates["not-granted-case.html"];
            }
            this.render();
        },
        events: {
            'click .iapp-case-next-button': "onNextClick",
            'click .iapp-case-previous-button': "onPreviousClick",
            'click .iapp-share-popup': 'onShareButtonClick'
        },
        className: 'iapp-panel iapp-case-panel upcoming',
        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
        onNextClick: function() {
            Backbone.trigger("app:goForward");
        },
        onPreviousClick: function() {
            Backbone.trigger("app:goBack");
        },
        onShareButtonClick: function(e) {
            Analytics.trackEvent('Case share clicked');
            e.preventDefault();
            this.windowPopup(e.currentTarget.href, 500, 300);
        },
        windowPopup: function(url, width, height) {
            // Calculate the position of the popup so
            // it’s centered on the screen.
            var left = (screen.width / 2) - (width / 2),
            top = (screen.height / 2) - (height / 2);

            window.open(
                url,
                "",
                "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,width=" + width + ",height=" + height + ",top=" + top + ",left=" + left
            );
        }
    });
});
