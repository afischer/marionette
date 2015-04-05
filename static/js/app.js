/**
 *  Spec app javascript copyright Andrew Fischer
 */
console.log("LETS GO");

//// BACKBONE.MARIONETTE ////
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

// ItemView for each of the articles
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

// CompositeView to hold all of the Items.
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

App.ArticleView = Backbone.Marionette.LayoutView.extend({
  template: "#content-template",
  regions: {
    content: "#content"
    //comments: "#comments"
  }
});

var Article = Backbone.Model.extend();
var Articles = Backbone.Collection.extend({
		model:Article
});


var data = new Articles([]);
// var test = new Article({"title":"Test Article","comments":'69',"author":'Your Mom', "date":'Apr 25, 2015'});
//data.push(test);


// Controllers, etc
var MyController = Marionette.Controller.extend({
  makeHome: function() {
    var listView = new App.ListView({model:article,collection:data});
    App.articleRegion.show(listView);
  },
  makeArticle: function(id) {
    console.log("Making Article!!");
    var articleView = new App.ArticleView({model:data[id]});
    articleView.render();
    App.articleRegion.show(articleView);
  }
});


App.controller = new MyController();

// Routers
App.router = new Marionette.AppRouter({
		controller : App.controller,
		appRoutes : {
				default  :  "makeHome",     //  /#
				"articles" :  "makeArticle",   //  /#articles
        "articles/:id" : "makeArticle" // /#articles/0,1,2...

		}
});



App.start();


//// GOOGLE.FEEDS API ////
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
          var cats = entry.categories;
          var content = entry.content;
          //console.log(cats);
          //console.log(entry);
          data.push(new Article({"title":t,
                                 "comments":"?",
                                 "author":a,
                                 "date":d,
                                 "contentSnippet":cs,
                                 "content":content,
                                 "id": i
                               })
                             );
        }
      }
    });
  };
