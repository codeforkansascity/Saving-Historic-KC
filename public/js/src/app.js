(function(){

  angular.module('historic', ['ngResource','ui.bootstrap', 'ngRoute', 'historic.global','ui.router','ngAnimate'])

  angular.module('historic').run(function ($rootScope, $window, $q, $http, $location, $timeout,  $state) {

    $rootScope.$on('$stateChangeStart', function (event, toState, fromState, fromParams) {
      if(toState.name != ('login')){
        $rootScope.previousRoute = toState.name;
      }
    });

    $rootScope.$on('$stateChangeSuccess', function (event, toState, fromState, fromParams) {
    });

    $rootScope.$on('$stateChangeError', function (event, toState, fromState, fromParams) {
      $state.go('404');
    });

  });

  // Setting HTML5 Location Mode
  angular.module('historic').config(function($locationProvider) {
      $locationProvider.html5Mode({
        enabled:true,
        requireBase:false
      });
  });


})();//IIFE