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
    when('/Articles', {
      templateUrl:'/templates/index.html',
      controller: 'ArticlesController',
      controllerAs: 'articleCtrl'
    }).
    when('/Articles/new', {
      templateUrl: '/templates/new.html',
      controller: 'ArticlesController',
      controllerAs: 'articleCtrl'
    }).
    when('/Articles/:id', {
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

///////////////////////////////////////////////////////////////////////
//////////////////////////Article Controller//////////////////////////
/////////////////////////////////////////////////////////////////////
app.controller('ArticlesController', ['$http', function($http) {
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
    });
  }

  this.createArticle = function () {
    console.log("In createArticle")
    $http.post('/articles', {
      article: controller.newArticle
    }).success(function(data){
      controller.newArticle = {};
      console.log(data);
    })

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
  console.log(authenticity_token)
    //// Create Comment
  this.createComment = function () {

    $http.get('/amiloggedin').success(function (data){
      current_user = data;
    });

  // setTimeout(a, 4000)
  //   var a =  function(){
  //       console.log(current_user)
  //     };

    $http.post('/article/'+ $scope.$parent.article.id+'/comments', {
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
