console.log("STARTING APP YO!");

window.App = new Backbone.Marionette.Application();

App.addRegions({
  articleRegion: '#article-region'
});

var theModel = Backbone.Model.extend({});

var TheCollection = Backbone.Collection.extend({
    model: theModel,
});

var ItemView = Backbone.Marionette.ItemView.extend({
    initialize: function() {
        //For Debugging Purposes:
        //console.log('this.model =',this.model);
        //console.log(this);
    },
    template: '#article-template',
    tagName: 'li',
    className: 'list-item'
});

var ListView = Backbone.Marionette.CompositeView.extend({
	tagName: 'div',
	className: 'js-list-container',
	template: '#article-list-tempate',
	childViewContainer: 'ul',
	childView: ItemView
});



var dataArray = [
    {"title":"Article1"},
    {"title":"Article2"},
    {"title":"Article3"}
];

var theCollection = new TheCollection(dataArray);
var listView = new ListView({collection: theCollection});

App.articleRegion.show(listView);

App.start();


/*
google.load("feeds", "1");

    function initialize() {
      var feed = new google.feeds.Feed("http://www.stuyspec.com/feed");
      feed.load(function(result) {
        if (!result.error) {
          var container = document.getElementById("feed");
          for (var i = 0; i < result.feed.entries.length; i++) {
            var entry = result.feed.entries[i];
            var div = document.createElement("div");
            div.appendChild(document.createTextNode(entry.title));
            container.appendChild(div);
          }
        }
      });
    }
    google.setOnLoadCallback(initialize);
*/
