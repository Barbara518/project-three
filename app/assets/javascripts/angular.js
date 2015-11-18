var app = angular.module('travelApp', ['ngRoute', 'ngMap']);

///////////////////////////////////////////////////////////////////////
/////////////////// NOTE: Routes Controller///////////////////////
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

///////////////////////////////////////////////////////////////////////
/////////////////// NOTE: User Controller///////////////////////
/////////////////////////////////////////////////////////////////////

app.controller('SessionController', ['$http', '$scope', '$location', '$window',
function($http, $scope, $location, $window) {
  var controller = this;

  $http.get('/amiloggedin').success(function (data){
    controller.current_user = data;
  });

  this.deleteSession = function () {
    // console.log(controller)
    // console.log("logging out user")
    $http.delete('/session', {
      //include authenticity_token
    }).success(function(data){
      // console.log("logged off!!!")
      //refresh transgression data once PATCH is complete
      // controller.getArticles();
      $window.location.href = "/";
    })
  }
}])

////////////////////////////////////////////////////////////////
/////////////////// NOTE: Map Controller///////////////////////
///////////////////////////////////////////////////////////////

app.controller('MapController', ['$http', '$scope', '$location', '$window',
function($http, $scope, $location, $window) {         }])

var locations = []
var markers = []
var infoWindows = []


///////////////////////////////////////////////////////////////////////
/////////////////// NOTE: Articles Controller///////////////////////
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
      scrollwheel:false,
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
      controller.markers = []

      var mapOptions = {
        zoom: 3,
        scrollwheel:false,
        center: new google.maps.LatLng(40.74, -74.18),
        mapTypeId: google.maps.MapTypeId.TERRAIN
      }

      var map = new google.maps.Map(document.getElementById('bigMap'), mapOptions);

      angular.forEach(data.articles, function (value) {
        var marker = new google.maps.Marker({
          map: map,
          position: new google.maps.LatLng(value.latitude, value.longitude),
          animation: "DROP"
        });

        var contentString =   '<div >' +'<div id="siteNotice"></div>'+
        '<h1 id="firstHeading" class="firstHeading">'+ value.username + '</h1>' +
        '<div id="bodyContent">' +
        '<p><b>'+value.location+'</b></p></br>' +
        '<p>'+value.body+'</p>' +
        '<p></p>' +
        '</div>' +
        '</div>'

        var infowindow = new google.maps.InfoWindow({
          content: contentString
        });
        marker.addListener('click', function() {
          infowindow.open(map, marker);
        });
      })
    });
  }

  this.createArticle = function () {
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

    $http.patch('/articles/'+ article.id, {
      article: {
        location: article.location,
        latitude: article.latitude,
        longitude: article.longitude,
        body: article.body,
        date_traveled: article.date_traveled
      }
    }).success(function(data){
      controller.getArticles();
    });
  }

  this.deleteArticle = function (article) {
    console.log(article)

    $http.delete('/articles/'+ article.id, {

      //include authenticity_token
    }).success(function(data){
      controller.getArticles()
    }).error(function(data, status) {
      controller.getArticles()
    });
  }
  this.getArticles()
}]);

////////////////////////////////////////////////////////////////////
/////////////////// NOTE: Comment Controller///////////////////////
///////////////////////////////////////////////////////////////////

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
      // console.log("added!!!")
      $scope.$parent.articleCtrl.getArticles();

    }).error(function (err){
      console.log("BLANK comment")
    });
  }
}]);
