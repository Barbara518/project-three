var app = angular.module('travelApp', ['ngRoute']);

///////////////////////////////////////////////////////////////////////
//////////////////////////Routes Controller///////////////////////////
/////////////////////////////////////////////////////////////////////
app.controller('RouteController', ['$http', '$scope', '$route', '$routeParams', '$location',
function($http, $scope, $route, $routeParams, $location) {
  $scope.$route = $route;
  $scope.$location = $location;
  $scope.$routeParams = $routeParams;
}]);

app.config(['$routeProvider', '$locationProvider',
function($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $routeProvider.
    when('/articles', {
      templateUrl:'/templates/index.html',
      controller: 'ArticlesController',
      controllerAs: 'articleCtrl'
    }).
    when('/articles/new', {
      templateUrl: '/templates/new.html',
      controller: 'ArticlesController',
      controllerAs: 'articleCtrl'
    }).
    when('/articles/:id', {
      templateUrl: 'articlesNew.html',
      controller: 'ArticlesController',
      controllerAs: 'articleCtrl'
    });
}]);

//
// app.run(function ($templateCache) {
//   $templateCache.put('articlesIndex.html', 'KDJFKLSJDFKLSDJKLSD');
//   $templateCache.put('articlesNew.html', 'new');
// })

//////////////////////////User Controller//////////////////////////
/////////////////////////////////////////////////////////////////////

app.controller('SessionController', ['$http', '$scope', function($http, $scope) {
  var controller = this;

  $http.get('/amiloggedin').success(function (data){
    controller.current_user = data;
  });

  this.deleteSession = function () {
  console.log(controller)
  console.log("logging out user")
    $http.delete('/session', {
      //include authenticity_token
    }).success(function(data){
      console.log("logged off!!!")
      //refresh transgression data once PATCH is complete
      // controller.getArticles();
    })
  }

}])

///////////////////////////////////////////////////////////////////////
//////////////////////////Article Controller//////////////////////////
/////////////////////////////////////////////////////////////////////
app.controller('ArticlesController', ['$http', '$scope', '$location', function($http, $scope, $location) {
  var controller = this;
  console.log(controller);

  /// Get Current User from /amiloggedin
  $http.get('/amiloggedin').success(function (data){
    controller.current_user = data;
  });

  //// Get articles
  this.getArticles = function () {
    $http.get('/articles/all_articles').success(function(data) {
      controller.articles = data.articles
      controller.user = data.user
      console.log(data.user);
    });
  }

  this.createArticle = function () {
    console.log("In createArticle")
    $http.post('/articles', {
      article: controller.newArticle
    }).success(function(data){
      controller.newArticle = {};
      console.log(data);
      $location.path("/articles");
    })

  }

  this.editArticle = function (article) {
    console.log(this.editedArticle)
    console.log(this.editedArticle.date_traveled, article.date_traveled)

    $http.patch('/articles/'+ article.id, {
      article: {
        location: this.editedArticle.location || article.location,
        latitude: this.editedArticle.latitude || article.latitude,
        longitude: this.editedArticle.longitude || article.longitude,
        body: this.editedArticle.body || article.body,
        date_traveled: this.editedArticle.date_traveled || article.date_traveled
      }
    }).success(function(data){
      console.log("edited!!!")
      //refresh transgression data once PATCH is complete
      controller.getArticles();
    });
  }

  this.deleteArticle = function (article) {
    console.log(article)

    $http.delete('/articles/'+ article.id, {

      //include authenticity_token
    }).success(function(data){
      console.log(data);
      console.log("deleted!!!")
      controller.getArticles()
      //refresh transgression data once PATCH is complete
      // controller.getArticles();
    }).error(function(data, status) {
      controller.getArticles()
    });
  }

  this.getArticles()

}]);



///////////////////////////////////////////////////////////////////////
//////////////////////////Comment Controller//////////////////////////
/////////////////////////////////////////////////////////////////////

app.controller('CommentsController', ['$http', '$scope', function($http, $scope) {
  var authenticity_token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
  var controller = this;
  var current_user;
    //// Create Comment
  this.createComment = function () {

    $http.post('/articles/'+ $scope.$parent.article.id+'/comments', {
      //include authenticity_token
      authenticity_token: authenticity_token,
      comment: {
        body: this.newCommentBody
      }
    }).success(function(data){
      console.log("added!!!")
      //refresh transgression data once POST is complete
      $scope.$parent.articleCtrl.getArticles();
    });
  }

}]);
