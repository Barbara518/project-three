var app = angular.module('travelApp', []);


///////////////////////////////////////////////////////////////////////
//////////////////////////Article Controller//////////////////////////
/////////////////////////////////////////////////////////////////////
app.controller('ArticlesController', ['$http', function($http) {
  var controller = this;
  controller.current_user = "bar"
  console.log(controller);

  /// Get Current User from /amiloggedin
  $http.get('/amiloggedin').success(function (data){
    controller.current_user = data;
  });

  //// Get articles
  this.getArticles = function() {

    $http.get('/articles').success(function(data) {
      controller.articles = data.articles
    });

  };
  this.getArticles();

  this.createArticle = function () {
    console.log("In createArticle")
    $http.post('/articles', {
      article: controller.newArticle
    }).success(function(data){
      controller.newArticle = {};
      console.log(data);
    })

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
