define(
    [
        'require',
        'jquery',
        'underscore',
        'backbone',
        'dataManager',
        'views/AppView',
        'templates'
    ],
    function(require, jQuery, _, Backbone, dataManager, AppView, templates) {
        return {
            init: function() {

                    //Initialize main appView
                    var appView = new AppView({
                        el: ".iapp-wrap"
                    });

                    //Make data request
                    dataManager.getData();
                    var $transitionWrap = jQuery('.transition-wrap');
                    $transitionWrap.height($transitionWrap.parent().height());

                    jQuery(window).resize(function() {
                        //set transition wrap height to the height of parent to fix Chrome bug.
                        $transitionWrap.height($transitionWrap.parent().height());
                        Backbone.trigger("window:resize");
                    });

                    if(window.Modernizr !== undefined && window.innerWidth <=1100) {
                        if (Modernizr.touch) {
                            $('.iapp-wrap').addClass('tablet');
                        }
                    }
            }
        };
    });
