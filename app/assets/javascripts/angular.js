var app = angular.module('travelApp', []);


///////////////////////////////////////////////////////////////////////
//////////////////////////Article Controller//////////////////////////
/////////////////////////////////////////////////////////////////////
app.controller('ArticlesController', ['$http', function($http) {
  var controller = this;
  //// Get articles
  this.getArticles = function() {

    $http.get('/articles').success(function(data) {
      controller.articles = data.articles
    });

  }
  this.getArticles();

  this.createArticle = function () {

    $http.post('/new', {
      article: {
        user: //current user,
        body: this.newArticleBody,
        location: //info from google maps api,
        latitude: //info from google maps api,
        longitude: //info from google maps api
      }

    }]);

  }

}]);




///////////////////////////////////////////////////////////////////////
//////////////////////////Comment Controller//////////////////////////
/////////////////////////////////////////////////////////////////////

app.controller('CommentsController', ['$http', function($http) {
  var controller = this;

    //// Create Comment
    this.createComment = $http.post('/articles/:id/comment').success(function(data) {
    //// Will post the comment
  });

}]);
