'use strict';

/**
 * Navigation controller.
 */
angular.module('docs').controller('Navigation', function($scope, $state, $stateParams, $rootScope, User) {
  User.userInfo().then(function(data) {
    $rootScope.userInfo = data;
    if (data.anonymous) {
      if ($state.current.name !== 'login') {
        var params = {};
        if ($state.current.name !== 'main') {
          params.redirectState = $state.current.name;
          params.redirectParams = JSON.stringify($stateParams);
        }
        $state.go('login', params, {
          location: 'replace'
        });
      }
    }
  });

  /**
   * User logout.
   */
  $scope.logout = function($event) {
    User.logout().then(function() {
      User.userInfo(true).then(function(data) {
        $rootScope.userInfo = data;
      });
      $state.go('main');
    });
    $event.preventDefault();
  };
});