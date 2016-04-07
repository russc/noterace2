angular.module("noterace2").run(["$rootScope", "$state", function($rootScope, $state) {
  $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
    // We can catch the error thrown when the $requireUser promise is rejected
    // and redirect the user back to the main page
    if (error === "AUTH_REQUIRED") {
      $state.go('/');
    }
  });
}]);

angular.module("noterace2").config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
  function($urlRouterProvider, $stateProvider, $locationProvider) {

    $locationProvider.html5Mode(true);

    $stateProvider
      .state("/race", {
        url:'/race',
        templateUrl:'client/lists/views/noterace.ng.html',
        controller:'NotesCtrl',
        resolve:{
          "currentUser": ["$meteor", function ($meteor) {
            return $meteor.requireUser();
          }]
        }
      });


    $urlRouterProvider.otherwise("/");
  }
]);
