Pixlee.module('PhotowallApp.Show', function(Show, App, Backbone, Marionette, $, _) {
    Show.Controller = Marionette.Controller.extend({
        initialize: function(options) {
            var _this = this;
            var region = options.region;
            //Get the photos Entities
            var photos = App.photos;
            //Instantiate the view and pass parameter to it
            this.view = this.getPhotowallView({
                collection:photos
            });

            
            //Show the view on the region passsed as an options
            
            //Example of event handling
            this.listenTo(this.view,"show",function(){
                this.photosCollectionView = this.getPhotosCollectionView({
                    collection:photos
                });
                this.photosCollectionView.render();
                //console.log("COLL VIEW:", this.view);
                this.view.$el.find('#photos_regions').html(this.photosCollectionView.el);
                //this.view["photos_region"].show(this.photosCollectionView.el);
            },this);

            region.show(this.view);
        },
        getPhotowallView: function(options) {
            return new Show.PhotowallLayout(options);
        },
        getPhotosCollectionView : function(options){
            return (new Show.PhotosCollectionView(options));       
        }
    });
});