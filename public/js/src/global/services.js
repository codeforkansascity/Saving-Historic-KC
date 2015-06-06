(function(){

angular.module('historic.global.services', []);

var ENDPOINTS = {
  sfApi:'https://structuralfabric.org/api/'
}
angular.module('historic.global.services').constant('ENDPOINTS',ENDPOINTS);

//lodash/underscore
function _($window){
  return $window._;
}
angular.module('historic.global.services').service('_',_);

})();//IIFE