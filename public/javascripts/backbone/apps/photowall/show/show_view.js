Pixlee.module('PhotowallApp.Show', function(Show, App, Backbone, Marionette, $, _) {
	//This is the layout 
  // remove this for custom view...
    Show.PhotowallLayout = Marionette.Layout.extend({
        template: 'photowall_layout',
        regions:{
            photos_region:"#photos_region",
            pagination_region:"#pagination_region"
        }
    });

    Show.PhotoView = Backbone.View.extend({
      className: 'photo',
      initialize: function(options){
        this.photoIndex = options.photoIndex;
      },
      setTransform: function(){
        var width = window.innerWidth;
        var imagesPerRow = Math.floor(width / 300);
        var padding = (width % 300)/2;
        var string = 'translate3d('+ (padding + (300 * (this.photoIndex % imagesPerRow))) +'px,'+ (300 * Math.floor(this.photoIndex/imagesPerRow)) +'px, 0)';
        this.$el.css('-webkit-transform', string);
      },
      render: function(){
        this.$el.css('background-image', 'url("' + this.model.get('medium_url') + '")');
        this.setTransform();
        return this.$el;
      }
    });

    // Show.PhotosCollectionView = Marionette.CollectionView.extend({
    //   itemView: Show.PhotoView
    // });
    Show.PhotosCollectionView = Backbone.View.extend({
      initialize: function(){
        this.listenTo(this.collection, 'add', this.addPhoto);
        $(window).on('resize', _.throttle(this.resetPositions.bind(this), 500));
      },
      subViews:[],
      resetPositions: function(){
        console.log('resetPositions');
        this.subViews.forEach(function(subView){
          subView.setTransform();
        });
        var imagesPerRow = Math.floor(window.innerWidth / 300);
        this.$el.css('height', 300*Math.ceil(this.collection.length / imagesPerRow));
      },
      addPhoto: function(model){
        var subView = new Show.PhotoView({model: model, photoIndex: this.collection.indexOf(model)});
        this.subViews.push(subView);
        this.$el.append(subView.render());
        var imagesPerRow = Math.floor(window.innerWidth / 300);
        this.$el.css('height', 300*Math.ceil(this.collection.length / imagesPerRow));
      },
      render: function(){
        //var str = "";
        this.collection.each(this.addPhoto);
        //this.$el.html(str);
        return this.$el;
      }
    });
});
