var app = angular.module('travelApp', []);


///////////////////////////////////////////////////////////////////////
//////////////////////////Article Controller//////////////////////////
/////////////////////////////////////////////////////////////////////
app.controller('ArticlesController', ['$http', function($http) {
  var controller = this;

  /// Get Current User from /amiloggedin
  $http.get('/amiloggedin').success(function (data){
    controller.current_user = data;
  });

  //// Get articles
    $http.get('/articles/all_articles').success(function(data) {
      controller.articles = data.articles
    });

  this.createArticle = function () {
    $http.post('/articles', {
      article: controller.newArticle
    }).success(function(data){
      controller.newArticle = {};
    })

  }

}]);



///////////////////////////////////////////////////////////////////////
//////////////////////////Comment Controller//////////////////////////
/////////////////////////////////////////////////////////////////////
​
app.controller('CommentsController', ['$http', function($http) {
  var controller = this;
​
  // Get current_user from amiloggedin
  $http.get('/amiloggedin').success(function (data){
    controller.current_user = data;
    // Create Comment Will post the comment
    this.createComment = $http.post('/articles/:id/comment')
    .success(function(data) {
      controller.newComment = {};
       console.log(data);
    })
  })
}]);
