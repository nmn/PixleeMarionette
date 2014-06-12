Pixlee.module('Entities', function(Entities, App, Backbone, Marionette, $, _) {
    var _this = this,
        API, _API;
    API = {
        getPhotosCollection: function(bootstrap, options) {
            return new Entities.Photos(bootstrap || [], options || {});
        }
    };
    //You can add your custom work on the collection in Here,
    //e.g preloading the next 20 images
    // Paginate the list
    Entities.Photo = Backbone.Model.extend({

    });
    Entities.Photos = Backbone.Collection.extend({
        initialize: function(){
            this.getMorePhotos();
            $(window).on('scroll', function(){
                var scrollTop = $(window).scrollTop();
                var height = window.innerHeight;
                var total = $(document).height();
                if(scrollTop > total - height*1.01 && !this.loading) {
                    this.getMorePhotos();
                }
            }.bind(this));
        },
        loading: false,
        getMorePhotos: function(){
            this.loading = true;
            $.get('/photos/' + this.length + '/20', function(photos){
                this.add(photos);
                this.loading = false;
            }.bind(this));
        },
        model: Entities.Photo
    });
    App.reqres.setHandlers({
        'get:photos': function(bootstrap, options) {
            // fixed typo. Pass arguments directly, not an object
            return API.getPhotosCollection(bootstrap, options);
        }
    });
});