(function(){

angular.module('historic.global.controllers', ['historic.global.services']); 

function HomeCtrl($scope, $rootScope, _, $state, $http, ENDPOINTS){
  $http.get(ENDPOINTS.sfApi+'hood', {
    params:{}
  }).then(function(res){
    console.log(res);
    $http.get(ENDPOINTS.sfApi+'hood/kansas-city-palestine').then(function(res){
      console.log(res);
    }, function(res){
      console.log(res);
    })
  }, function(res){
    console.log(res);
  });
  $http.get(ENDPOINTS.sfApi+'building?nrhp.number', {
    params:{
      'nrhp.number':true
    }
  }).then(function(res){
    console.log(res);
  }).catch(function(err){
    console.log(err);
  });
}
angular.module('historic.global.controllers').controller('HomeCtrl',HomeCtrl);


function config ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
    $stateProvider.state('app', {
      'abstract': true,
      resolve: {
        authorize:function(authorization) {
          return authorization.authorize();
        }
      }
    })
    .state('home', {
      url:'/',
      controller:'HomeCtrl',
      templateUrl:'/public/js/src/global/views/home.html',
    })
  }
  angular.module('historic').config(config);

  })();//IIFE