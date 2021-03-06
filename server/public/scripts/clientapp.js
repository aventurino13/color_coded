var myApp = angular.module('myApp', ['ngRoute', 'angular-content-editable','xeditable', 'ui.bootstrap', 'ngAnimate', 'ngSanitize']);

myApp.config(function($routeProvider, $locationProvider){
  $routeProvider.when('/', {
    templateUrl: '/views/login.html',
    controller: "LoginController as lc",
  }).when('/register', {
    templateUrl: '/views/register.html',
    controller: "LoginController as lc"
  }).when('/home', {
    templateUrl:'views/home.html',
    controller: 'UserController as uc'
  }).when('/add', {
    templateUrl: 'views/add.html',
    controller: 'UserController as uc'
  }).when('/arch', {
    templateUrl: 'views/arch.html',
    controller: 'viewsController as uc'
  }).when('/dsgn', {
    templateUrl: 'views/dsgn.html',
    controller: 'viewsController as uc'
  }).when('/art', {
    templateUrl: 'views/art.html',
    controller: 'viewsController as uc'
  }).when('/search', {
    templateUrl: 'views/search.html',
    controller: 'searchController as uc'
  }).otherwise('/');

  $locationProvider.html5Mode(true);


});//end ang-route config

myApp.run(function(editableOptions, editableThemes) {
  // set `default` theme
  editableOptions.theme = 'bs3';

  // overwrite submit button template
  editableThemes['default'].submitTpl = '<button type="submit">ok</button>';
});

// myApp.run(["$templateCache", function($templateCache) {
//   $templateCache.put("/vendors/alert/alert.html",
//     "<div class='alert' ng-class='type && \"alert-\" + type'>\n" +
//     "    <button ng-show='closeable' type='button' class='close' ng-click='close()'>&times;</button>\n" +
//     "    <div ng-transclude></div>\n" +
//     "</div>\n" +
//     "");
// }]);
