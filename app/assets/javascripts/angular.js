var app = angular.module('travelApp', ['ngRoute', 'ngMap']);

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

//////////////////////////Map Controller//////////////////////////
/////////////////////////////////////////////////////////////////////


//////////////////////////User Controller//////////////////////////
/////////////////////////////////////////////////////////////////////

app.controller('SessionController', ['$http', '$scope', '$location', '$window',
function($http, $scope, $location, $window) {
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
      $window.location.href = "/";
    })
  }

}])


//////////////////////////Map Controller//////////////////////////
/////////////////////////////////////////////////////////////////////

app.controller('MapController', ['$http', '$scope', '$location', '$window',
function($http, $scope, $location, $window) {



}])


var locations = []
///////////////////////////////////////////////////////////////////////
//////////////////////////Article Controller//////////////////////////
/////////////////////////////////////////////////////////////////////
app.controller('ArticlesController', ['$http', '$scope', '$location', function($http, $scope, $location) {
  var controller = this;

  var lat;
  var lng;
  var location;


  $scope.findLocation = function () {
      $scope.place = this.getPlace();
       var dest = $scope.place
       location = dest.formatted_address;
       lat = dest.geometry.location.lat();
       lng = dest.geometry.location.lng();
       locations.push({
         name: location,
         lat: lat,
         lng: lng }
       )
       var mapOptions = {
                 zoom: 4,
                 center: new google.maps.LatLng(lat,lng),
                 mapTypeId: google.maps.MapTypeId.TERRAIN
             }
       $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

       var marker = new google.maps.Marker({
                  map: $scope.map,
                  position: new google.maps.LatLng(lat, lng),
                  animation: "DROP"
              });


};

  /// Get Current User from /amiloggedin
  $http.get('/amiloggedin').success(function (data){
    controller.current_user = data;
  });

  //// Get articles
  this.getArticles = function () {
    $http.get('/articles/all_articles').success(function(data) {
      controller.articles = data.articles
      controller.user = data.user
      controller.dests = []

      angular.forEach(data.articles, function (value) {
        controller.dests.push({lat: value.latitude, lng: value.longitude});
      })

      console.log(controller.dests)
    });
  }

  this.createArticle = function () {
    console.log("In createArticle")
    $http.post('/articles', {
      article: {
        body: controller.newArticle.body,
        date_traveled: controller.newArticle.date_traveled,
        location: location,
        latitude: lat,
        longitude: lng
      }
    }).success(function(data){
      controller.newArticle = {};
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
