console.log("LETS GO");

var App = new Marionette.Application();

App.addRegions({
  articleRegion: '#article-region'
});

App.on("start", function(){
  console.log("in Start block");

  var listView = new App.ListView({collection:data});
  App.articleRegion.show(listView);

  Backbone.history.start();

});

// var article = Backbone.Model.extend({});
//
// var articles = Backbone.Collection.extend({
//     model: article,
// });

App.ItemView = Backbone.Marionette.ItemView.extend({
    initialize: function() {
        //For Debugging Purposes:
        //console.log('this.model =',this.model);
        //console.log(this);
    },
    template: '#article-template',
    tagName: 'li',
    className: 'table-view-cell',
    modelEvents : {
				"change" : function() { this.render(); }
		}
});

App.ListView = Backbone.Marionette.CompositeView.extend({
	tagName: 'div',
	className: 'js-list-container',
	template: '#article-list-tempate',
	childViewContainer: 'ul',
	childView: App.ItemView,
  modelEvents : {
      "change" : function() { this.render(); }
  }
});

var myController = Marionette.Controller.extend({
  default : function(){
    var compview = new App.CompView({model:article,collection:data});
    App.firstRegion.show(compview);
  }
});

var Article = Backbone.Model.extend();

var Articles = Backbone.Collection.extend({
		model:Article
});


// var test = new Article({"title":"Test Article","comments":'69',"author":'Your Mom', "date":'Apr 25, 2015'});
var data = new Articles([]);
//data.push(test);

App.start();


// Google Feeds Attempt... Weird 4 entry limit per call
// google.load("feeds", "1"); //Load Feeds API
// function parseFeeds() {
//   var specFeed = new google.feeds.Feed("http://www.stuyspec.com/feed");
//   specFeed.load(function(result) {
//     if (!result.error) {
//       console.log(result.feed.entries.length);
//       for (var i = 0; i < result.feed.entries.length; i++) {
//         var entry = result.feed.entries[i];
//         var t = entry.title;
//         var d = new Date(entry.publishedDate).toDateString().substr(4);
//         var a = entry.author;
//         var cs = entry.contentSnippet;
//         data.push(new Article({"title":t,"comments":4,"author":a,"date":d}));
//           };
//         }
//       });
//     }
//     google.setOnLoadCallback(parseFeeds);


google.load("feeds", "1");
google.setOnLoadCallback(parseFeeds);

function parseFeeds() {
  var feed = new google.feeds.Feed("http://www.stuyspec.com/feed/");
	  feed.setNumEntries(10);
    feed.load(function(result) {
      if (!result.error) {
        for (var i = 0; i < result.feed.entries.length; i++) {
          var entry = result.feed.entries[i];
          var t = entry.title;
          var d = new Date(entry.publishedDate).toDateString().substr(4);
          var a = entry.author;
          var cs = entry.contentSnippet;
          data.push(new Article({"title":t,"comments":"?","author":a,"date":d,"contentSnippet":cs}));
        }
      }
    });
  };
